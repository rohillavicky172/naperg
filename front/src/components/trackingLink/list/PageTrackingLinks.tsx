import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
// import { Query } from '../../Query.type'
// import TitlePage from '../../nav/layout/titlePage/TitlePage'
import TrackingLinksQuery from './TrackingLinksQuery'
import Filters from '../../nav/filter/Filters'
const queryString = require('query-string')

const TrackingLinksPageAdmin = () => {
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  // const companieId = this.props.match.params.companieId

  const companieId = parsed.companieId ? parsed.companieId : undefined
  // const search = parsed.search ? parsed.search : undefined
  // const companieName = parsed.companieName
  // const plaidDataId = parsed.plaidDataId
  // const ruleMerchantDataId = parsed.ruleMerchantDataId
  // const invoiceId = parsed.invoiceId
  // const promotionId = parsed.promotionId
  const productId = parsed.productId
  // const sellerBalanceId = parsed.sellerBalanceId
  // const subscriptionId = parsed.subscriptionId
  const userId = parsed.userId
  // const type = parsed.type
  // const event = parsed.event ? parsed.event : undefined
  // const search = parsed.search ? parsed.search : undefined
  // const message = parsed.message

  // const events = typeof parsed.events === 'string' ? [parsed.events] : parsed.events

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`TrackingLinks (admin)`}</h3>
          <Filters
            // showProductId
            // showOrderByCreated
            // showRuleMerchantDataId
            // showPromotionId
            // showEvents
            // showCompanieName
            // showMessage
            showUserId
            // showType
            showCompanieId
            showProductId
            // searchPlaceholder={'TrackingLinks'}
          />

          <TrackingLinksQuery
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy: 'date_DESC',
              where: {
                user: userId && {
                  id: userId,
                },

                product: productId && {
                  id: { equals: productId },
                },

                companie: companieId && {
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

export default TrackingLinksPageAdmin
