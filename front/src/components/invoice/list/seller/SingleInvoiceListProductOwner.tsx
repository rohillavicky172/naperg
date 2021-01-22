import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Invoice } from '../../Invoice.type'
import DateComponent from '../../../nav/DateComponent'

import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { Link } from 'react-router-dom'
import utils from '../../../utils'

type Props = {
  invoice: Invoice
}

const SingleInvoiceListProductOwner = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  return (
    <div className="paperOut">
      <Paper className="paperIn bgHover">
        <Grid container>
          <Grid item xs={12} sm={2} className="marginAuto">
            {props.invoice.subscription && (
              <>
                <div>Payment method:</div>
                <div>Visa x{props.invoice.subscription.issuedCard.last4}</div>
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            <div>Payment date:</div>
            <DateComponent date={props.invoice.dateInvoice} />
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            <div>{utils.mappingTypeInvoice(props.invoice.type)}</div>
            <div>{utils.mappingStatusInvoice(props.invoice.status)}</div>
          </Grid>

          <Grid item xs={12} sm={2} className="marginAuto">
            <div>Amount: {utils.priceFormated(-1 * props.invoice.productCostLocal, props.invoice.currency)}</div>
            {props.invoice.currency !== 'usd' && (
              <div>
                {`Amount in US$:`} {utils.priceFormated(-1 * props.invoice.productCost, 'usd')}
              </div>
            )}
            <div>Revshare: {utils.priceFormated(-1 * props.invoice.revshare, 'usd')}</div>
          </Grid>
          <Grid item xs={12} sm={4} className="marginAuto">
            {props.invoice.user && (
              <>
                <div>
                  {props.invoice.user.firstName} {props.invoice.user.lastName}
                </div>
                <div>({props.invoice.user.email})</div>
                <div> {props.invoice.companie.name}</div>
              </>
            )}
          </Grid>
        </Grid>
        {context.me.role === 'ADMIN' && (
          <div className="paperOut">
            <Paper className="paperIn">
              <Grid container>
                <Grid item xs={12} sm={2} className="marginAuto">
                  <h3>Admin</h3>
                </Grid>
                <Grid item xs={12} sm={8} className="marginAuto">
                  <div>Cashback: {utils.priceFormated(props.invoice.cashback, 'usd')}</div>
                  <div>Revshare: {utils.priceFormated(props.invoice.revshare, 'usd')}</div>
                </Grid>
                <Grid item xs={12} sm={2} className="marginAuto">
                  <Link className="link" to={'/invoice/' + props.invoice.id}>
                    Invoice
                  </Link>
                </Grid>
                <Grid item xs={12} sm={2} className="marginAuto">
                  {props.invoice.subscription && props.invoice.product && (
                    <div>
                      <Link
                        className="link"
                        to={`/seller/subscriptionsProduct/${props.invoice.product.id}?subscriptionId=${props.invoice.subscription.id}`}>
                        Subscription
                      </Link>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </div>
        )}
      </Paper>
    </div>
  )
}

export default SingleInvoiceListProductOwner
