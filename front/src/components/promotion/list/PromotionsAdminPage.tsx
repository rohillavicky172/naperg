import React from 'react'
import PromotionsAdminQuery from './PromotionsAdminQuery'
import Filters from '../../nav/filter/Filters'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

type Props = {}

const PromotionsAdminPage = (props: Props) => {
  const location = useLocation()
  const first = 10
  const parsed = queryString.parse(location.search)
  let page = parsed.page ? parsed.page : 1
  const promotionId = parsed.promotionId
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'

  return (
    <div className="paperOut">
      <h1>{`Promotions`}</h1>
      <Filters
        showPromotionId
        // showOrderByCreated={true}
        // showIssuedCardType={true}
        // showEmptyColumn={true}
        // showAuthorizationId={true}
        // showCurrency={true}
        // showTypeIssuedCards={true}
        // showTypeInvoices={true}
        // showTypePayments={true}
        // showProductId={true}
        // showUserId={true}
        // showOrderByBuyerFinalPrice={true}
        // showPeriod={true}
        // showHasCashback={true}
        // showMessage={true}
        // showStatusInvoices={true}
        // showStatusIssuing={true}
        // showUserName={true}
        // showCompanieName={true}
        // showProductName={true}
        // searchPlaceholder={
        //   isMobile ? 'Vendor, Member or last 4 digits' : 'Search by Vendor, Member or last 4 digits of NachoCard'
        // }
      />
      <PromotionsAdminQuery
        page={page}
        variables={{
          where: {
            id: promotionId,
          },
          first,
          orderBy,
          skip: (page - 1) * first,
        }}
      />
    </div>
  )
}

export default PromotionsAdminPage
