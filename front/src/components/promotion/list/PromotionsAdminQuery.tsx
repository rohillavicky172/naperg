import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import Pagination from '../../nav/Pagination'
import { PROMOTIONS_QUERY } from '../GraphQL'
import SinglePromotionAdmin from './SinglePromotionAdmin'
// import { Product } from '../../product/Product.type'
// import SinglePromotion from '../SinglePromotion'

type Props = {
  page: number
  variables: any
}

const PromotionsAdminQuery = (props: Props) => {
  console.log(props.variables)
  const { loading, error, data } = useQuery(PROMOTIONS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.promotionsConnection) return <NotFound />

  return (
    <>
      <div className="paperOut">
        {data.promotionsConnection.edges.map((promotionNode) => (
          <div key={promotionNode.node.id}>
            {/* <SingleInvoiceList userId={this.props.userId} invoice={invoice.node} /> */}
            <SinglePromotionAdmin promotion={promotionNode.node} />
          </div>
        ))}
        <Grid container>
          <Grid item xs={12} sm={9} className="marginAuto">
            <Pagination page={props.page} first={props.variables.first} count={data.promotionsConnection.aggregate.count} />
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default PromotionsAdminQuery
