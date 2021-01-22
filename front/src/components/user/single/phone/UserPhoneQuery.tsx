import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { USER_QUERY } from '../../GraphQL'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import PhoneLogicContainer from './PhoneLogicContainer'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'

type State = {}

type Props = {
  userQuery: any
  context: Context
  userId: string
}

class UserPhoneQuery extends React.Component<Props, State> {
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

    let user = this.props.userQuery.user

    return (
      <>
        <div className="paperOut">
          <h3>{`Phone`}</h3>

          <Paper className="paperIn">
            <PhoneLogicContainer user={user} />
          </Paper>
        </div>

        {this.props.context.me.role === 'ADMIN' && (
          <Link to={'/logs?type=Phone&userId=' + this.props.userId}>
            <Button variant="outlined" color="primary">
              {`Logs (admin)`}
            </Button>
          </Link>
        )}
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
)(UserPhoneQuery)
