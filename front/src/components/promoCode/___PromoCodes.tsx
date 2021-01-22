import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Paper from '@material-ui/core/Paper'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
// import AddPromoCodeContainer from './AddPromoCodeContainer'

import { Product } from '../product/Product.type'
// import { PromoCodeNode } from '../promoCode/PromoCode.type'
// import SinglePromoCode from './SinglePromoCode'
// import { PROMOTIONS_QUERY } from './GraphQL'

type Props = {
  variables: any
  product: Product
}

const PromoCodes = (props: Props) => {
  // const { loading, error, data } = useQuery(PROMOTIONS_QUERY, {
  //   variables: props.variables,
  // })

  // if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  // if (loading) return <Loading />
  // if (!data.promoCodesConnection) return <NotFound />

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>{`PromoCodes`}</h3>
        {/* 
        {data.promoCodesConnection.edges.map((promoCodeNode: PromoCodeNode) => (
          <div key={promoCodeNode.node.id}>
            <SinglePromoCode product={props.product} promoCode={promoCodeNode.node} />
          </div>
        ))} */}
        <br />
        {/* <AddPromoCodeContainer product={props.product} /> */}
      </Paper>
    </div>
  )
}

export default PromoCodes
