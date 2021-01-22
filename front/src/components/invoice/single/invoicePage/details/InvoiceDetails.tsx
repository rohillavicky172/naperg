import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Invoice } from '../../../Invoice.type'
import { AppContext } from '../../../../AppContext'
import { Context } from '../../../../Context.type'
import Grid from '@material-ui/core/Grid'
import MerchantDatas from '../../../../merchantData/MerchantDatas'
import Icon from '@material-ui/core/Icon'
import utils from '../../../../utils'
import DateComponent from '../../../../nav/DateComponent'
import InvoicePriceLogic from './InvoicePriceLogic'
import PaymentMethodFormatSource from '../../../../card/single/PaymentMethodFormatSource'
import SourcesLightQuery from '../../../../source/list/SourcesLightQuery'
import InvoiceDetailsAdmin from './InvoiceDetailsAdmin'
import WalletProvider from './WalletProvider'
import { Link } from 'react-router-dom'
import SpoofUser from '../../../../user/single/action/spoofUser/SpoofUser'
import UseWindowDimensions from '../../../../UseWindowDimensions'
import RefundCharge from '../../../../charge/RefundCharge'
import DeleteCharge from '../../../../charge/DeleteCharge'
import ImageInvoice from '../../listSingle/ImageInvoice'
import ReviewBanner from '../../../../review/ReviewBanner'

type Props = {
  invoice: Invoice
}

const InvoiceDetails = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} sm={12}>
              <WalletProvider invoice={props.invoice} />
              <h2>{utils.mappingTypeInvoice(props.invoice.type)} </h2>
              {props.invoice.product ? (
                <>
                  <Link to={'/productActivity/' + props.invoice.product.id}>
                    <ImageInvoice format="small" invoice={props.invoice} />
                    <div style={{ height: '10px' }} />
                    <span className="link textSize11">{props.invoice.product.name}</span>
                  </Link>
                  <div style={{ height: '10px' }} />
                </>
              ) : (
                <ImageInvoice format="small" invoice={props.invoice} />
              )}
            </Grid>
          </Grid>

          <div style={{ height: '20px' }} />

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
              {utils.mappingTypeInvoice(props.invoice.type)}{' '}
              {props.invoice.type === 'TOP_UP' && (
                <>
                  ({props.invoice.companie.name}
                  {context.me && context.me.role === 'ADMIN' && (
                    <Link className="link" to={'/company/' + props.invoice.companie.id}>
                      <Icon className="textSize7">link</Icon>
                    </Link>
                  )}
                  )
                </>
              )}
              {props.invoice.type === 'AUTO_TOP_UP' && (
                <>
                  ({props.invoice.companie.name}
                  {context.me && context.me.role === 'ADMIN' && (
                    <Link className="link" to={'/company/' + props.invoice.companie.id}>
                      <Icon className="textSize7">link</Icon>
                    </Link>
                  )}
                  )
                </>
              )}
            </Grid>
          </Grid>

          {/* {props.invoice.type === 'RECURING_PLATFORM_FEES' && (
            <Grid container>
              <Grid item xs={12} md={3} className="bold">
                {`Payment for:`}
              </Grid>

              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {props.invoice.period.substring(4, 6)}/{props.invoice.period.substring(0, 4)}
              </Grid>
            </Grid>
          )} */}

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`User:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {' '}
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.invoice.user ? (
                <>
                  <Link className="link" to={'/user/' + props.invoice.user.id}>
                    {props.invoice.user.firstName} {props.invoice.user.lastName}
                  </Link>
                  {context.me && context.me.role === 'ADMIN' && (
                    <>
                      <SpoofUser user={props.invoice.user} />
                    </>
                  )}{' '}
                  ({props.invoice.companie.name}
                  {context.me && context.me.role === 'ADMIN' && (
                    <>
                      {' '}
                      <Link className="link" to={'/company/' + props.invoice.companie.id}>
                        <Icon className="textSize7">link</Icon>
                      </Link>
                    </>
                  )}
                  )
                </>
              ) : (
                <>
                  {props.invoice.companie.userRoleCompanies
                    .filter((userRoleCompanie) => userRoleCompanie.companieRole === 'OWNER')
                    .map((userRoleCompanie) => (
                      <div key={userRoleCompanie.id}>
                        <Link className="link" to={'/user/' + userRoleCompanie.user.id}>
                          {userRoleCompanie.user.firstName} {userRoleCompanie.user.lastName}
                        </Link>
                        {context.me && context.me.role === 'ADMIN' && (
                          <>
                            <SpoofUser user={userRoleCompanie.user} />
                          </>
                        )}
                        <>{!props.invoice.companie.isPersonal && <> {'(Owner)'}</>}</>
                      </div>
                    ))}
                </>
              )}
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Payment Date:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              <DateComponent date={props.invoice.dateInvoice} />
            </Grid>
          </Grid>
          <InvoicePriceLogic invoice={props.invoice} />

          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {props.invoice.type === 'REFUND' || props.invoice.type === 'REFUND_CASH_OUT' ? (
                <>{`Payment destination:`}</>
              ) : (
                <>{`Payment Source:`}</>
              )}
            </Grid>

            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.invoice.typePayment === 'BALANCE' && <span>{`Your NachoNacho balance`}</span>}
              {(props.invoice.typePayment === 'PAYMENT_SOURCE' ||
                props.invoice.typePayment === 'PAYMENT_SOURCE_SMALL_EXPENSE' ||
                props.invoice.typePayment === 'REWARD' ||
                props.invoice.typePayment === 'WIRE_TRANSFER') && (
                <>
                  {props.invoice.charges.map((charge) => (
                    <span key={charge.id}>
                      {charge.chargeData.source && (
                        <PaymentMethodFormatSource showIcon={true} source={charge.chargeData.source} />
                      )}{' '}
                      ({charge.chargeData.status}){' '}
                      {context.me.role === 'ADMIN' && (
                        <Paper className="paperIn">
                          <h4>ADMIN</h4>
                          <div>Id: {charge.chargeData.id}</div>
                          <div>amount: {utils.priceFormated(charge.chargeData.amount / 100, charge.chargeData.currency)}</div>
                          <div>
                            amount_refunded:{' '}
                            {utils.priceFormated(charge.chargeData.amount_refunded / 100, charge.chargeData.currency)}
                          </div>
                          <div>status: {charge.chargeData.status}</div>
                          <div>captured: {charge.chargeData.captured ? 'TRUE' : 'FALSE'}</div>
                          <div className="paperOut">
                            <Paper className="paperIn">
                              <RefundCharge charge={charge} /> <DeleteCharge charge={charge} />
                            </Paper>
                          </div>
                        </Paper>
                      )}
                    </span>
                  ))}

                  {props.invoice.charges.length === 0 && (
                    <>
                      {props.invoice.customSourceLabel ? (
                        <>{props.invoice.customSourceLabel}</>
                      ) : (
                        <>
                          {props.invoice.type === 'VIRTUAL_CARD' &&
                          props.invoice.statusIssuing === 'pending' &&
                          props.invoice.status === 'PENDING' ? (
                            <>
                              <SourcesLightQuery
                                variables={{
                                  where: {
                                    companie: {
                                      id: props.invoice.companie.id,
                                    },
                                    testMode: context.testMode,
                                    isDefaultSource: true,
                                  },
                                }}
                              />

                              {context.me.role === 'ADMIN' && (
                                <Paper className="paperIn">
                                  <h4>ADMIN</h4>
                                  <p>Waiting for capture</p>
                                </Paper>
                              )}
                            </>
                          ) : (
                            <> {`Not applicable`}</>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          {props.invoice.authorizationStripe && props.invoice.subscription && (
            <Grid container>
              <Grid item xs={12} md={3} className="bold">
                {`NachoCard:`}
              </Grid>

              <Grid item xs={12} md={9}>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                <Link className="link" to={'/issuedCard/' + props.invoice.subscription.issuedCard.id}>
                  <PaymentMethodFormatSource showIcon={false} source={props.invoice.authorizationStripe.card} /> {`("`}
                  {props.invoice.subscription.issuedCard.name}
                  {`")`}
                </Link>{' '}
                {props.invoice.authorizationStripe.approved ? '(Approved)' : '(Declined)'}
                {context.me && context.me.role === 'ADMIN' && (
                  <Paper className="paperIn">
                    <h4>ADMIN</h4>
                    <div>id: {props.invoice.authorizationStripe.id}</div>
                    <div>approved: {props.invoice.authorizationStripe.approved ? 'TRUE' : 'FALSE'}</div>
                    <div>status: {props.invoice.authorizationStripe.status}</div>
                    {props.invoice.authorizationStripe.transactions.map((transaction) => (
                      <div key={transaction.id}>
                        <div>
                          {`Amount:`} {utils.priceFormated(transaction.amount / 100, transaction.currency)} ({transaction.type})
                        </div>
                      </div>
                    ))}
                  </Paper>
                )}
              </Grid>
            </Grid>
          )}
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Status:`}
            </Grid>

            <Grid item xs={12} md={9}>
              {' '}
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {/* <MappingStatusInvoice invoice={props.invoice} /> */}
              {utils.mappingStatusInvoice(props.invoice.status)}
            </Grid>
          </Grid>

          {props.invoice.description && (
            <Grid container>
              <Grid item xs={12} md={3} className="bold">
                {`Description:`}
              </Grid>

              <Grid item xs={12} md={9} className="secondary">
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {props.invoice.description}
              </Grid>
            </Grid>
          )}

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

      {props.invoice.product?.showMarketplace && (
        <div className="paperOut">
          <Paper className="paperIn">
            <ReviewBanner product={props.invoice.product} userId={context.me.id} />
          </Paper>
        </div>
      )}

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

export default InvoiceDetails
