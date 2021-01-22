import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Paper, Icon } from '@material-ui/core/'
import { Invoice } from '../../Invoice.type'
// import DateComponent from '../../../nav/DateComponent'
// import '../Style.css'
// import { AppContext } from '../../../AppContext'
// import { Context } from '../../../Context.type'
import { Link } from 'react-router-dom'
import utils from '../../../utils'
// import IssuedCardDesignSmall from '../../../issuedCard/single/IssuedCardDesignSmall'
// import CashbackLine from './CashbackLine'

type Props = {
  invoice: Invoice
}

// class SingleInvoiceListProductOwner extends React.Component<Props, State> {
const SingleInvoiceListSellerPayment = (props: Props) => {
  // const { context }: { context: Context } = React.useContext(AppContext)

  return (
    <div className="paperOut">
      <Link className="link" to={'/invoice/' + props.invoice.id}>
        <Paper className="paperIn bgHover">
          <Grid container>
            <Grid item xs={12} sm={3} className="marginAuto">
              <Icon color="primary">monetization_on</Icon>
            </Grid>

            {/* <Grid item xs={12} sm={3} className="marginAuto">
              Invoice date <DateComponent  date={props.invoice.dateInvoice} />
            </Grid> */}
            <Grid item xs={12} sm={3} className="marginAuto">
              <div>{`Invoice for:`}</div>
              <div>
                {props.invoice.period && props.invoice.period.substring(4, 6)}/{props.invoice.period.substring(0, 4)}
              </div>
            </Grid>
            <Grid item xs={12} sm={3} className="marginAuto">
              <div>{`Status:`}</div>
              <div>{utils.mappingStatusInvoice(props.invoice.status)}</div>
            </Grid>

            <Grid item xs={12} sm={3} className="marginAuto">
              <div>Total Amount:</div>
              <div>{utils.priceFormated(props.invoice.productCostLocal, props.invoice.currency)}</div>
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
            {/* <Grid item xs={12} sm={4} className="marginAuto">
              {props.invoice.user && (
                <>
                  <div>
                    {props.invoice.user.firstName} {props.invoice.user.lastName}
                  </div>
                  <div>({props.invoice.user.email})</div>
                  <div> {props.invoice.companie.name}</div>
                </>
              )}
            </Grid> */}
          </Grid>
        </Paper>
      </Link>
    </div>
  )
}

export default SingleInvoiceListSellerPayment
