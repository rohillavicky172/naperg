

import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SUBSCRIPTIONS_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import SubscriptionListDetailsLightProduct from './SubscriptionListDetailsLightProduct'
// import { Link } from 'react-router-dom'
import { Companie } from '../../../companie/Companie.type'

type State = {}

type Props = {
  companie: Companie
  variables: any
  subscriptionsQueryConnection: any
  hideIfNoData: boolean
  title: string
}

class SubscriptionListQueryProduct extends React.Component<Props, State> {
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
        <SubscriptionListDetailsLightProduct companie={this.props.companie} title={this.props.title} edges={edges} />
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
)(SubscriptionListQueryProduct)
