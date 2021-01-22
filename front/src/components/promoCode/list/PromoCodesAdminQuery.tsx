import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import Pagination from '../../nav/Pagination'

import SinglePromoCodeAdmin from './SinglePromoCodeAdmin'
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
          startAt
          endAt
          type
          description
          isRedeem
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
  page: number
  variables: any
}

const PromoCodesAdminQuery = (props: Props) => {
  console.log(props.variables)
  const { loading, error, data } = useQuery(PROMOTIONS, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.promoCodesConnection) return <NotFound />

  return (
    <>
      <div className="paperOut">
        {data.promoCodesConnection.edges.map((promoCodeNode) => (
          <div key={promoCodeNode.node.id}>
            {/* <SingleInvoiceList userId={this.props.userId} invoice={invoice.node} /> */}
            <SinglePromoCodeAdmin promoCode={promoCodeNode.node} />
          </div>
        ))}
        <Grid container>
          <Grid item xs={12} sm={9} className="marginAuto">
            <Pagination page={props.page} first={props.variables.first} count={data.promoCodesConnection.aggregate.count} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default PromoCodesAdminQuery
