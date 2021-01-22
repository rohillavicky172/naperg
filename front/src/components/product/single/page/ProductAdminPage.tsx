import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
import TabSubProductBtoB from './TabSubProductBtoB'
import ProductDetailsAdmin from './ProductDetailsAdmin'
import ProductPageHeader from './ProductPageHeader'
// import MerchantDatas from '../../../merchantData/MerchantDatas'
// import ProductPageDescription from './ProductPageDescription'

import PromotionsProductAdmin from '../../../promotion/PromotionsProductAdmin'
const queryString = require('query-string')

export const QUERY = gql`
  query ProductQuery($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      id
      subscribed
      name
      createdAt
      urlName
      subName
      levelBtoB

      discount
      typeProduct
      productFrequency
      creationType
      ruleMerchantDatas {
        id
      }

      ownerCompanie {
        id
        name
      }
      policyLink
      privateData
      sellerLink

      promotions {
        id
        discount
        startAt
        text1
        text2
        text3
        endAt
      }

      nameFile
      nameFileBanner
      productDescription
      shortDescription

      visibility

      positionProducts {
        id
        categorieProduct {
          id
          urlName
          name
          visibility
        }
      }
    }
  }
`

type Props = {
  location: Location
  productId: string
}

const ProductAdminPage = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)
  const params: ParamTypes = useParams<ParamTypes>()
  const productId = params.productId
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: productId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.product) return <NotFound />

  const companieId = context.userRoleCompanie.companie.id
  const parsed = queryString.parse(props.location.search)
  const tab = parsed.tab

  return (
    <>
      <TabSubProductBtoB product={data.product} />
      <ProductPageHeader product={data.product} />

      {tab === 'Promotion' && <PromotionsProductAdmin product={data.product} />}
      {(tab === 'Admin' || !tab) && <ProductDetailsAdmin product={data.product} userId={context.me.id} companieId={companieId} />}
    </>
  )
}

export default ProductAdminPage
