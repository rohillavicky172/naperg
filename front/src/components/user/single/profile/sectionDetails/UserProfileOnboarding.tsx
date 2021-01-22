
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { USER_QUERY } from '../../../GraphQL'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import { Query } from '../../../../Query.type'
import UserProfileForm from './UserProfileForm'
import NotFound from '../../../../nav/error/NotFound'
import NotAuth from '../../../../nav/error/NotAuth'
import Loading from '../../../../nav/error/Loading'

type State = {
  isEditMode: boolean
}

type Props = {
  userQuery: Query
  context: Context
  onUpdate: () => void
  onCancel: () => void
  userId: string
}

class UserProfileOnboarding extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    if (this.props.userQuery.error) {
      return <NotAuth />
    }
    if (this.props.userQuery.loading) {
      return <Loading />
    }
    if (!this.props.userQuery) {
      return <NotFound />
    }
    return (
      <>
        <UserProfileForm
          showCancelButton={false}
          updateTextButton={'Next'}
          cancelTextButton={'Back'}
          user={this.props.userQuery.user}
          onUpdate={() => this.props.onUpdate()}
          onCancel={() => this.props.onCancel()}
        />
      </>
    )
  }
}

export default compose(
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.userId
        }
      }
    })
  }),
  withRouter,
  withContext,
  withApollo
)(UserProfileOnboarding)
