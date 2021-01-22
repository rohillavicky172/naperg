import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../withContext'
import SingleLog from '../single/SingleLog'

import gql from 'graphql-tag'

export const LOGS_QUERY = gql`
  query LogsConnection($where: LogWhereInput, $orderBy: LogOrderByInput, $first: Int, $skip: Int) {
    logsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          date
          message
          json
          jsonError
          event
          product {
            id
          }
          plaidData {
            id
          }
          invoice {
            id
          }
          balance {
            id
          }
          campaign {
            id
          }
          sellerBalance {
            id
          }
          authDevice {
            id
          }
          source {
            id
          }
          charge {
            id
          }
          user {
            id
            firstName
            lastName
          }
          issuedCard {
            id
          }
          companie {
            id
          }
          cardholder {
            id
          }
          ruleMerchantData {
            id
          }
          subscriptionManagement {
            id
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

type State = {}

type Props = {
  first: number
  title: string
  client: any
  history: any
  logsQuery: any
  variables: any
  tile: string
}

class LogsQueryLight extends React.Component<Props, State> {
  render() {
    if (this.props.logsQuery.error) {
      return (
        <Error message={this.props.logsQuery.error.graphQLErrors.length && this.props.logsQuery.error.graphQLErrors[0].message} />
      )
    }
    if (this.props.logsQuery.loading) {
      return <Loading />
    }
    // console.log(this.props.logsQuery.logsConnection)
    return (
      <>
        <h3>{this.props.title}</h3>
        {this.props.logsQuery.logsConnection.edges.map((logNode) => (
          <SingleLog key={logNode.node.id} log={logNode.node} />
        ))}
        Total: {this.props.logsQuery.logsConnection.aggregate.count}
      </>
    )
  }
}

export default compose(
  graphql(LOGS_QUERY, {
    name: 'logsQuery', // name of the injected prop: this.props.feedQuery...
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withRouter,
  withApollo,
  withContext
)(LogsQueryLight)
