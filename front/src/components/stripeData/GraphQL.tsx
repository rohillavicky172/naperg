import gql from 'graphql-tag'

export const STRIPE_BALANCE_RETRIEVE_QUERY = gql`
  query StripeBalanceRetrieve {
    stripeBalanceRetrieve
  }
`
export const CREATE_TOPUP_STRIPE_MUTATION = gql`
  mutation CreateTopUpStripe($amount: Float!, $description: String!) {
    createTopUpStripe(amount: $amount, description: $description)
  }
`
