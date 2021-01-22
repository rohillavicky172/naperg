import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { Match } from '../../../Match.type'
import { PRODUCT_QUERY } from '../../GraphQL'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import ProductActivity from './ProductActivity'
import ProductPageHeader from './ProductPageHeader'

type Props = {
  productId: string
  match: Match
}

const ProductActivityPage = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)
  const productId = props.match.params.productId
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

  const companieId = context.userRoleCompanie.companie.id

  return (
    <>
      <ProductPageHeader product={data.product} />
      <ProductActivity product={data.product} userId={context.me.id} companieId={companieId} />
    </>
  )
}

export default ProductActivityPage
