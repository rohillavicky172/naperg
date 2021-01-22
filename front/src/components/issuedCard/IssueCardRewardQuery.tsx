import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import Error from '../nav/error/Error'
import Loading from '../nav/error/Loading'
import NotFound from '../nav/error/NotFound'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import IssuedCardDesign from './single/design/IssuedCardDesign'
import IssuedCardAddressReward from './single/IssuedCardAddress'

type Props = {
  issuedCardId: string
}

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
      # cardholder {
      #   id
      # }
      # invoice {
      #   id
      #   smallId
      # }
      # authDevice {
      #   id
      #   friendlyDeviceType
      #   friendlyOsName
      #   friendlyDeviceModel
      #   city
      #   timeZone
      #   lastLogin
      # }

      # initProduct {
      #   id
      #   name
      #   nameFile
      #   sellerLink
      # }

      # user {
      #   id
      #   firstName
      #   lastName
      #   phoneCode
      #   phone
      # }
      # createdBy {
      #   id
      #   firstName
      #   lastName
      # }
      # approvedBy {
      #   id
      #   firstName
      #   lastName
      # }
      companie {
        id
        name

        # isTrustedPayment
        isPersonal
      }
      # stripe_issuedCard_id

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
          # requirements {
          #   disabled_reason
          #   past_due
          # }
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

const ManageRewardIssueCard = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: props.issuedCardId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.issuedCard) return <NotFound />

  const issuedCard = data.issuedCard
  return (
    <>
      <IssuedCardDesign showCopyToClipboard={true} issuedCard={issuedCard} />
      <div className="paperOut">
        <Paper className="paperIn">
          <IssuedCardAddressReward issuedCard={issuedCard} isStripeDisabled={true} />
          <div style={{ height: '10px' }} />
          <Link to={'/issuedCard/' + issuedCard.id}>
            <Button color="primary" variant="outlined">
              Configure your RewardsCard
            </Button>
          </Link>
        </Paper>
      </div>
    </>
  )
}
// }

export default ManageRewardIssueCard
