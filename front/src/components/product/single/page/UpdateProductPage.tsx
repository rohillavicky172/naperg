import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { Match } from '../../../Match.type'
import UpdateProduct from '../edit/UpdateProduct'
import { PRODUCT_QUERY } from '../../GraphQL'

type Props = {
  productId: string
  match: Match
}

const UpdateProductPage = (props: Props) => {
  const productId = props.match.params.productId

  const { loading, error, data } = useQuery(PRODUCT_QUERY, {
    variables: {
      where: {
        id: productId
      }
    }
  })

  // render() {
  if (error) {
    return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  }
  if (loading) {
    return <Loading />
  }
  if (!data) {
    return <NotFound />
  }

  return (
    <>
      <UpdateProduct product={data.product} />
    </>
  )
}

export default UpdateProductPage
