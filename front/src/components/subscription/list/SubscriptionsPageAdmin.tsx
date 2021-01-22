import React from 'react'
import SubscriptionListQueryAdmin from './el/SubscriptionListQueryAdmin'
import Filters from '../../nav/filter/Filters'
import { Location } from '../../Location.type'
import { Match } from '../../Match.type'

const queryString = require('query-string')

type State = {
  first: number
}

type Props = {
  location: Location
  match: Match
}

class SubscriptionsPage extends React.Component<Props, State> {
  state = {
    first: 10,
  }

  render() {
    const parsed = queryString.parse(this.props.location.search)
    const page = parsed.page ? parsed.page : 1
    const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
    const productFrequency = typeof parsed.productFrequency === 'string' ? [parsed.productFrequency] : parsed.productFrequency
    const statusIssuedCard = typeof parsed.statusIssuedCard === 'string' ? [parsed.statusIssuedCard] : parsed.statusIssuedCard
    const companieName = parsed.companieName ? parsed.companieName : undefined
    const userName = parsed.userName ? parsed.userName : undefined
    const productName = parsed.productName ? parsed.productName : undefined
    const search = parsed.search ? parsed.search : undefined
    const productId = parsed.productId
    const companieId = parsed.companieId ? parsed.companieId : undefined
    return (
      <>
        <div className="paperOut">
          <h3>{`Subscriptions (admin)`}</h3>
          {/* <Paper className="paperIn"> */}

          <Filters
            showOrderByCreated={true}
            showProductFrequency={true}
            showCompanieName={true}
            showUserName={true}
            showProductId={true}
            showStatusIssuedCard={true}
            showProductName={true}
            searchPlaceholder={'Vendor, User, 4 digits'}
          />

          <SubscriptionListQueryAdmin
            page={page}
            variables={{
              first: this.state.first,
              skip: (page - 1) * this.state.first,
              orderBy,
              where: {
                OR: search && [
                  { product: { name: { contains: search } } },
                  { user: { name: { contains: search } } },
                  { issuedCard: { last4: { equals: search } } },
                  { companie: { name: { contains: search } } },
                ],

                issuedCard: {
                  status_in: statusIssuedCard,
                },
                companie: {
                  id: companieId,
                  name_contains: companieName,
                },
                // status: statusSubscription ? statusSubscription : undefined,
                product:
                  productName || productId || productFrequency
                    ? {
                        name: { contains: productName },
                        productFrequency_in: productFrequency,
                        id: { equals: productId },
                      }
                    : undefined,
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

export default SubscriptionsPage
