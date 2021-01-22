import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
// import { Query } from '../../Query.type'
// import TitlePage from '../../nav/layout/titlePage/TitlePage'
import AnalyticsQuery from './AnalyticsQuery'
import Filters from '../../nav/filter/Filters'
const queryString = require('query-string')

const AnalyticsPageAdmin = () => {
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1

  const isBot = parsed.isBot === 'TRUE' ? true : parsed.isBot === 'FALSE' ? false : undefined
  const productId = parsed.productId
  const companieId = parsed.companieId
  const userId = parsed.userId

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Analytics (admin)`}</h3>
          <Filters
            // showProductId
            // showOrderByCreated
            // showRuleMerchantDataId
            // showPromotionId
            // showEvents
            // showCompanieName
            // showMessage
            showIsBot
            showUserId
            // showType
            showCompanieId
            showProductId
            // searchPlaceholder={'Analytics'}
          />

          <AnalyticsQuery
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy: { createdAt: 'desc' },
              where: {
                isBot,
                userId,

                productId,

                companieId,
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default AnalyticsPageAdmin
