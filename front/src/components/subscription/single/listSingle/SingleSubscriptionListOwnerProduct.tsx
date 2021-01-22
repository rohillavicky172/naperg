import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Subscription } from '../../Subscription.type'
import DateComponent from '../../../nav/DateComponent'
import CashbackSubscriptionManagements from '../../../subscriptionManagement/list/CashbackSubscriptionManagements'
import RevshareSubscriptionManagements from '../../../subscriptionManagement/list/RevshareSubscriptionManagements'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'

type Props = {
  subscription: Subscription
}
const SingleSubscriptionListOwnerProduct = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  return (
    <Grid container>
      <Grid item xs={12} sm={2} className="marginAuto">
        <div>Payment method:</div>
        <div>Visa x{props.subscription.issuedCard.last4}</div>
      </Grid>
      <Grid item xs={12} sm={4} className="marginAuto">
        <div>
          {props.subscription.user.firstName} {props.subscription.user.lastName}
        </div>
        <div>{props.subscription.user.email}</div>
        <div>({props.subscription.companie.name})</div>
      </Grid>
      <Grid item xs={12} sm={4} className="marginAuto">
        <div>
          Created: <DateComponent date={props.subscription.createdAt} />
        </div>
        <div>
          Last payment: <DateComponent date={props.subscription.lastInvoiceDate} />
        </div>
      </Grid>
      <Grid item xs={12} sm={2} className="marginAuto">
        <Link
          className="link"
          to={`/seller/invoicesProduct/${props.subscription.product.id}/?subscriptionId=${props.subscription.id}`}>
          See Transactions
        </Link>
      </Grid>
      {context.me.role === 'ADMIN' && (
        <Grid item xs={12} sm={8} className="">
          <CashbackSubscriptionManagements subscriptionId={props.subscription.id} />
        </Grid>
      )}
      {(props.subscription.companie.canManageSellerSubscriptionManagement || context.me.role === 'ADMIN') && (
        <Grid item xs={12} sm={8} className="">
          <RevshareSubscriptionManagements subscriptionId={props.subscription.id} />
        </Grid>
      )}

      {context.me.role === 'ADMIN' && (
        <Grid item xs={12} sm={12} className="">
          <Link className="link" to={'/subscription/' + props.subscription.id}>
            Subscription
          </Link>
        </Grid>
      )}
    </Grid>
  )
}

export default SingleSubscriptionListOwnerProduct
