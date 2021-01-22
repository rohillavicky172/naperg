import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SUBSCRIPTIONS_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import SubscriptionListDetails from './SubscriptionListDetails'
import Pagination from '../../../nav/Pagination'

type State = {}

type Props = {
  subscriptionsQueryConnection: any
  hideIfNoData: boolean
  title: string
  page: any
  variables: any
}

class SubscriptionListQueryAdmin extends React.Component<Props, State> {
  render() {
    if (this.props.subscriptionsQueryConnection.error) {
      return (
        <Error
          message={
            this.props.subscriptionsQueryConnection.error.graphQLErrors.length &&
            this.props.subscriptionsQueryConnection.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.subscriptionsQueryConnection.loading) {
      return <Loading />
    }
    const { edges } = this.props.subscriptionsQueryConnection.subscriptionsConnection

    if (!edges.length && this.props.hideIfNoData) {
      return null
    }

    return (
      <>
        <SubscriptionListDetails title={this.props.title} edges={edges} />
        <Pagination
          page={this.props.page}
          first={this.props.variables.first}
          count={this.props.subscriptionsQueryConnection.subscriptionsConnection.aggregate.count}
        />
      </>
    )
  }
}

export default compose(
  graphql(SUBSCRIPTIONS_QUERY, {
    name: 'subscriptionsQueryConnection',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  })
)(SubscriptionListQueryAdmin)
