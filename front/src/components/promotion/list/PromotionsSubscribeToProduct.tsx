import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { PROMOTIONS_QUERY } from '../GraphQL'
import { PromotionNode } from '../Promotion.type'

type Props = {
  variables: any
}

const PromotionsSubscribeToProduct = (props: Props) => {
  const { loading, error, data } = useQuery(PROMOTIONS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.promotionsConnection) return <NotFound />

  return (
    <>
      <div className="paperOut">
        {data.promotionsConnection.edges.map((promotionNode: PromotionNode) => (
          <div key={promotionNode.node.id}>
            <div key={promotionNode.node.id} className="primary">
              <div style={{ height: '10px' }} />
              <h3>Reward Details</h3>
              <div>{promotionNode.node.text1}</div>
              <div>{promotionNode.node.text2}</div>
              <div className="italic">{promotionNode.node.text3}</div>
              {/* <div className="italic">Offer applies to new users only</div> */}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PromotionsSubscribeToProduct
