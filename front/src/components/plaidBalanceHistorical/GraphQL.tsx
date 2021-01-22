import gql from 'graphql-tag'

export const PLAID_BALANCE_HISTORICALS_QUERY = gql`
  query PlaidBalanceHistoricalsConnection(
    $where: PlaidBalanceHistoricalWhereInput
    $orderBy: PlaidBalanceHistoricalOrderByInput
    $first: Int
    $skip: Int
  ) {
    plaidBalanceHistoricalsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          testMode
          account_id
          mask
          name
          official_name
          subtype
          type
          available
          current
          iso_currency_code
          item_id
          request_id
          institution_id
          plaidData {
            id
          }
          companie {
            id
            name
            maxTransactionValue
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`
