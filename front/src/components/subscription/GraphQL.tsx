import gql from 'graphql-tag'

export const SUBSCRIPTIONS_QUERY = gql`
  query SubscriptionsQueryConnection(
    $orderBy: SubscriptionOrderByInput
    $where: SubscriptionWhereInput
    $skip: Int
    $first: Int
  ) {
    subscriptionsConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          averagePrice
          countAveragePrice
          lastInvoiceDate
          paymentFrequency
          companie {
            id
            name
            isPersonal
          }
          issuedCard {
            id
            name
            status
            last4
          }
          user {
            id
            firstName
            lastName
          }
          status
          # dateCancellation
          # subscriptionInvoices (orderBy: createdAt_DESC, first: 1) {
          #   id
          #   invoice {
          #     id
          #     createdAt
          #   }
          # }
          product {
            id
            name
            urlName

            nameFile
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

export const DELETE_SUBSCRIPTION = gql`
  mutation deleteSubscription($where: SubscriptionWhereUniqueInput!) {
    deleteSubscription(where: $where) {
      id
    }
  }
`

export const UPDATE_SUBSCRIPTION_MUTATION = gql`
  mutation UpdateSubscriptionMutation($data: SubscriptionUpdateInput!, $where: SubscriptionWhereUniqueInput!) {
    updateSubscription(data: $data, where: $where) {
      id
      status
    }
  }
`

// export const APPROVE_SIGNUP_SELLER_SUBSCRIPTION = gql`
//   mutation approveSignupSellerSubscription($where: SubscriptionWhereUniqueInput!) {
//     approveSignupSellerSubscription(where: $where) {
//       id
//     }
//   }
// `

export const SUBSCRIPTION_QUERY = gql`
  query SubscriptionQuery($where: SubscriptionWhereUniqueInput!) {
    subscription(where: $where) {
      id
      lastInvoiceDate
      dateCreation
      companie {
        id
        isPersonal
        name
      }

      user {
        id
        firstName
        lastName
        nameFile
      }

      issuedCard {
        id
        name
        stripe_issuedCard_id
        status
        last4
        issuedCardStripe {
          id
          last4
          object
          exp_month
          exp_year
          brand
        }

        user {
          id
          firstName
          lastName
        }
      }
      product {
        id
        nameFile
        name
        urlName
      }
    }
  }
`
