import gql from 'graphql-tag'

export const BALANCES_QUERY = gql`
  query Balances($where: BalanceWhereInput!, $orderBy: BalanceOrderByInput, $skip: Int, $first: Int) {
    balancesConnection(
      where: $where
      orderBy: $orderBy
      skip: $skip

      first: $first
    ) {
      edges {
        node {
          id
          createdAt
          valueBalance
          currency
          pendingBalance
          minimumBalance
          unpaidCharge
          cashbackPending
          cashbackAvailable
          availableAmountToRefund
          maxAvailableAmountToRefund
          isEnabled
          pendingCharge
          pendingSmallAmount
          revshareSellerTotal
          revshareSellerTotalPaid
          companie {
            id
            name
            typeCreation
            isTrustedPayment
            hideCashOut
            userRoleCompanies {
              id
              user {
                id
                firstName
                lastName
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
export const BALANCE_QUERY = gql`
  query Balance($where: BalanceWhereUniqueInput!) {
    balance(where: $where) {
      id
      currency
      valueBalance
      pendingBalance
      minimumBalance
      unpaidCharge
      cashbackPending
      cashbackAvailable
      isEnabled
      pendingCharge
      pendingSmallAmount
      availableAmountToRefund
      maxAvailableAmountToRefund
      revshareSellerTotal
      revshareSellerTotalPaid
      companie {
        id
        name
      }
    }
  }
`

export const CREATE_TOP_UP = gql`
  mutation CreateTopUp($amount: Float!, $companieId: String!) {
    createTopUp(amount: $amount, companieId: $companieId) {
      id
    }
  }
`
export const CREATE_BALANCE = gql`
  mutation CreateBalance($data: BalanceCreateInput!) {
    createBalance(data: $data) {
      id
    }
  }
`

export const UPDATE_BALANCE_MUTATION = gql`
  mutation UpdateBalance($data: BalanceUpdateInput!, $where: BalanceWhereUniqueInput!) {
    updateBalance(data: $data, where: $where) {
      id
      valueBalance
      pendingBalance
      pendingCharge
      pendingSmallAmount
      unpaidCharge
      cashbackPending
      cashbackAvailable
      revshareSellerTotal
      revshareSellerTotalPaid
    }
  }
`

export const CREATE_AUTO_TOP_UP = gql`
  mutation CreateAutoTopUp($minimumBalance: Float!, $isEnabled: Boolean!, $where: BalanceWhereUniqueInput!) {
    createAutoTopUp(minimumBalance: $minimumBalance, isEnabled: $isEnabled, where: $where) {
      id
    }
  }
`
export const CASH_OUT = gql`
  mutation CashOut($companieId: String!) {
    cashOut(companieId: $companieId) {
      id
    }
  }
`
