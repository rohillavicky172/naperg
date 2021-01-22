
import React from 'react'
import IsEmailValidated from './IsEmailValidated'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { USER_QUERY } from '../../user/GraphQL'
import { Query } from '../../Query.type'
import { withRouter } from 'react-router-dom'
import NotFound from '../../nav/error/NotFound'
import NotAuth from '../../nav/error/NotAuth'
import Loading from '../../nav/error/Loading'

type State = {}

type Props = {
  userQuery: Query
  userId: string
}

class EmailValidatedQuery extends React.Component<Props, State> {
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
    return <IsEmailValidated user={this.props.userQuery.user} />
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
  withApollo
)(EmailValidatedQuery)
