import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import CustomLinksQueryAdmin from './CustomLinksQueryAdmin'
import Filters from '../../nav/filter/Filters'
// import { Link } from 'react-router-dom'
// import TitlePage from '../../nav/layout/titlePage/TitlePage'
// import { Button } from '@material-ui/core'
const queryString = require('query-string')

const CustomLinksPageAdmin = () => {
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  // const companieId = this.props.match.params.companieId

  // const companieId = parsed.companieId ? parsed.companieId : undefined
  // const search = parsed.search ? parsed.search : undefined
  // const companieName = parsed.companieName
  // const plaidDataId = parsed.plaidDataId
  // const ruleMerchantDataId = parsed.ruleMerchantDataId
  // const invoiceId = parsed.invoiceId
  // const promotionId = parsed.promotionId
  // const productId = parsed.productId
  // const sellerBalanceId = parsed.sellerBalanceId
  // const subscriptionId = parsed.subscriptionId
  const userId = parsed.userId
  const id = parsed.id
  // const type = parsed.type
  // const event = parsed.event ? parsed.event : undefined
  // const search = parsed.search ? parsed.search : undefined
  // const message = parsed.message

  // const events = typeof parsed.events === 'string' ? [parsed.events] : parsed.events

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`CustomLinks (admin)`}</h3>

          <Filters
            showId
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
            // searchPlaceholder={'CustomLinks'}
          />

          <CustomLinksQueryAdmin
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy: { createdAt: 'desc' },
              where: {
                id,
                user: userId && {
                  id: userId,
                },
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default CustomLinksPageAdmin
