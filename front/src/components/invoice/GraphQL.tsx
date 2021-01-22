import gql from 'graphql-tag'

export const CREATE_INVOICE = gql`
  mutation CreateInvoiceMutation($data: InvoiceCreateInput!) {
    createInvoice(data: $data) {
      id
    }
  }
`

export const INVOICES_QUERY = gql`
  query InvoicesQueryConnection($where: InvoiceWhereInput, $skip: Int, $orderBy: InvoiceOrderByInput, $first: Int) {
    invoicesConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          type
          typePayment
          dateInvoice
          smallId
          currency
          cashback

          product {
            id
            name
            nameFile
          }
          cashbackStatus
          statusIssuing
          productCostLocal
          productCostLocalInitial
          buyerFinalPrice
          status

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
          charges {
            id
          }
          user {
            id
            email
            firstName
            lastName
          }

          subscription {
            id
            issuedCard {
              id
              name
              last4
              status
            }
            # product {
            #   id
            #   name
            #   nameFile
            # }
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`
export const INVOICES_SUM_QUERY = gql`
  query InvoicesSum($where: InvoiceWhereInput) {
    invoicesSum(where: $where) {
      sumBuyerFinalPrice
    }
  }
`

export const BALANCE_SUM = gql`
  query BalanceSum($companieId: String, $type: String!, $dateSnapshot: DateTime) {
    balanceSum(companieId: $companieId, type: $type, dateSnapshot: $dateSnapshot)
  }
`
export const INVOICES_SUM_PER_MONTH_QUERY = gql`
  query InvoicesSumPerMonth($where: InvoiceWhereInput!, $side: Side!, $includesRefund: Boolean!) {
    invoicesSumPerMonth(where: $where, side: $side, includesRefund: $includesRefund) {
      yearDateInvoice
      monthDateInvoice

      amount
    }
  }
`

export const INVOICES_SUM_PER_MONTH_PER_PRODUCTS_QUERY = gql`
  query InvoicesSumPerMonthPerProducts($where: InvoiceWhereInput!, $orderBy: OrderByInvoicesSumPerMonthPerProducts!) {
    invoicesSumPerMonthPerProducts(where: $where, orderBy: $orderBy) {
      id
      name
      amount
      countInvoices
      countSubscriptions
      countCompanies
    }
  }
`

export const INVOICES_SUM_DAILY_QUERY = gql`
  query InvoicesSumDaily($where: InvoiceWhereInput!, $side: Side!, $includesRefund: Boolean!) {
    invoicesSumDaily(where: $where, side: $side, includesRefund: $includesRefund) {
      name
      amount
    }
  }
`
export const INVOICES_SUM_MONTHLY_QUERY = gql`
  query InvoicesSumMonthly($where: InvoiceWhereInput!, $side: Side!, $includesRefund: Boolean!) {
    invoicesSumMonthly(where: $where, side: $side, includesRefund: $includesRefund) {
      name
      amount
    }
  }
`
export const INVOICES_SUM_PER_MONTH_PER_COMPANIES_QUERY = gql`
  query InvoicesSumPerMonthPerCompanies($where: InvoiceWhereInput!, $side: Side!) {
    invoicesSumPerMonthPerCompanies(where: $where, side: $side) {
      id
      name
      dimension2
      amount
    }
  }
`

export const PAY_INVOICE_MUTATION = gql`
  mutation PayInvoice($where: InvoiceWhereUniqueInput!) {
    payInvoice(where: $where) {
      id
    }
  }
`

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
      productCostLocal
      productCostLocalInitial
      productCost
      productCostInitial
      processingFees
      revshare
      # availableAmountToRefund
      period
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

export const COMPUTE_INVOICES_PROMOTION_MUTATION = gql`
  mutation ComputeInvoicesPromotion($where: InvoiceWhereInput, $orderBy: InvoiceOrderByInput, $skip: Int, $first: Int) {
    computeInvoicesPromotion(where: $where, orderBy: $orderBy, skip: $skip, first: $first)
  }
`
export const DELETE_INVOICE = gql`
  mutation DeleteInvoice($where: InvoiceWhereUniqueInput!) {
    deleteInvoice(where: $where) {
      id
    }
  }
`
export const SEND_EMAIL_INVOICE = gql`
  mutation SendEmailInvoice($where: InvoiceWhereUniqueInput!) {
    sendEmailInvoice(where: $where) {
      id
    }
  }
`

export const UPDATE_INVOICE = gql`
  mutation UpdateInvoiceMutation($data: InvoiceUpdateInput!, $where: InvoiceWhereUniqueInput!) {
    updateInvoice(data: $data, where: $where) {
      id
      smallId
      dateInvoice
      typePayment
      currency
      period
      snapshotValueBalance
      type
      productCostLocal
      productCostLocalInitial
      productCost
      productCostInitial
      processingFees
      availableAmountToRefund
      crossBorderFee
      foreignExchangeFee
      incomingPaymentFee
      revshare
      # totalProductCost
      cashback
      cashbackStatus
      buyerDiscount
      buyerFinalPrice
      customSourceLabel
      customSourceLabelPrivate
      status
      statusIssuing
      description
      descriptionError
      authorization_stripe_id
    }
  }
`
