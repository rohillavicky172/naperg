import React from 'react'
import ProductsAdminQuery from './ProductsAdminQuery'
import { useLocation } from 'react-router-dom'
import Filters from '../../nav/filter/Filters'
const queryString = require('query-string')

const ProductsAdminPage = () => {
  const location = useLocation()
  const first = 56

  const parsed = queryString.parse(location.search)
  const productName = parsed.productName
  const page = parsed.page ? parsed.page : 1
  const search = parsed.search ? parsed.search : undefined
  const privateData = parsed.privateData ? parsed.privateData : undefined
  const productFrequency = typeof parsed.productFrequency === 'string' ? [parsed.productFrequency] : parsed.productFrequency
  // const typeProduct = typeof parsed.typeProduct === 'string' ? [parsed.typeProduct] : parsed.typeProduct
  const creationType = typeof parsed.creationType === 'string' ? [parsed.creationType] : parsed.creationType
  const visibility = typeof parsed.visibility === 'string' ? [parsed.visibility] : parsed.visibility

  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'

  return (
    <>
      <div className="paperOut">
        <h3>{`Products`}</h3>
        <Filters
          showOrderByCreated
          showProductName
          showEmptyColumn
          showEmptyColumn2
          showProductFrequency
          showCreationType
          showVisibility
          showPrivateData
          searchPlaceholder={'Product Name, Private data'}
        />

        <div style={{ height: '30px' }} />
        <ProductsAdminQuery
          page={page}
          variables={{
            orderBy,
            first: first,
            skip: (page - 1) * first,
            where: {
              OR: search && [
                { name: { contains: search } },
                { privateData: { contains: search } },
                { subName: { contains: search } },
                { productDescription: { contains: search } },
                { shortDescription: { contains: search } },
              ],
              visibility_in: visibility,
              privateData: { contains: privateData },
              creationType_in: creationType,
              // typeProduct_in: typeProduct,
              productFrequency_in: productFrequency,
              // communicationWithSellerType: 'ISSUING_CARD',
              name: { contains: productName },
              // visibility_in: ['CREATED_BY_ISSUED_CARD', 'PUBLIC']
            },
          }}
        />
      </div>
    </>
  )
}

export default ProductsAdminPage
