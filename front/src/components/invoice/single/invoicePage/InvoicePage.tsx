import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
import gql from 'graphql-tag'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import InvoiceDetailsRevenueShare from './details/InvoiceDetailsRevenueShare'
import InvoiceDetails from './details/InvoiceDetails'

export const INVOICE_QUERY = gql`
  query invoiceQuery($where: InvoiceWhereUniqueInput!) {
    invoice(where: $where) {
      id
      smallId
      dateInvoice
      typePayment
      currency
      snapshotValueBalance

      type
      period
      productCostLocal
      productCostLocalInitial
      productCost
      productCostInitial
      processingFees
      revshare
      # availableAmountToRefund
      crossBorderFee
      foreignExchangeFee
      incomingPaymentFee
      # totalProductCost
      cashback
      cashbackStatus
      # buyerDiscount
      buyerFinalPrice
      customSourceLabel
      customSourceLabelPrivate
      status
      statusIssuing
      description
      descriptionError
      authorization_stripe_id
      product {
        id
        name
        nameFile
        urlName
        showMarketplace
      }
      ruleMerchantData {
        id
      }
      product {
        id
        name
        nameFile
        urlName
      }

      invoiceParent {
        id
        smallId
        productCostLocal
        buyerFinalPrice
        currency
        status
      }
      invoiceChilds {
        id
        smallId
        productCostLocal
        buyerFinalPrice
        currency
        status
      }
      companie {
        id
        name
        isPersonal
        userRoleCompanies {
          id
          companieRole
          user {
            id
            firstName
            lastName
          }
        }
      }
      authorizationStripe {
        id
        approved
        wallet
        created
        status
        authorization_method
        transactions {
          id
          currency
          amount
          type
        }
        card {
          object
          id
          exp_month
          brand
          exp_year
          last4
        }
      }
      charges {
        id
        stripeChargeId
        chargeData {
          id
          object
          status
          paid
          captured
          amount
          amount_refunded
          created
          currency
          customer
          source {
            id
            object
            cvc_check
            last4
            funding
            brand
            exp_month
            bank_name
            exp_year
            metadata {
              nickname
            }
          }
        }
      }
      user {
        id
        firstName
        lastName
      }

      subscription {
        id
        issuedCard {
          id
          name
          last4
        }

        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`

const InvoicePage = () => {
  const { invoiceId }: ParamTypes = useParams<ParamTypes>()

  const { loading, error, data } = useQuery(INVOICE_QUERY, {
    variables: {
      where: {
        id: invoiceId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.invoice) return <NotFound />

  if (data.invoice.type === 'SELLER_REVSHARE') return <InvoiceDetailsRevenueShare invoice={data.invoice} />
  return <InvoiceDetails invoice={data.invoice} />
}

export default InvoicePage
