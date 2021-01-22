import React from 'react'
import ProductsMarketplaceQuery from './ProductsMarketplaceQuery'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const ProductsMarketplace = () => {
  const location = useLocation()
  const first = 32
  const parsed = queryString.parse(location.search)
  const productName = parsed.productName
  const page = parsed.page ? parsed.page : 1

  return (
    <>
      <div className="paperOut">
        <h3>{`Search Results`}</h3>
        <div style={{ height: '30px' }} />
        <ProductsMarketplaceQuery
          isActionClickIsLink={true}
          page={page}
          variables={{
            first: first,
            skip: (page - 1) * first,
            where: {
              visibility: 'PUBLIC',
              typeProduct_in: ['BTOB', 'BTOB_AND_CONSUMER'],
              productFrequency_in: ['SUBSCRIPTION'],
              name: { contains: productName },
            },
          }}
        />
      </div>
    </>
  )
}

export default ProductsMarketplace
