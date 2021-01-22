import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { Invoice } from '../../../Invoice.type'
import utils from '../../../../utils'
import gql from 'graphql-tag'
import Error from '../../../../nav/error/Error'
import NotFound from '../../../../nav/error/NotFound'
import Loading from '../../../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import DateComponent from '../../../../nav/DateComponent'
import DeleteInvoice from '../../action/DeleteInvoice'
import SendEmailInvoice from '../../action/SendEmailInvoice'
import { Link } from 'react-router-dom'
import ComputeInvoicePromotion from '../../action/promotion/ComputeInvoicePromotion'
import ComputeInvoicePromotionAndUpdateBalance from '../../action/promotion/ComputeInvoicePromotionAndUpdateBalance'
import ManageFile from '../../../../file/ManageFile'
import CreateCharge from '../../../../charge/CreateCharge'
import AddstripeChargeId from '../../action/AddstripeChargeId'
import UpdateParent from '../../action/UpdateParent'
import UpdateProductInvoice from '../../action/UpdateProductInvoice'
import UpdateSubscriptionInvoice from '../../action/UpdateSubscriptionInvoice'
import UpdateUserInvoice from '../../action/UpdateUserInvoice'

type Props = {
  invoice: Invoice
}

export const INVOICE_QUERY = gql`
  query invoiceQuery($where: InvoiceWhereUniqueInput!) {
    invoice(where: $where) {
      id
      smallId
      dateInvoice
      typePayment
      period
      currency
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
      # totalProductCost
      revshare
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
      promoCode {
        id
      }
      product {
        id
        name
        nameFile
        urlName
      }
      ruleMerchantData {
        id
      }
      issuedCard {
        id
        name
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

const InvoiceDetailsAdmin = (props: Props) => {
  const { loading, error, data } = useQuery(INVOICE_QUERY, {
    variables: {
      where: {
        id: props.invoice.id,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.invoice) return <NotFound />

  const invoice: Invoice = data.invoice
  return (
    <>
      <CreateCharge invoiceId={props.invoice.id} />
      <AddstripeChargeId invoice={props.invoice} />
      <UpdateParent invoice={props.invoice} />
      <UpdateUserInvoice invoice={props.invoice} />
      <UpdateProductInvoice invoice={props.invoice} />
      <UpdateSubscriptionInvoice invoice={props.invoice} />
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Admin`}</h3>

          <div>
            {`id:`} {invoice.id}
          </div>
          <div>
            {`authorization_stripe_id:`} {invoice.authorization_stripe_id}
          </div>
          <div>
            {`type:`} {invoice.type}
          </div>
          <div>
            {`description:`} {invoice.description}
          </div>
          <div>
            {`descriptionError:`} {invoice.descriptionError}
          </div>
          <div>
            {`typePayment:`} {invoice.typePayment}
          </div>
          <div>
            {`status:`} {invoice.status}
          </div>
          <div>
            {`statusIssuing:`} {invoice.statusIssuing}
          </div>
          <div>
            {`period:`} {invoice.period}
          </div>

          <div>
            {`isSmallExpensePaid:`} {invoice.isSmallExpensePaid ? 'true' : 'false'}
          </div>

          <div>
            {`customSourceLabel:`} {invoice.customSourceLabel}
          </div>
          <div>
            {`customSourceLabelPrivate:`} {invoice.customSourceLabelPrivate}
          </div>
          <div>
            {`currency:`} {invoice.currency}
          </div>
          <div>
            {`Physical IssuedCard:`}{' '}
            {invoice.issuedCard && (
              <Link className="link" to={`/user/${invoice.user.id}`}>
                {invoice.issuedCard.name}
              </Link>
            )}
          </div>
          <div>
            {`product:`}{' '}
            {invoice.product && (
              <Link className="link" to={`/product/${invoice.product.id}`}>
                {invoice.product.name}
              </Link>
            )}
          </div>
          <div>
            {`PromoCode:`}{' '}
            {invoice.promoCode && (
              <Link className="link" to={`/admin/promoCodes/?promoCodeId=${invoice.promoCode.id}`}>
                {invoice.promoCode.id}
              </Link>
            )}
          </div>
          <div>
            {`userId:`}{' '}
            {invoice.user && data.invoice.user.id && (
              <Link className="link" to={`/user/${invoice.user.id}`}>
                {invoice.user.id}
              </Link>
            )}
          </div>
          <div>
            {`RuleMerchantData:`}{' '}
            {invoice.ruleMerchantData && data.invoice.ruleMerchantData.id && (
              <Link className="link" to={`/ruleMerchantDatas?ruleMerchantDataId=${invoice.ruleMerchantData.id}`}>
                {invoice.ruleMerchantData.id}
              </Link>
            )}
          </div>
          <div>
            {`companieId:`}{' '}
            {invoice.companie && data.invoice.companie.id && (
              <Link className="link" to={`/company/${invoice.companie.id}`}>
                {invoice.companie.id}
              </Link>
            )}
          </div>

          <div>
            {`snapshotValueBalance:`} {utils.priceFormated(data.invoice.snapshotValueBalance, data.invoice.currency)}
          </div>
          {invoice.authorizationStripe && (
            <>
              <div>
                {`wallet:`} {invoice.authorizationStripe.wallet}
              </div>
              <div>
                {`created authorizationStripe:`}{' '}
                <DateComponent date={new Date(data.invoice.authorizationStripe.created * 1000)} />
              </div>
              <div>
                {`authorization_method:`} {invoice.authorizationStripe.authorization_method}
              </div>
              <div>
                {`description:`} {invoice.description}
              </div>
            </>
          )}

          <div>
            <div>productCost: {utils.priceFormated(data.invoice.productCost, 'usd')}</div>
            <div>productCostInitial: {utils.priceFormated(data.invoice.productCostInitial, 'usd')}</div>
            <div>productCostLocal: {utils.priceFormated(data.invoice.productCostLocal, data.invoice.currency)}</div>
            <div>crossBorderFee: {utils.priceFormated(data.invoice.crossBorderFee, 'usd')}</div>
            <div>foreignExchangeFee: {utils.priceFormated(data.invoice.foreignExchangeFee, 'usd')}</div>
            <div>incomingPaymentFee: {utils.priceFormated(data.invoice.incomingPaymentFee, 'usd')}</div>
            <div>buyerFinalPrice: {utils.priceFormated(data.invoice.buyerFinalPrice, 'usd')}</div>
            <div>productCostLocalInitial: {utils.priceFormated(data.invoice.productCostLocalInitial, data.invoice.currency)}</div>
            <div>availableAmountToRefund: {utils.priceFormated(data.invoice.availableAmountToRefund, data.invoice.currency)}</div>

            <div>
              Subscription:{' '}
              {invoice.subscription && invoice.product && (
                <Link className="link" to={'/subscription/' + data.invoice.subscription.id}>
                  {invoice.product.name}
                </Link>
              )}
            </div>
          </div>

          <div className="paperOut">
            <Paper className="paperIn">
              <h4>Promotions</h4>
              <div>cashback: {utils.priceFormated(data.invoice.cashback, 'usd')}</div>
              <div>revshare: {utils.priceFormated(data.invoice.revshare, 'usd')}</div>
            </Paper>
          </div>
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Actions Admin`}</h3>

          <div className="paperOut">
            <Link className="link" to={'/logs?invoiceId=' + data.invoice.id}>
              <Button color="primary" variant="outlined">
                {`Logs`}
              </Button>
            </Link>
          </div>

          {invoice.product && (
            <div className="paperOut">
              <Link to={'/admin/product/' + data.invoice.product.id}>
                <Button color="primary" variant="outlined">
                  {`Product Admin Page`}
                </Button>
              </Link>
            </div>
          )}
          <div className="paperOut">
            <Link to={'/editInvoice/' + data.invoice.id}>
              <Button color="primary" variant="outlined">
                {`Edit Transaction`}
              </Button>
            </Link>
          </div>

          <div className="paperOut">
            <SendEmailInvoice invoiceId={invoice.id} />
          </div>
          <div className="paperOut">
            <DeleteInvoice invoiceId={invoice.id} />
          </div>
          <div className="paperOut">
            <ComputeInvoicePromotion invoiceId={invoice.id} />
          </div>
          <div className="paperOut">
            <ComputeInvoicePromotionAndUpdateBalance invoiceId={invoice.id} />
          </div>
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h4>{`Attachments Admin`}</h4>
          <div>
            <ManageFile
              invoiceId={invoice.id}
              companieId={invoice.companie.id}
              showDownload={true}
              onCreate={() => {}}
              typeFile={'INVOICE'}
            />
          </div>
        </Paper>
      </div>
    </>
  )
}

export default InvoiceDetailsAdmin
