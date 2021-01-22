import React from 'react'
import { useQuery } from '@apollo/react-hooks'
// import Grid from '@material-ui/core/Grid'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
// import Pagination from '../../nav/Pagination'

import SinglePromoCode from './SinglePromoCode'
// import { Product } from '../../product/Product.type'
// import SinglePromoCode from '../SinglePromoCode'

import gql from 'graphql-tag'

export const PROMOTIONS = gql`
  query PromoCodesConnection($where: PromoCodeWhereInput!, $orderBy: PromoCodeOrderByInput, $skip: Int, $first: Int) {
    promoCodesConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          code
          isRedeem
          description
          createdAt
          companie {
            id
            name
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

type Props = {
  companieId: string
}

const SettingsCompaniePromoCodes = (props: Props) => {
  const { loading, error, data } = useQuery(PROMOTIONS, {
    variables: {
      where: {
        companie: {
          id: props.companieId,
        },
        isRedeem: true,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.promoCodesConnection) return <NotFound />

  return (
    <>
      <div className="">
        {data.promoCodesConnection.edges.map((promoCodeNode) => (
          <div key={promoCodeNode.node.id}>
            <SinglePromoCode promoCode={promoCodeNode.node} />
          </div>
        ))}
      </div>
    </>
  )
}

export default SettingsCompaniePromoCodes
