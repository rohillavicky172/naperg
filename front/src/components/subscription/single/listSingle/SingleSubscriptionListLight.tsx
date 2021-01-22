import React from 'react'
import { AppContext } from '../../../AppContext'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Context } from '../../../Context.type'
import { Subscription } from '../../Subscription.type'
import { Link } from 'react-router-dom'
import DateComponent from '../../../nav/DateComponent'
import utils from '../../../utils'
// import { withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { withContext } from './../../../withContext'
// import Button from '@material-ui/core/Button'
// import SellerButtonsActionAdmin from '../action/SellerButtonsActionAdmin'
// import { Link } from 'react-router-dom'
// import CancelSubscriptionAction from '../action/CancelSubscriptionAction'
// import DoNotCancelSubscription from '../action/DoNotCancelSubscription'
// import ActionSubscription from './ActionSubscription'
// import '../Style.css'

type Props = {
  subscription: Subscription
}

const SingleSubscriptionListLight = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const isMySubscription = context.me.id === props.subscription.user.id
  return (
    <Grid container>
      <Grid item xs={12} sm={2} className="">
        <div className="imageSubcription">
          <ImageTemplate format={'small'} nameFile={props.subscription.product.nameFile} />
        </div>
      </Grid>
      <Grid item xs={12} sm={3} className="marginAuto">
        <Link className="link" to={'/subscription/' + props.subscription.id}>
          {utils.getSubscriptionName(
            props.subscription.product.name,
            props.subscription.issuedCard.last4.toString(),
            props.subscription.user.firstName,
            props.subscription.user.lastName
          )}
        </Link>
      </Grid>

      <Grid item xs={12} sm={3} className="marginAuto">
        <div>
          Created: <DateComponent date={props.subscription.createdAt} />
        </div>
        <div>
          Last payment: <DateComponent date={props.subscription.lastInvoiceDate} />
        </div>
      </Grid>

      <Grid item xs={12} sm={2} className="marginAuto">
        <Link className="link" to={'/user/' + props.subscription.user.id}>
          {props.subscription.user.firstName} {props.subscription.user.lastName}
        </Link>
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

      {/* {this.state.mode === 'showUnsubscribeWarning' && (
              <Grid item xs={12} className="">
                <CancelSubscriptionAction subscriptionId={props.subscription.id} onCancel={() => this.setState({ mode: '' })} />
              </Grid>
            )} */}

      {/* {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
              <Grid item xs={12} className="tal">
                <SellerButtonsActionAdmin subscription={props.subscription} />
              </Grid>
            )} */}
      {/* </Grid> */}

      {/* {this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') && ( */}
      {/* <Grid item xs={2} sm={1} className="">
          <ActionSubscription subscription={props.subscription} onSelectMenu={(mode) => this.setState({ mode })} />
        </Grid> */}
    </Grid>
  )
}

export default SingleSubscriptionListLight
