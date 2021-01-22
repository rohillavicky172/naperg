import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../withContext'
import { USER_QUERY } from '../../GraphQL'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import { User } from '../../User.type'
import { Context } from '../../../Context.type'
import Paper from '@material-ui/core/Paper'
import DateComponent from '../../../nav/DateComponent'
import UserProfileDetailsAdmin from './sectionDetails/UserProfileDetailsAdmin'

type State = {}

type Props = {
  userQuery: {
    error: string
    loading: string
    user: User
  }
  userId: string
  context: Context
}

class UserProfileViewAdmin extends React.Component<Props, State> {
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
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>Admin</h3>
            <Grid container>
              <Grid item xs={12} sm={12}>
                {`UserId:`} {this.props.userQuery.user.id}
              </Grid>
              <Grid item xs={12} sm={12}>
                {`signupType:`} {this.props.userQuery.user.signupType}
              </Grid>
              <Grid item xs={12} sm={12}>
                {`createdAt:`} <DateComponent date={this.props.userQuery.user.createdAt} />
              </Grid>
              <Grid item xs={12} sm={12}>
                {`LastLogin:`} <DateComponent date={this.props.userQuery.user.lastLogin} />
              </Grid>

              <Grid item xs={12} sm={12}>
                {`Role:`} {this.props.userQuery.user.role}
              </Grid>
              <Grid item xs={12} sm={12}>
                {`Email:`} {this.props.userQuery.user.email}
              </Grid>
              <Grid item xs={12} sm={12}>
                {`Name:`} {this.props.userQuery.user.name}
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>Admin</h3>
            <UserProfileDetailsAdmin userId={this.props.userQuery.user.id} />
          </Paper>
        </div>
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
          id: props.userId,
        },
      },
    }),
  }),
  withContext,
  withApollo
)(UserProfileViewAdmin)
