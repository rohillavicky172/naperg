import gql from 'graphql-tag'

export const CURRENCIES_QUERY = gql`
  query Currencies($where: InvoiceWhereInput!) {
    currencies(where: $where) {
      currency
    }
  }
`
