import React from 'react'
import Paper from '@material-ui/core/Paper'
import MerchantDatasAdminQuery from './MerchantDatasAdminQuery'
import Filters from '../../nav/filter/Filters'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
// import { withContext } from '../../withContext'
// import { AppContext } from '../../AppContext'
// import { Context } from '../../Context.type'

const MerchantDatasAdminPage = () => {
  const first = 10
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const page = Number(parsed.page ? parsed.page : 1)
  const search = parsed.search ? parsed.search : undefined
  const productId = parsed.productId

  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`MerchantDatas`}</h3>
          <Filters searchPlaceholder={'Search'} showProductId />

          <MerchantDatasAdminQuery
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy,
              where: {
                product: (search || productId) && {
                  id: { equals: productId },
                  name: {
                    contains: search,
                  },
                },
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default MerchantDatasAdminPage
