import React from 'react'
import Filters from '../../nav/filter/Filters'
import { Location } from '../../Location.type'
import { Match } from '../../Match.type'
import SubscriptionsProductSellerQuery from './el/SubscriptionsProductSellerQuery'
import ProductTitle from '../../product/single/page/ProductTitle'
const queryString = require('query-string')
// import { withContext } from '../../withContext'
// import { Context } from '../../Context.type'
// import TitleUserName from '../../nav/layout/titlePage/TitleUserName'

type State = {
  first: number
}

type Props = {
  location: Location
  match: Match
}

class SubscriptionsProductPage extends React.Component<Props, State> {
  state = {
    first: 48,
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const page = parsed.page ? parsed.page : 1
    const orderBy = parsed.orderBy ? parsed.orderBy : 'lastInvoiceDate_DESC'
    const userName = parsed.userName ? parsed.userName : undefined
    const productId = this.props.match.params.productId
    const productName = parsed.productName ? parsed.productName : undefined
    const issuedCardId = parsed.issuedCardId
    const subscriptionId = parsed.subscriptionId
    const search = parsed.search ? parsed.search : undefined

    return (
      <>
        <div className="paperOut">
          <div className="paperIn">
            <ProductTitle title="Subscriptions for " productId={productId} />
          </div>
          <Filters
            showOrderByCreated
            showUserName
            showProductId
            showLast4
            showSubscriptionId
            searchPlaceholder={'Search by Member or last 4 digits of NachoCard'}
          />

          <SubscriptionsProductSellerQuery
            page={page}
            variables={{
              first: this.state.first,
              skip: (page - 1) * this.state.first,
              orderBy,
              where: {
                OR: search && [{ user: { name: { contains: search } } }, { issuedCard: { last4: { equals: search } } }],

                id: subscriptionId,

                issuedCard: issuedCardId && {
                  id: issuedCardId,
                },

                product: (productId || productName) && {
                  id: { equals: productId },
                  name: { contains: productName },
                },

                user: userName && {
                  OR: [{ firstName: { contains: userName } }, { lastName: { contains: userName } }],
                },
              },
            }}
          />
        </div>
      </>
    )
  }
}

export default SubscriptionsProductPage
