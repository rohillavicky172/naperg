import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { PROMOTIONS_QUERY } from '../GraphQL'
import SinglePromotionAdmin from './SinglePromotionAdmin'
import DisconnectPromotionSubscription from '../../subscription/single/action/DisconnectPromotionSubscription'
// import Grid from '@material-ui/core/Grid'
// import Pagination from '../../nav/Pagination'
// import { Product } from '../../product/Product.type'
// import SinglePromotion from '../SinglePromotion'

type Props = {
  variables: any
  subscriptionId: string
}

const PromotionsLight = (props: Props) => {
  const { loading, error, data, refetch } = useQuery(PROMOTIONS_QUERY, {
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
            <DisconnectPromotionSubscription
              onUpdate={() => refetch()}
              promotionId={promotionNode.node.id}
              subscriptionId={props.subscriptionId}
            />
            <SinglePromotionAdmin promotion={promotionNode.node} />
          </div>
        ))}
      </div>
    </>
  )
}

export default PromotionsLight
