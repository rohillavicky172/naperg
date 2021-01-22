import React from 'react'
import { History } from '../../../History.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
import NotFound from '../../../nav/error/NotFound'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'

import { SUBSCRIPTION_QUERY } from '../../../subscription/GraphQL'
import utils from '../../../utils'

const queryString = require('query-string')

type State = {}

type Props = {
  variables: any
  history: History
  location: Location
  subscriptionQuery: any
}

class subscriptionIdFilterQuery extends React.Component<Props, State> {
  onDelete = () => {
    let parsed = queryString.parse(this.props.location.search)
    delete parsed.subscriptionId
    delete parsed.page

    this.props.history.push('?' + queryString.stringify(parsed))
  }

  render() {
    if (this.props.subscriptionQuery.error) {
      return (
        <Error
          message={
            this.props.subscriptionQuery.error.graphQLErrors.length && this.props.subscriptionQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.subscriptionQuery.loading) {
      return <Loading />
    }
    if (!this.props.subscriptionQuery) {
      return <NotFound />
    }

    if (!this.props.subscriptionQuery.subscription) {
      return <NotFound />
    }

    const subscriptionName = utils.getSubscriptionName(
      this.props.subscriptionQuery.subscription.product.name,
      this.props.subscriptionQuery.subscription.issuedCard.last4,
      this.props.subscriptionQuery.subscription.user.firstName,
      this.props.subscriptionQuery.subscription.user.lastName
    )
    // console.log('subscriptionName')
    return (
      <>
        <Tooltip title={'Subscription: ' + subscriptionName}>
          <Chip
            // avatar={<ImageTemplate format={'avatar'} nameFile={'/icon/nn/iconNN.png'} />}
            label={subscriptionName}
            onDelete={this.onDelete}
            variant="outlined"
          />
        </Tooltip>
      </>
    )
  }
}

export default compose(
  graphql(SUBSCRIPTION_QUERY, {
    name: 'subscriptionQuery',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withRouter
)(subscriptionIdFilterQuery)
