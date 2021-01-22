

import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SUBSCRIPTIONS_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import SubscriptionListDetailsLight from './SubscriptionListDetailsLight'
import { Link } from 'react-router-dom'

type State = {}

type Props = {
  linkSeeMore: string
  textSeeMore: string
  subscriptionsQueryConnection: any
  hideIfNoData: boolean
  title: string

  variables: any
}

class SubscriptionListQueryLight extends React.Component<Props, State> {
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
        <SubscriptionListDetailsLight title={this.props.title} edges={edges} />

        {this.props.subscriptionsQueryConnection.subscriptionsConnection.aggregate.count > this.props.variables.first && (
          <Link className="link" to={this.props.linkSeeMore}>
            {this.props.textSeeMore}
          </Link>
        )}
      </>
    )
  }
}

export default compose(
  graphql(SUBSCRIPTIONS_QUERY, {
    name: 'subscriptionsQueryConnection',
    options: (props: Props) => ({
      variables: props.variables
    })
  })
)(SubscriptionListQueryLight)
