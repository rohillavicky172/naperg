import React from 'react'
import BalancesAdminQuery from './SellerBalancesAdminQuery'
import Filters from '../../nav/filter/Filters'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const SellerBalancesPageAdmin = () => {
  const location = useLocation()

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1
  const companieId = parsed.companieId ? parsed.companieId : undefined

  const search = parsed.search ? parsed.search : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  // const isTrustedPayment = parsed.isTrustedPayment === 'TRUE' ? true : parsed.isTrustedPayment === 'FALSE' ? false : undefined
  const isEnabled = parsed.isEnabled === 'TRUE' ? true : parsed.isEnabled === 'FALSE' ? false : undefined
  const first = 20
  return (
    <>
      <div className="paperOut">
        <h3>{`sellerBalances`}</h3>

        <Filters showCompanieId showOrderByCreated searchPlaceholder={'Company'} />

        <BalancesAdminQuery
          page={page}
          variables={{
            first: first,
            skip: (page - 1) * first,
            orderBy,
            where: {
              OR: search && [{ companie: { name: { contains: search } } }],
              isEnabled,

              companie: {
                id: companieId,
              },
            },
          }}
        />
      </div>
    </>
  )
}

export default SellerBalancesPageAdmin
