import React from 'react'
import PromoCodesAdminQuery from './PromoCodesAdminQuery'
import Filters from '../../nav/filter/Filters'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

type Props = {}

const PromoCodesAdminPage = (props: Props) => {
  const location = useLocation()
  const first = 10
  const parsed = queryString.parse(location.search)
  let page = parsed.page ? parsed.page : 1
  const promoCodeId = parsed.promoCodeId
  const companieId = parsed.companieId
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'

  return (
    <div className="paperOut">
      <h1>{`PromoCodes`}</h1>
      <Filters showCompanieId />
      <PromoCodesAdminQuery
        page={page}
        variables={{
          where: {
            id: promoCodeId,
            companie: companieId && {
              id: companieId,
            },
          },
          first,
          orderBy,
          skip: (page - 1) * first,
        }}
      />
    </div>
  )
}

export default PromoCodesAdminPage
