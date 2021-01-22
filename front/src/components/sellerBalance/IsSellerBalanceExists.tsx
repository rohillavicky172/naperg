import React from 'react'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import CreateSellerBalance from './CreateSellerBalance'

const QUERY = gql`
  query SellerBalances($where: SellerBalanceWhereInput!) {
    sellerBalances(where: $where) {
      id
    }
  }
`

type Props = {
  productId: string
  companieId: string
}

const IsSellerBalanceExists = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        companie: {
          id: props.companieId,
        },
        product: {
          id: { equals: props.productId },
        },
        testMode: context.testMode,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.sellerBalances) return <NotFound />

  if (data.sellerBalances.length === 0) {
    return <CreateSellerBalance productId={props.productId} companieId={props.companieId} />
  }
  return null
}

export default IsSellerBalanceExists
