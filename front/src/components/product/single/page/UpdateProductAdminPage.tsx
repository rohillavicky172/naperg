import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'

import { ParamTypes } from '../../../ParamTypes.type'
import UpdateProductAdmin from '../edit/UpdateProductAdmin'
import { useParams } from 'react-router'

import gql from 'graphql-tag'

export const QUERY = gql`
  query ProductQuery($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      subscribed
      name
      subName
      textButton
      urlName
      levelBtoB
      discount
      typeProduct
      previewOgImage
      productFrequency
      creationType
      showShowcase
      showMarketplace
      policyLink
      privateData
      sellerLink
      altNameFile
      altNameFileBanner

      nameFile
      nameFileBanner
      productDescription
      shortDescription

      visibility
    }
  }
`
const UpdateProductAdminPage = () => {
  const params: ParamTypes = useParams<ParamTypes>()
  const productId = params.productId

  const { loading, error, data } = useQuery(QUERY, {
    variables: { where: { id: productId } },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data) return <NotFound />

  return <UpdateProductAdmin product={data.product} />
}

export default UpdateProductAdminPage
