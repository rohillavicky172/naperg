
import React from 'react'
import Button from '@material-ui/core/Button'
import UserEmailView from './UserEmailView'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { USER_QUERY } from '../../../GraphQL'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import { Query } from '../../../../Query.type'
import UserEmailForm from './UserEmailForm'
import NotFound from '../../../../nav/error/NotFound'
import NotAuth from '../../../../nav/error/NotAuth'
import Loading from '../../../../nav/error/Loading'

type State = {
  isEditMode: boolean
}

type Props = {
  userQuery: Query
  changeEditMode: boolean
  context: Context
  userId: string
}

class UserEmailQuery extends React.Component<Props, State> {
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
        {this.state.isEditMode ? (
          <UserEmailForm
            user={this.props.userQuery.user}
            changeEditMode={() => this.setState({ isEditMode: !this.state.isEditMode })}
          />
        ) : (
          <>
            <div className="tar">
              <Button
                color={'primary'}
                variant="outlined"
                size="small"
                onClick={() => {
                  console.log('pp')
                  this.setState({ isEditMode: true })
                }}>
                {`Edit`}
              </Button>
            </div>
            <UserEmailView user={this.props.userQuery.user} />
          </>
        )}
      </>
    )
  }
}

// export default withContext(UserProfileDetails)

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
)(UserEmailQuery)
