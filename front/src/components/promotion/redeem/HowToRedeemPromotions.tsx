import React from 'react'
import { IssuedCard } from '../../issuedCard/IssuedCard.type'
import GoToVendorWebsite from '../../issuedCard/single/GoToVendorWebsite'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { PromotionNode } from '../Promotion.type'
import HowToRedeemDialog from './HowToRedeemDialog'

export const QUERY = gql`
  query PromotionsConnection($where: PromotionWhereInput!) {
    promotionsConnection(where: $where) {
      edges {
        node {
          id
          endAt
          text1
          text2
          text3
          howToRedeem
          # showHowToRedeem
          typeRedeem
          isPromotionLive
          product {
            id
            name
            nameFile
          }
        }
      }
    }
  }
`

type Props = {
  productId: string
  issuedCard: IssuedCard
}

const HowToRedeemPromotions = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        type: 'CASHBACK',
        product: {
          id: { equals: props.productId },
        },
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.promotionsConnection) return <NotFound />

  return (
    <>
      {data.promotionsConnection.edges.length === 0 ? (
        <GoToVendorWebsite issuedCard={props.issuedCard} />
      ) : (
        <>
          {data.promotionsConnection.edges.map((promotionNode: PromotionNode) => (
            <div key={promotionNode.node.id}>
              {promotionNode.node.typeRedeem === 'NONE' ? (
                <GoToVendorWebsite issuedCard={props.issuedCard} />
              ) : (
                <HowToRedeemDialog issuedCard={props.issuedCard} promotion={promotionNode.node} />
              )}
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default HowToRedeemPromotions
