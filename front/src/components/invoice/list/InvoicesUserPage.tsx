import React from 'react'
import InvoicesListQuery from './InvoicesListQuery'
import Filters from '../../nav/filter/Filters'
import TitlePage from '../../nav/layout/titlePage/TitlePage'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Match } from '../../Match.type'
import { Location } from '../../Location.type'
import UseWindowDimensions from '../../UseWindowDimensions'
const queryString = require('query-string')

type State = {
  first: number
}

type Props = {
  context: Context
  match: Match
  location: Location
}

class InvoicesUserPage extends React.Component<Props, State> {
  state = {
    first: 10,
  }
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    const parsed = queryString.parse(this.props.location.search)
    let page = parsed.page ? parsed.page : 1
    let issuedCardId = parsed.issuedCardId
    let subscriptionId = parsed.subscriptionId
    // let currency = parsed.currency
    let currencies = typeof parsed.currencies === 'string' ? [parsed.currencies] : parsed.currencies

    let productId = parsed.productId
    let productName = parsed.productName ? parsed.productName : undefined
    const search = parsed.search ? parsed.search : undefined
    // let statusInvoice = parsed.statusInvoice
    const orderBy = parsed.orderBy ? parsed.orderBy : 'dateInvoice_DESC'
    let userId = this.props.match.params.userId
    let companieId = this.props.context.userRoleCompanie.companie.id
    let typeInvoices = typeof parsed.typeInvoices === 'string' ? [parsed.typeInvoices] : parsed.typeInvoices
    let statusInvoices = typeof parsed.statusInvoices === 'string' ? [parsed.statusInvoices] : parsed.statusInvoices

    return (
      <div className="paperOut">
        <TitlePage companieId={''} type="user" objectName="Transactions" userId={this.props.match.params.userId} />

        <Filters
          showOrderByDateInvoice
          showCurrency
          showTypeInvoices
          showStatusInvoices
          showOrderByBuyerFinalPrice
          // showEmptyColumn
          // showEmptyColumn2
          // showEmptyColumn3
          // showProductName
          searchPlaceholder={isMobile ? 'Vendor, Invoice or NachoCard' : 'Search by Vendor, Invoice or NachoCard (last 4 digits)'}
        />

        <InvoicesListQuery
          page={page}
          variables={{
            where: {
              OR: search && [
                { user: { name: { contains: search } } },
                { product: { name: { contains: search } } },
                { smallId: Number(search.toString().split('-').join('')) ? Number(search.toString().split('-').join('')) : 0 },
                { subscription: { issuedCard: { last4: { contains: search } } } },
                // { subscription: { issuedCard: { name: { contains: search } } } },
              ],
              product: {
                id: { equals: productId },
                name: { contains: productName },
              },
              testMode: this.props.context.testMode,
              // status: statusInvoice === 'ALL' ? undefined : statusInvoice,
              // currency: currency === 'ALL' ? undefined : currency,
              currency_in: currencies,
              type_in: typeInvoices,
              status_in: statusInvoices,
              companie: companieId && {
                id: companieId,
              },
              user: userId && {
                id: userId,
              },

              subscription: (subscriptionId || issuedCardId || productId || productName) && {
                id: subscriptionId,
                issuedCard: issuedCardId && {
                  id: issuedCardId,
                },
              },
            },
            first: this.state.first,
            orderBy: orderBy,
            skip: (page - 1) * this.state.first,
          }}
        />
      </div>
    )
  }
}

export default withContext(InvoicesUserPage)
