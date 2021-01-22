import React from 'react'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Subscription } from '../../Subscription.type'
import { Link } from 'react-router-dom'
import DateComponent from '../../../nav/DateComponent'
import ActionSubscription from './ActionSubscription'
import '../Style.css'
import CashbackSubscriptionManagements from '../../../subscriptionManagement/list/CashbackSubscriptionManagements'
import RevshareSubscriptionManagements from '../../../subscriptionManagement/list/RevshareSubscriptionManagements'

type Props = {
  subscription: Subscription
}

const SingleSubscriptionListDesktop = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const isMySubscription = context.me.id === props.subscription.user.id
  return (
    <Grid container>
      <Grid item xs={12} sm={2} className="">
        <div className="imageSubcription">
          <Link to={'/subscription/' + props.subscription.id}>
            <ImageTemplate format={'small'} nameFile={props.subscription.product.nameFile} />
          </Link>
        </div>
      </Grid>
      <Grid item xs={12} sm={2} className="marginAuto">
        <div>
          <Link className="link" to={'/product/' + props.subscription.product.id}>
            {props.subscription.product.name}
          </Link>
        </div>
        <div>
          <Link className="link" to={'/logs?subscriptionId=' + props.subscription.id}>
            Logs
          </Link>
        </div>
      </Grid>

      <Grid item xs={12} sm={3} className="marginAuto">
        <div>
          Created <DateComponent date={props.subscription.createdAt} />
        </div>
        <div>
          Last payment: <DateComponent date={props.subscription.lastInvoiceDate} />
        </div>
      </Grid>

      <Grid item xs={12} sm={2} className="marginAuto">
        <div>
          {props.subscription.user.firstName} {props.subscription.user.lastName}
        </div>
        <div>
          (
          <Link className="link" to={`/company/${props.subscription.companie.id}?mode=admin`}>
            {props.subscription.companie.name}
          </Link>
          )
        </div>
      </Grid>
      <Grid item xs={12} sm={2} className="marginAuto">
        {context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') || isMySubscription ? (
          <Link className="link" to={'/issuedCard/' + props.subscription.issuedCard.id}>
            {`"${props.subscription.issuedCard.name}"`}
          </Link>
        ) : (
          <>{`"${props.subscription.issuedCard.name}"`}</>
        )}
      </Grid>
      <Grid item xs={2} sm={1} className="">
        <ActionSubscription subscription={props.subscription} onSelectMenu={() => {}} />
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} className="">
          <CashbackSubscriptionManagements subscriptionId={props.subscription.id} />
        </Grid>
        <Grid item xs={12} sm={6} className="">
          <RevshareSubscriptionManagements subscriptionId={props.subscription.id} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SingleSubscriptionListDesktop
