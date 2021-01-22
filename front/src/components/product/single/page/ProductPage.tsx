import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { useParams } from 'react-router'
import { PRODUCT_QUERY } from '../../GraphQL'
import ProductPageHeader from './ProductPageHeader'
import ProductPageDescription from './ProductPageDescription'
import { ParamTypes } from '../../../ParamTypes.type'

const ProductPage = () => {
  const { productId }: ParamTypes = useParams<ParamTypes>()

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      where: {
        id: productId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.product) return <NotFound />

  return (
    <>
      <ProductPageHeader product={data.product} />

      <ProductPageDescription product={data.product} />
    </>
  )
}

export default ProductPage
