import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Paper from '@material-ui/core/Paper'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import AddPromotionContainer from './AddPromotionContainer'
import { Product } from '../product/Product.type'
import { PromotionNode } from '../promotion/Promotion.type'
import SinglePromotion from './SinglePromotion'
import { PROMOTIONS_QUERY } from './GraphQL'

type Props = {
  variables: any
  product: Product
}

const Promotions = (props: Props) => {
  const { loading, error, data } = useQuery(PROMOTIONS_QUERY, {
    variables: props.variables,
  })

  if (error) {
    return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  }

  if (loading) {
    return <Loading />
  }

  if (!data.promotionsConnection) {
    return <NotFound />
  }

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>{`Promotions`}</h3>
        {data.promotionsConnection.edges.map((promotionNode: PromotionNode) => (
          <div key={promotionNode.node.id}>
            <SinglePromotion product={props.product} promotion={promotionNode.node} />
          </div>
        ))}
        <br />
        <AddPromotionContainer product={props.product} />
      </Paper>
    </div>
  )
}

export default Promotions
