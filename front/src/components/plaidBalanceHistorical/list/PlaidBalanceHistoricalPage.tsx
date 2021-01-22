import React from 'react'

import PlaidBalanceHistoricalQuery from './PlaidBalanceHistoricalQuery'
import Filters from '../../nav/filter/Filters'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const PlaidBalanceHistoricalPage = () => {
  const location = useLocation()
  const first = 10
  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  const companieId = parsed.companieId ? parsed.companieId : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  const mask = parsed.last4 ? parsed.last4 : undefined
  const companieName = parsed.companieName

  return (
    <>
      <div className="paperOut">
        <h2>PlaidBalanceHistorical</h2>
        <Filters showCompanieName={true} showCompanieId={true} showOrderByCreated={true} showLast4={true} />

        <PlaidBalanceHistoricalQuery
          page={page}
          variables={{
            skip: (page - 1) * first,
            first,
            orderBy: orderBy,
            where: {
              mask,
              companie:
                companieName || companieId
                  ? {
                      name: { contains: companieName },
                      id: companieId,
                    }
                  : undefined,
            },
          }}
        />
      </div>
    </>
  )
}

export default PlaidBalanceHistoricalPage
