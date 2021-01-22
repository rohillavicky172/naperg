import gql from 'graphql-tag'

export const PLAIDDATAS_QUERY = gql`
  query PlaidDatasConnection($where: PlaidDataWhereInput, $orderBy: PlaidDataOrderByInput, $first: Int, $skip: Int) {
    plaidDatasConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          testMode
          createdAt
          dateBalanceRequested
          metaDataPlaid
          error
          resetLogin
          name
          mask
          type
          publicTokenFresh
          subtype
          institution
          accountIdPlaid
          stripeSourceId
          publicTokenPlaid
          metaDataPlaidBalances
          metaDataPlaidTransactions
          metaDataPlaidIdentity
          publicTokenVerifyMicroD
          bankAccountToken
          accessToken
          verificationStatus
          source {
            id
            isDefaultSource
          }
          companie {
            id
            name
            userRoleCompanies {
              id
              user {
                id
                name
              }
            }
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

export const PLAID_SET_VERIFICATION_STATUS = gql`
  mutation PlaidSetVerificationStatus($plaidDataId: String!) {
    plaidSetVerificationStatus(plaidDataId: $plaidDataId)
  }
`
export const GET_PLAID_BALANCE_MUTATION = gql`
  mutation GetPlaidBalance($plaidDataId: String!) {
    getPlaidBalance(plaidDataId: $plaidDataId) {
      id
      metaDataPlaidBalances
    }
  }
`
export const LINK_PLAID_STRIPE_MUTATION = gql`
  mutation LinkPlaidStripe($plaidDataId: String!) {
    linkPlaidStripe(plaidDataId: $plaidDataId) {
      id
    }
  }
`
export const GET_PLAID_TRANSACTIONS_MUTATION = gql`
  mutation GetPlaidTransactions($plaidDataId: String!) {
    getPlaidTransactions(plaidDataId: $plaidDataId) {
      id
      metaDataPlaidTransactions
    }
  }
`
export const GET_PLAID_IDENTITY_MUTATION = gql`
  mutation GetPlaidIdentity($plaidDataId: String!) {
    getPlaidIdentity(plaidDataId: $plaidDataId) {
      id
      metaDataPlaidIdentity
    }
  }
`
export const GET_PLAID_AUTH_MUTATION = gql`
  mutation GetPlaidAuth($plaidDataId: String!) {
    getPlaidAuth(plaidDataId: $plaidDataId)
  }
`

export const VALIDATE_MICRO_DEPOSITS = gql`
  mutation ValidateMicroDeposits(
    $companieId: ID!
    $publicToken: ID!
    $accountId: ID!
    $metaDataString: String
    $name: String
    $mask: String
    $type: String
    $subtype: String
    $verificationStatus: String
    $institution: String
  ) {
    validateMicroDeposits(
      companieId: $companieId
      publicToken: $publicToken
      accountId: $accountId
      metaDataString: $metaDataString
      subtype: $subtype
      type: $type
      mask: $mask
      name: $name
      verificationStatus: $verificationStatus
      institution: $institution
    ) {
      id
      verificationStatus
    }
  }
`
