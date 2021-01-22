import gql from 'graphql-tag'

export const CREATE_CARD_MUTATION = gql`
  mutation CreateCardMutation($tokenCardId: String!, $companieId: String!) {
    createCard(tokenCardId: $tokenCardId, companieId: $companieId) {
      id
    }
  }
`
export const CREATE_ACH_SOURCE_MUTATION = gql`
  mutation CreateAchSourceMutation($tokenCardId: String!, $companieId: String!) {
    createAchSourceMutation(tokenCardId: $tokenCardId, companieId: $companieId) {
      id
    }
  }
`
export const CARDS_QUERY = gql`
  query Cards($where: CardWhereInput) {
    cards(where: $where) {
      id
      stripe_card_id
      cardStripe {
        id
        exp_month
        exp_year
        last4
        brand
        country
        funding
      }
    }
  }
`

// export const USER_STRIPE_QUERY = gql`
//   query GetUserStripe($userId: String!) {
//     getUserStripe(userId: $userId) {
//       id
//       default_source
//       currency
//       email
//       sources {
//         object
//         data {
//           id
//           object
//           exp_month
//           exp_year
//           last4
//           brand
//           country
//           funding
//         }
//       }
//     }
//   }
// `
// export const COMPANIE_STRIPE_QUERY = gql`
//   query GetCompanieStripe($companieId: String!) {
//     getCompanieStripe(companieId: $companieId) {
//       id
//       default_source
//       currency
//       email
//       sources {
//         object
//         data {
//           id
//           object
//           account_holder_name
//           account_holder_type
//           bank_name
//           exp_month
//           exp_year
//           last4
//           brand
//           country
//           funding
//           status
//           receiver {
//             address
//             amount_received
//             amount_charged
//             amount_returned
//             refund_attributes_status
//             refund_attributes_method
//           }

//           ach_credit_transfer {
//             account_number
//             routing_number
//             fingerprint
//             bank_name
//             swift_code
//           }
//         }
//       }
//     }
//   }
// `

export const DELETE_CARD_MUTATION = gql`
  mutation DeleteCard($stripe_card_id: String!, $companieId: String!) {
    deleteCard(stripe_card_id: $stripe_card_id, companieId: $companieId) {
      id
    }
  }
`
