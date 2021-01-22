
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withRouter, Link } from 'react-router-dom'
import { withContext } from '../../withContext'
import { USERS_QUERY_LIGHT } from '../GraphQL'
import { Companie } from '../../companie/Companie.type'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

// import UserSingleLight from './UserSingleLight'
// import Pagination from '../../nav/Pagination'
// import DateComponent from '../../nav/DateComponent'
// import SpoofUser from '../single/action/spoofUser/SpoofUser'
// import SeeUserAsAdmin from '../single/action/spoofUser/SeeUserAsAdmin'

type State = {}

type Props = {
  companie: Companie
  // me: User,
  // first: number,
  variables: any
  // history: any,
  usersQueryConnection: any
}

class UsersQueryDashboard extends React.Component<Props, State> {
  render() {
    if (this.props.usersQueryConnection.error) {
      return (
        <Error
          message={
            this.props.usersQueryConnection.error.graphQLErrors.length &&
            this.props.usersQueryConnection.error.graphQLErrors[0].message
          }
        />
      )
    }

    if (this.props.usersQueryConnection.loading) {
      return <Loading />
    }
    // const { edges } = this.props.usersQueryConnection.usersConnection

    return (
      <>
        <CardContent className="cardContentClass">
          <h3>
            {`${this.props.usersQueryConnection.usersConnection.aggregate.count} Member`}
            {this.props.usersQueryConnection.usersConnection.aggregate.count > 1 && 's'} in {this.props.companie.name}
          </h3>
        </CardContent>
        <CardActions>
          <Link className="link" to={'/team/' + this.props.companie.id}>
            {`See member`}
            {this.props.usersQueryConnection.usersConnection.aggregate.count > 1 && 's'}
          </Link>
        </CardActions>
      </>
    )
  }
}

export default compose(
  graphql(USERS_QUERY_LIGHT, {
    name: 'usersQueryConnection',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter,
  withApollo,
  withContext
)(UsersQueryDashboard)
