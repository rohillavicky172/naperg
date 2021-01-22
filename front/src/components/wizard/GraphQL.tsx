import gql from 'graphql-tag'
export const GET_STARTED_BANNER = gql`
  query GetStartedBanners($companieId: String!, $userId: String!) {
    getStartedBanners(companieId: $companieId, userId: $userId) {
      position
      done
      type
    }
  }
`
