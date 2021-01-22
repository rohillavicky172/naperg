import gql from 'graphql-tag'

export const TRACKINGLINKS_QUERY = gql`
  query TrackingLinksConnection($where: TrackingLinkWhereInput, $orderBy: TrackingLinkOrderByInput, $first: Int, $skip: Int) {
    trackingLinksConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          link
          date
          origin
          product {
            id
            name
          }

          user {
            id
            firstName
            lastName
          }

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
