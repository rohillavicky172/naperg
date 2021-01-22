import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import LogsQuery from './LogsQuery'
import EventsFilter from './EventsFilter'
import Filters from '../../nav/filter/Filters'
const queryString = require('query-string')

const LogsPageAdmin = () => {
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1

  const companieId = parsed.companieId ? parsed.companieId : undefined
  // const search = parsed.search ? parsed.search : undefined
  const companieName = parsed.companieName
  const plaidDataId = parsed.plaidDataId
  const ruleMerchantDataId = parsed.ruleMerchantDataId
  const invoiceId = parsed.invoiceId
  const promotionId = parsed.promotionId
  const productId = parsed.productId
  const sellerBalanceId = parsed.sellerBalanceId
  const subscriptionId = parsed.subscriptionId
  const campaignId = parsed.campaignId
  const issuedCardId = parsed.issuedCardId
  const userId = parsed.userId
  const event = parsed.event ? parsed.event : undefined

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Logs (admin)`}</h3>
          <Filters showProductId showOrderByCreated showCompanieId showInvoiceId />
          <EventsFilter />

          <LogsQuery
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy: 'date_DESC',
              where: {
                // OR: search && [
                //   { companie: { name : {contains: search } } },
                //   { message_contains: search },
                //   { event_contains: search },
                // ],
                // event_contains: event,
                event,
                // event: search,
                // event_in: events,
                user: userId && {
                  id: userId,
                },
                ruleMerchantData: ruleMerchantDataId && {
                  id: ruleMerchantDataId,
                },
                subscription: subscriptionId && {
                  id: subscriptionId,
                },
                campaign: campaignId && {
                  id: { equals: campaignId },
                },
                promotion: promotionId && {
                  id: promotionId,
                },
                product: productId && {
                  id: { equals: productId },
                },
                plaidData: plaidDataId && {
                  id: plaidDataId,
                },
                sellerBalance: sellerBalanceId && {
                  id: sellerBalanceId,
                },
                invoice: invoiceId && {
                  id: invoiceId,
                },
                issuedCard: issuedCardId && {
                  id: issuedCardId,
                },
                // message_contains: message,
                companie: (companieName || companieId) && {
                  name: { contains: companieName },
                  id: companieId,
                },
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default LogsPageAdmin
