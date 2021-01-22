import React from 'react'
import { History } from '../../../History.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import SubscriptionIdFilterQuery from './SubscriptionIdFilterQuery'
const queryString = require('query-string')

type State = {
  currency: string
}

type Props = {
  showCurrency: boolean
  history: History
  location: Location
  currenciesQuery: any
}

class SubscriptionIdFilter extends React.Component<Props, State> {
  render() {
    const subscriptionId = queryString.parse(this.props.location.search).subscriptionId

    if (!subscriptionId) {
      return null
    }
    return (
      <>
        <SubscriptionIdFilterQuery
          variables={{
            where: {
              id: subscriptionId
            }
          }}
        />
      </>
    )
  }
}

export default compose(withRouter)(SubscriptionIdFilter)
