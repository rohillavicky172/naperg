import React from 'react'
import Filters from '../../nav/filter/Filters'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'
import { Match } from '../../Match.type'
import SubscriptionListQuery from './el/SubscriptionListQuery'
import TitlePage from '../../nav/layout/titlePage/TitlePage'
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

class SubscriptionsListCompanyPage extends React.Component<Props, State> {
  state = {
    first: 48,
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const page = parsed.page ? parsed.page : 1
    const orderBy = parsed.orderBy ? parsed.orderBy : 'lastInvoiceDate_DESC'
    const last4 = parsed.last4 ? parsed.last4 : undefined
    const productId = parsed.productId
    const userName = parsed.userName ? parsed.userName : undefined
    const userId = parsed.userId
    const productName = parsed.productName ? parsed.productName : undefined
    const issuedCardId = parsed.issuedCardId
    const statusIssuedCard = typeof parsed.statusIssuedCard === 'string' ? [parsed.statusIssuedCard] : parsed.statusIssuedCard
    const companieId = this.props.match.params.companieId
    // console.log(this.props.match.params.companieId)
    return (
      <>
        <div className="paperOut">
          {userId ? (
            <h3>
              <TitleUserName showCompanie={true} userId={userId} companieId={companieId} objectName="Subscriptions" />
            </h3>
          ) : (
            <TitlePage userId={''} type="companie" companieId={companieId} objectName="Subscriptions" />
          )}

          <Filters
            showOrderByCreated={true}
            showLast4={true}
            showUserName={this.props.context.userRoleCompanie.companie.isPersonal ? false : true}
            showOrderByLastInvoiceDate={true}
            showStatusIssuedCard={true}
            showProductId={true}
            showProductName={true}
          />

          <SubscriptionListQuery
            page={page}
            variables={{
              first: this.state.first,
              skip: (page - 1) * this.state.first,
              orderBy,
              where: {
                issuedCard:
                  last4 || issuedCardId || statusIssuedCard
                    ? {
                        id: issuedCardId,
                        status_in: statusIssuedCard,
                        last4,
                      }
                    : undefined,
                companie: {
                  id: companieId,
                },
                product: (productId || productName) && {
                  id: productId,
                  name: { contains: productName },
                },

                user: (userName || userId) && {
                  id: userId ? userId : undefined,
                  OR: [
                    {
                      firstName: { contains: userName },
                    },
                    {
                      lastName: { contains: userName },
                    },
                  ],
                },
              },
            }}
          />
        </div>
      </>
    )
  }
}

export default withContext(SubscriptionsListCompanyPage)
