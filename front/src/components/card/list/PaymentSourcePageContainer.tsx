import React from 'react'
import Sources from '../list/Sources'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { useParams } from 'react-router'
import { ParamTypes } from '../../ParamTypes.type'

export const QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      name
      maxTransactionValue
      limitPerTransactionForCardSource
      website
      isPersonal
      valueSpent

      isTrustedPayment
      dateSubmissionOwnerOfCompanieVerification

      hideAddBank
      addStripeBank
      addPaypal
      deletedLogically
      hideDebitCredit
      hideCashOut
      disableCrossBorderFee
      disableForeignExchangeFee
      stripe_cus_id
      stripe_cus_test_id
      userStripe {
        id
        default_source
        currency
        email
        sources {
          object
          data {
            id
            object
            account_holder_name
            account_holder_type
            bank_name
            exp_month
            exp_year
            last4
            metadata {
              nickname
            }
            brand
            country
            funding
            status
            receiver {
              address
              amount_received
              amount_charged
              amount_returned
              refund_attributes_status
              refund_attributes_method
            }

            ach_credit_transfer {
              account_number
              routing_number
              fingerprint
              bank_name
              swift_code
            }
          }
        }
      }
    }
  }
`
const PaymentSourcePage = () => {
  const { companieId }: ParamTypes = useParams<ParamTypes>()

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />

  return (
    <div>
      <Sources companie={data.companie} />
    </div>
  )
}

export default PaymentSourcePage
