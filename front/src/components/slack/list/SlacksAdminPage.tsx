import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import SlacksAdminQuery from './SlacksAdminQuery'

import Filters from '../../nav/filter/Filters'

const queryString = require('query-string')

const SlacksAdminPage = () => {
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  // const companieId = parsed.companieId ? parsed.companieId : undefined
  // // const search = parsed.search ? parsed.search : undefined
  // const companieName = parsed.companieName
  // const plaidDataId = parsed.plaidDataId
  // const ruleMerchantDataId = parsed.ruleMerchantDataId
  // const invoiceId = parsed.invoiceId
  // const promotionId = parsed.promotionId
  // const productId = parsed.productId
  // const sellerBalanceId = parsed.sellerBalanceId
  // const subscriptionId = parsed.subscriptionId
  // const campaignId = parsed.campaignId
  // const issuedCardId = parsed.issuedCardId
  // const userId = parsed.userId
  // const event = parsed.event ? parsed.event : undefined

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Slacks (admin)`}</h3>
          <Filters showOrderByCreated showCompanieId />

          <SlacksAdminQuery
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy,
              where: {},
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default SlacksAdminPage
