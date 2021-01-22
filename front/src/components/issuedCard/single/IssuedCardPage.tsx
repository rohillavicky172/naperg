import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import gql from 'graphql-tag'
import { useParams } from 'react-router'
import IssuedCardDetails from './IssuedCardDetails'
import { ParamTypes } from '../../ParamTypes.type'

export const QUERY = gql`
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
        number
        cvc
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

const IssuedCardPage = () => {
  const { issuedCardId }: ParamTypes = useParams<ParamTypes>()
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: issuedCardId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.issuedCard) return <NotFound />

  return <IssuedCardDetails issuedCard={data.issuedCard} />
}

export default IssuedCardPage
