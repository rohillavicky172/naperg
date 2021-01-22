import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../withContext'
import { PLAIDDATAS_QUERY } from '../GraphQL'
import SinglePlaidDataAccount from '../single/SinglePlaidDataAccount'
// import Pagination from '../../nav/Pagination'

type State = {}

type Props = {
  variables: any
  first: number
  client: any
  history: any
  plaidDatasQuery: any
}

class PlaidDatasUserAccountQuery extends React.Component<Props, State> {
  render() {
    if (this.props.plaidDatasQuery.error) {
      return (
        <Error
          message={
            this.props.plaidDatasQuery.error.graphQLErrors.length && this.props.plaidDatasQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.plaidDatasQuery.loading) {
      return <Loading />
    }

    return (
      <>
        {this.props.plaidDatasQuery.plaidDatasConnection.edges.map((plaidDataNode) => (
          <SinglePlaidDataAccount key={plaidDataNode.node.id} plaidData={plaidDataNode.node} />
        ))}
      </>
    )
  }
}

export default compose(
  graphql(PLAIDDATAS_QUERY, {
    name: 'plaidDatasQuery', // name of the injected prop: this.props.feedQuery...
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withRouter,
  withApollo,
  withContext
)(PlaidDatasUserAccountQuery)
