import gql from 'graphql-tag'

export const CREATE_ISSUED_CARD = gql`
  mutation CreateIssuedCard($data: IssuedCardCreateInput!) {
    createIssuedCard(data: $data) {
      id
    }
  }
`

export const UPDATE_STATUS_ISSUED_CARD = gql`
  mutation UpdateStatusIssuedCard($issuedCardId: String!, $status: String!) {
    updateStatusIssuedCard(issuedCardId: $issuedCardId, status: $status) {
      id

      status
    }
  }
`

export const UPDATE_ISSUED_CARD = gql`
  mutation UpdateIssuedCard($data: IssuedCardUpdateInput!, $where: IssuedCardWhereUniqueInput!) {
    updateIssuedCard(data: $data, where: $where) {
      id
      name
      status
      authorizedAmount
      authorizedAmountUnit
      alreadySpent
      description
      issuedCardCode
      last4
      type
      notification
      # authorizationType
      testMode
      statusRequested
      dateApproved
      isRequested
      city
      limitPerTransaction
      createdAt
      dateValidFrom
      dateValidTo

      stripe_issuedCard_id
    }
  }
`

export const APPROVE_ISSUED_CARD = gql`
  mutation ApproveIssuedCard($data: IssuedCardUpdateInput!, $where: IssuedCardWhereUniqueInput!) {
    approveIssuedCard(data: $data, where: $where) {
      id
      statusRequested
      dateApproved
      approvedBy {
        id
        firstName
        lastName
      }
    }
  }
`

export const ISSUED_CARD_QUERY = gql`
  query IssuedCard($where: IssuedCardWhereUniqueInput!) {
    issuedCard(where: $where) {
      id
      name
      status

      authorizedAmount
      authorizedAmountUnit
      alreadySpent
      description
      issuedCardCode
      last4
      issuedCardType
      type
      notification
      testMode
      statusRequested
      dateApproved
      isRequested
      city
      limitPerTransaction
      createdAt
      dateValidFrom
      dateValidTo
      cardholder {
        id
      }
      invoice {
        id
        smallId
      }
      authDevice {
        id
        friendlyDeviceType
        friendlyOsName
        friendlyDeviceModel
        city
        timeZone
        lastLogin
      }

      initProduct {
        id
        name
        nameFile
        sellerLink
      }

      user {
        id
        firstName
        lastName
        phoneCode
        phone
      }
      createdBy {
        id
        firstName
        lastName
      }
      approvedBy {
        id
        firstName
        lastName
      }
      companie {
        id
        name

        isTrustedPayment
        isPersonal
      }
      stripe_issuedCard_id

      issuedCardStripe {
        id
        exp_year
        exp_month
        status
        shipping {
          carrier
          eta
          name
          status
          tracking_number
          tracking_url
          type
          address {
            city
            country
            line1
            line2
            postal_code
            state
          }
        }
        object
        last4
        brand
        currency
        exp_month
        exp_year
        cardholder {
          id
          name
          email
          phone_number
          individual {
            first_name
            last_name
            dob {
              day
              month
              year
            }
            verification {
              document {
                back
                front
              }
            }
          }
          requirements {
            disabled_reason
            past_due
          }
          billing {
            address {
              city
              country
              line1
              line2
              postal_code
              state
            }
          }
        }
      }
    }
  }
`

export const ISSUED_CARDS_QUERY = gql`
  query IssuedCards($where: IssuedCardWhereInput, $orderBy: IssuedCardOrderByInput, $skip: Int, $first: Int) {
    issuedCardsConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          createdAt
          name
          description
          issuedCardCode
          type
          status
          last4
          user {
            id
            firstName
            lastName
          }
          companie {
            id
            name
          }
          stripe_issuedCard_id
          issuedCardStripe {
            id
            object
            last4
            status
            brand
            currency
            exp_month
            exp_year
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`
