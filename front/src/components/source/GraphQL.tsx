import gql from 'graphql-tag'

export const SOURCES_QUERY = gql`
  query SourcesConnection($where: SourceWhereInput, $orderBy: SourceOrderByInput, $first: Int, $skip: Int) {
    sourcesConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          deletedAt
          isDefaultSource
          isDeleted
          last4
          status
          currency
          country
          routing_number
          customer
          externalId
          nickname

          brand
          bank_name
          object
          funding

          exp_month
          exp_year

          address_city
          address_country
          address_line1
          address_line1_check
          address_line2
          address_state

          address_zip
          address_zip_check
          cvc_check
          dynamic_last4
          fingerprint
          name
          tokenization_method
          plaidData {
            id
            verificationStatus
          }

          companie {
            id
            name
          }
          user {
            id
            firstName
            lastName
            email
          }
          account_holder_name
          account_holder_name
        }
      }
      aggregate {
        count
      }
    }
  }
`

export const UPDATE_DEFAULT_SOURCE_MUTATION = gql`
  mutation SetDefaultSource($where: SourceWhereUniqueInput!) {
    setDefaultSource(where: $where) {
      id
    }
  }
`

// export const SOURCE_QUERY = gql`
//   query Source($where: SourceWhereUniqueInput!) {
//     source(where: $where) {
//       id
//       createdAt
//       deletedAt
//       isDefaultSource
//       last4
//       customer
//       status

//       currency
//       country
//       routing_number
//       customer
//       nickname

//       brand
//       bank_name
//       object
//       funding

//       exp_month
//       exp_year

//       address_city
//       address_country
//       address_line1
//       address_line1_check
//       address_line2
//       address_state

//       address_zip
//       address_zip_check
//       cvc_check
//       dynamic_last4
//       fingerprint
//       name
//       tokenization_method
//       plaidData {
//         id
//       }
//       companie {
//         id
//         name
//       }
//       account_holder_name
//     }
//   }
// `

// export const CREATE_LOG_MUTATION = gql`
//   mutation CreateSource($data: SourceCreateInput!) {
//     createSource(data: $data) {
//       id
//     }
//   }
// `

export const DELETE_SOURCE_MUTATION = gql`
  mutation deleteSource($where: SourceWhereUniqueInput!) {
    deleteSource(where: $where) {
      id
    }
  }
`
export const DELETE_SOURCE_LOGICALLY_MUTATION = gql`
  mutation DeleteSourceLogically($where: SourceWhereUniqueInput!) {
    deleteSourceLogically(where: $where) {
      id
    }
  }
`

export const UPDATE_SOURCE_MUTATION = gql`
  mutation UpdateSource($data: SourceUpdateInput!, $where: SourceWhereUniqueInput!) {
    updateSource(data: $data, where: $where) {
      id
    }
  }
`

export const VERIFY_SOURCE_MUTATION = gql`
  mutation VerifySource($sourceId: String!, $number1: Float!, $number2: Float!) {
    verifySource(sourceId: $sourceId, number1: $number1, number2: $number2) {
      id
    }
  }
`
