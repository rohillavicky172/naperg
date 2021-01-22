import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Invoice } from '../../../Invoice.type'
import { AppContext } from '../../../../AppContext'
import { Context } from '../../../../Context.type'
import Grid from '@material-ui/core/Grid'
import MerchantDatas from '../../../../merchantData/MerchantDatas'
import Icon from '@material-ui/core/Icon'
import utils from '../../../../utils'
import InvoiceDetailsAdmin from './InvoiceDetailsAdmin'
import { Link } from 'react-router-dom'
import UseWindowDimensions from '../../../../UseWindowDimensions'
// import CreateCharge from '../../../../charge/CreateCharge'
// import UpdateParent from '../../action/UpdateParent'
// import UpdateUserInvoice from '../../action/UpdateUserInvoice'
// import AddstripeChargeId from '../../action/AddstripeChargeId'
// import UpdateProductInvoice from '../../action/UpdateProductInvoice'

type Props = {
  invoice: Invoice
}

const InvoiceDetailsRevenueShare = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Icon className="textSize20" color="primary">
                monetization_on
              </Icon>
              <h2>Revenue Share</h2>

              {/* {props.invoice.product && (
                <>
                  <Link to={'/productActivity/' + props.invoice.product.id}>
                    <img
                      itemProp="image"
                      src={utils.getUrlFileMedia(props.invoice.product.nameFile)}
                      alt="img"
                      style={{ maxWidth: '90px' }}
                    />
                    <div style={{ height: '10px' }} />
                    <span className="link textSize11">{props.invoice.product.name}</span>
                  </Link>
                </>
              )} */}
            </Grid>
          </Grid>

          {/* {props.invoice.type === 'TOP_UP' && <ImageTemplate format="small" nameFile={'icon/topup.png'} />}
          {props.invoice.type === 'AUTO_TOP_UP' && <ImageTemplate format="small" nameFile={'icon/autoTopup.png'} />}
          {props.invoice.type === 'REFUND_CASH_OUT' && <ImageTemplate format="small" nameFile={'icon/refund.png'} />}
          {props.invoice.type === 'PLATFORM_FEES' && <ImageTemplate format="small" nameFile={'icon/platformFees.png'} />}
          {props.invoice.type === 'PHYSICAL_CARD_FEES' && (
            <ImageTemplate format="small" nameFile={'icon/physicalCardPlatformFee.png'} />
          )}

          <div style={{ height: '20px' }} /> */}

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Invoice ID:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {utils.smallIdFormat(props.invoice.smallId)}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Type:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {utils.mappingTypeInvoice(props.invoice.type)}
            </Grid>
          </Grid>

          {props.invoice.product && (
            <Grid container>
              <Grid item xs={12} md={3} className="bold">
                {`Product:`}
              </Grid>

              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                <Link className="link" to={`/product/${props.invoice.product.id}`}>
                  {props.invoice.product.name}
                </Link>
              </Grid>
            </Grid>
          )}

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Company`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.invoice.companie.name}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Payment for:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.invoice.period && (
                <>
                  {props.invoice.period.substring(4, 6)}/{props.invoice.period.substring(0, 4)}
                </>
              )}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Amount:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              <div>{utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Processing Fee:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              <div>{utils.priceFormated(0, props.invoice.currency)}</div>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Total Amount:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              <div>{utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}</div>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Status:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {utils.mappingStatusInvoice(props.invoice.status)}
            </Grid>
          </Grid>

          {/* {props.invoice.snapshotValueBalance > 0 && (
                  <> */}
          {((props.invoice.typePayment === 'BALANCE' && props.invoice.type === 'VIRTUAL_CARD') ||
            (props.invoice.typePayment === 'BALANCE' && props.invoice.type === 'REFUND') ||
            (props.invoice.typePayment === 'PAYMENT_SOURCE' && props.invoice.type === 'AUTO_TOP_UP') ||
            (props.invoice.typePayment === 'PAYMENT_SOURCE' && props.invoice.type === 'REFUND_CASH_OUT') ||
            (props.invoice.typePayment === 'PAYMENT_SOURCE' && props.invoice.type === 'TOP_UP')) && (
            <Grid container>
              <Grid item xs={12} md={3} className="bold">
                {`Balance:`}
              </Grid>

              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {utils.priceFormated(props.invoice.snapshotValueBalance, 'usd')}
              </Grid>
            </Grid>
          )}

          {props.invoice.invoiceChilds.length > 0 && (
            <Grid container>
              <Grid item xs={12} md={3} className="bold">
                {`Sub-transaction(s):`}
              </Grid>

              <Grid item xs={12} md={9}>
                {props.invoice.invoiceChilds.map((invoice) => (
                  <div key={invoice.id}>
                    <Link className="link" to={'/invoice/' + invoice.id}>
                      {utils.smallIdFormat(invoice.smallId)}
                    </Link>{' '}
                    ({utils.priceFormated(invoice.productCostLocal, invoice.currency)}:{' '}
                    {utils.mappingStatusInvoice(invoice.status)})
                  </div>
                ))}
              </Grid>
            </Grid>
          )}
          {props.invoice.invoiceParent && (
            <Grid container>
              <Grid item xs={12} md={3} className="bold">
                {`Original transaction:`}
              </Grid>

              <Grid item xs={12} md={9}>
                <Link className="link" to={'/invoice/' + (props.invoice.invoiceParent ? props.invoice.invoiceParent.id : '')}>
                  {utils.smallIdFormat(props.invoice.invoiceParent.smallId)}
                </Link>{' '}
                (
                {props.invoice.invoiceParent &&
                  utils.priceFormated(props.invoice.invoiceParent.productCostLocal, props.invoice.invoiceParent.currency)}
                : {props.invoice.invoiceParent && utils.mappingStatusInvoice(props.invoice.invoiceParent.status)})
              </Grid>
            </Grid>
          )}
          {props.invoice.cashback > 0 && (
            <>
              <Grid container className="reward">
                <Grid item xs={12} md={3} className="bold">
                  {`Cashback Amount:`}
                </Grid>

                <Grid item xs={12} md={9}>
                  {utils.priceFormated(props.invoice.cashback, props.invoice.currency)}
                </Grid>
              </Grid>

              <Grid container className="reward">
                <Grid item xs={12} md={3} className="bold">
                  {`Cashback Status:`}
                </Grid>

                <Grid item xs={12} md={9}>
                  {utils.mappingCashbackStatus(props.invoice.cashbackStatus)}
                </Grid>
              </Grid>
            </>
          )}

          {props.invoice.subscription && props.invoice.product && (
            <>
              <Grid container>
                <Grid item xs={12} md={3} className="bold">
                  {`Subscription:`}
                </Grid>

                <Grid item xs={12} md={9}>
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  <Link className="link" to={`/subscription/${props.invoice.subscription.id}`}>
                    {utils.getSubscriptionName(
                      props.invoice.product.name,
                      props.invoice.subscription.issuedCard.last4.toString(),
                      props.invoice.subscription.user.firstName,
                      props.invoice.subscription.user.lastName
                    )}
                  </Link>
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </div>

      {context.me.role === 'ADMIN' && <InvoiceDetailsAdmin invoice={props.invoice} />}

      {context.me.role === 'ADMIN' && props.invoice.subscription && (
        <>
          {props.invoice.product && (
            <MerchantDatas
              product={props.invoice.product}
              variables={{
                where: {
                  invoices_some: {
                    id: props.invoice.id,
                  },
                },
                testMode: context.testMode,
              }}
            />
          )}
        </>
      )}
    </>
  )
}

export default InvoiceDetailsRevenueShare
