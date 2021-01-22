import React from 'react'

import Filters from '../../nav/filter/Filters'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'
import { Match } from '../../Match.type'
import SubscriptionCardsQuery from './el/SubscriptionCardsQuery'
import TitleUserName from '../../nav/layout/titlePage/TitleUserName'
const queryString = require('query-string')

type State = {
  first: number
}

type Props = {
  context: Context
  location: Location
  match: Match
}

class SubscriptionsUserPage extends React.Component<Props, State> {
  state = {
    first: 48,
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const page = parsed.page ? parsed.page : 1
    const orderBy = parsed.orderBy ? parsed.orderBy : 'lastInvoiceDate_DESC'
    const productId = parsed.productId
    const productFrequency = typeof parsed.productFrequency === 'string' ? [parsed.productFrequency] : parsed.productFrequency
    const userName = parsed.userName ? parsed.userName : undefined
    const userId = this.props.match.params.userId
    const productName = parsed.productName ? parsed.productName : undefined
    const issuedCardId = parsed.issuedCardId
    const search = parsed.search ? parsed.search : undefined
    const statusIssuedCard = typeof parsed.statusIssuedCard === 'string' ? [parsed.statusIssuedCard] : parsed.statusIssuedCard
    const companieId = this.props.context.userRoleCompanie.companie.id

    return (
      <>
        <div className="paperOut">
          <h3>
            <TitleUserName type="companie" userId={userId} companieId={companieId} objectName="Subscriptions" />
          </h3>
          <Filters
            // showOrderByCreated={true}
            // showUserName={this.props.context.userRoleCompanie.companie.isPersonal ? false : true}
            // showOrderByLastInvoiceDate={true}
            showStatusIssuedCard={true}
            showProductFrequency={true}
            showProductId={true}
            // showProductName={true}
            searchPlaceholder={'Search by Vendor or last 4 digits of NachoCard'}
          />

          <SubscriptionCardsQuery
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
                ],

                issuedCard: {
                  id: issuedCardId,
                  status_in: statusIssuedCard,
                },
                companie: {
                  id: companieId,
                },
                product:
                  productId || productName || productFrequency
                    ? {
                        id: { equals: productId },
                        productFrequency_in: productFrequency,
                        name: { contains: productName },
                      }
                    : undefined,

                user: (userName || userId) && {
                  id: userId ? userId : undefined,
                  OR: userName && [{ firstName: { contains: userName } }, { lastName: { contains: userName } }],
                },
              },
            }}
          />
        </div>
      </>
    )
  }
}

export default withContext(SubscriptionsUserPage)
