

import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SUBSCRIPTIONS_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import SubscriptionDashboard from '../../single/listSingle/SubscriptionDashboard'
import { Companie } from '../../../companie/Companie.type'
import { Link } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

type State = {}

type Props = {
  subscriptionsQueryConnection: any
  companie: Companie
  title: string
  variables: any
}

class SubscriptionsDashboardQuery extends React.Component<Props, State> {
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

    return (
      <>
        <CardContent className="cardContentClass">
          <h3>{this.props.title}</h3>
          {edges.map(subscription => (
            <div key={subscription.node.id} className="paperOut">
              <SubscriptionDashboard title={this.props.title} subscription={subscription.node} />
              <Divider />
            </div>
          ))}
        </CardContent>
        <CardActions>
          {this.props.subscriptionsQueryConnection.subscriptionsConnection.aggregate.count > 3 && (
            <Link className="link" to={'/subscriptionsCompany/' + this.props.companie.id}>
              {`See all subscriptions for ${this.props.companie.name}`}
            </Link>
          )}
        </CardActions>
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
)(SubscriptionsDashboardQuery)
