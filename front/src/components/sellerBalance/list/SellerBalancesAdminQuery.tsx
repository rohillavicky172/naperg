import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import SingleAdminSellerBalance from './SingleAdminSellerBalance'
import Pagination from '../../nav/Pagination'
import Grid from '@material-ui/core/Grid'
import gql from 'graphql-tag'

export const QUERY = gql`
  query SellerBalances($where: SellerBalanceWhereInput!, $orderBy: SellerBalanceOrderByInput, $skip: Int, $first: Int) {
    sellerBalancesConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip

      first: $first
    ) {
      edges {
        node {
          id
          createdAt
          createdAt

          revshareSellerTotal
          revshareSellerTotalPaid

          product {
            id
            name
          }
          revshareSellerTotalPaidPending

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
  page: number
  variables: any
}

const SellerBalancesAdminQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.sellerBalancesConnection) return <NotFound />

  return (
    <div>
      {data.sellerBalancesConnection.edges.map((nodeBalance) => (
        <SingleAdminSellerBalance key={nodeBalance.node.id} sellerBalance={nodeBalance.node} />
      ))}
      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.sellerBalancesConnection.aggregate.count} />
        </Grid>
      </Grid>
    </div>
  )
}

export default SellerBalancesAdminQuery
