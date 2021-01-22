import React from 'react'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import NotFound from '../../../nav/error/NotFound'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/react-hooks'
import SubsriptionDetail from './SubsriptionDetail'
import { ParamTypes } from '../../../ParamTypes.type'
import gql from 'graphql-tag'

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
        showMarketplace
        name
        urlName
      }
    }
  }
`

const SubscriptionPage = () => {
  const params = useParams<ParamTypes>()
  const { loading, error, data } = useQuery(SUBSCRIPTION_QUERY, {
    variables: {
      where: {
        id: params.subscriptionId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.subscription) return <NotFound />

  return <SubsriptionDetail subscription={data.subscription} />
}

export default SubscriptionPage
