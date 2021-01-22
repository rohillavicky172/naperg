import gql from 'graphql-tag'

export const CARDHOLDERS_QUERY = gql`
  query CardholdersConnection($where: CardholderWhereInput, $orderBy: CardholderOrderByInput, $first: Int, $skip: Int) {
    cardholdersConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          name
          stripe_issuedCardHolder_id
          companie {
            id
            name
          }
          user {
            id
            firstName
            lastName
          }
          cardholderStripe {
            id
            created
            email
            object
            name
            phone_number

            livemode
            individual {
              first_name
              last_name
              dob {
                day
                month
                year
              }
            }
            billing {
              address {
                line1
                line2
                city
                country
                state
                postal_code
              }
            }
          }
          issuedCards {
            id
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

export const CARDHOLDER_QUERY = gql`
  query Cardholder($where: CardholderWhereUniqueInput!) {
    cardholder(where: $where) {
      id
      name
      stripe_issuedCardHolder_id
      companie {
        id
        name
      }
      user {
        id
        firstName
        lastName
      }
      cardholderStripe {
        id
        created
        email
        object
        name
        phone_number
        livemode
        billing {
          address {
            line1
            line2
            city
            country
            state
            postal_code
          }
        }
      }
      issuedCards {
        id
      }
    }
  }
`

// export const CREATE_LOG_MUTATION = gql`
//   mutation CreateCardholder($data: CardholderCreateInput!) {
//     createCardholder(data: $data) {
//       id
//     }
//   }
// `

// export const DELETE_LOG_MUTATION = gql`
//   mutation deletecardholder($where: CardholderWhereUniqueInput!) {
//     deleteCardholder(where: $where) {
//       id
//     }
//   }
// `
