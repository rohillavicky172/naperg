
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import UserSocialView from './UserSocialView'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { USER_QUERY } from '../../../GraphQL'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import { Query } from '../../../../Query.type'
import UserSocialForm from './UserSocialForm'
import NotFound from '../../../../nav/error/NotFound'
import NotAuth from '../../../../nav/error/NotAuth'
import Loading from '../../../../nav/error/Loading'

type State = {
  isEditMode: boolean
}

type Props = {
  userQuery: Query
  context: Context
  userId: string
}

class UserSocials extends React.Component<Props, State> {
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
      <div className="paperOut">
        <h3>{`Social`}</h3>

        <Paper className="paperIn">
          {this.state.isEditMode ? (
            <UserSocialForm
              showCancelButton={true}
              updateTextButton={'Save'}
              cancelTextButton={'Cancel'}
              user={this.props.userQuery.user}
              onUpdate={() => this.setState({ isEditMode: false })}
              onCancel={() => this.setState({ isEditMode: false })}
            />
          ) : (
            <>
              <div className="tar">
                <Button color={'primary'} variant="outlined" size="small" onClick={() => this.setState({ isEditMode: true })}>
                  {`Edit`}
                </Button>
              </div>
              <UserSocialView user={this.props.userQuery.user} />
            </>
          )}
        </Paper>
      </div>
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
)(UserSocials)
