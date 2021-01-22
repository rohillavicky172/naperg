import gql from 'graphql-tag'

export const PROMOTIONS_QUERY = gql`
  query PromotionsConnection($where: PromotionWhereInput!, $orderBy: PromotionOrderByInput, $skip: Int, $first: Int) {
    promotionsConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          createdAt
          howToRedeem
          # showHowToRedeem
          typeRedeem
          startAt
          endAt
          text1
          text2
          text3
          window
          discount
          type
          isPromotionLive
          createdBy {
            id
            firstName
            lastName
          }
          product {
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
