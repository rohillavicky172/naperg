import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from './../../../withContext'
import Grid from '@material-ui/core/Grid'
import StatusBox from '../../../issuedCard/single/StatusBox'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Context } from '../../../Context.type'
import { Subscription } from '../../Subscription.type'
import { Link } from 'react-router-dom'
import utils from '../../../utils'
import DateComponent from '../../../nav/DateComponent'
import ActionSubscription from './ActionSubscription'
import '../Style.css'

type State = {
  mode: string
}

type Props = {
  subscription: Subscription
  context: Context
}

class SingleSubscriptionList extends React.Component<Props, State> {
  state = {
    mode: '',
  }
  render() {
    const isMySubscription = this.props.context.me.id === this.props.subscription.user.id
    return (
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <div className="imageSubcription">
            <Link to={'/subscription/' + this.props.subscription.id}>
              <ImageTemplate format={'small'} nameFile={this.props.subscription.product.nameFile} />
              {this.props.subscription.product.name}
            </Link>
          </div>
        </Grid>

        <Grid item xs={12} sm={4} className="marginAuto">
          <div>
            Created: <DateComponent date={this.props.subscription.createdAt} />
          </div>
          <div>
            Last payment: <DateComponent date={this.props.subscription.lastInvoiceDate} />
            {/* {this.props.subscription.subscriptionInvoices.map(subscriptionInvoice => (
                  <div key={subscriptionInvoice.id}>
                    <DateComponent formatString={''} label="Last payment: " date={subscriptionInvoice.invoice.dateInvoice} />
                  </div>
                ))} */}
          </div>
          {/* {this.props.subscription.status === 'CANCELLED' && (
                <div>
                  <DateComponent formatString={''} label="on " date={this.props.subscription.dateCancellation} />
                </div>
              )} */}
        </Grid>

        <Grid item xs={12} sm={2} className="marginAuto">
          {this.props.subscription.user.firstName} {this.props.subscription.user.lastName}
        </Grid>
        <Grid item xs={12} sm={2} className="marginAuto">
          {this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') || isMySubscription ? (
            <Link className="link" to={'/issuedCard/' + this.props.subscription.issuedCard.id}>
              {`"${this.props.subscription.issuedCard.name}"`}
            </Link>
          ) : (
            <>{`"${this.props.subscription.issuedCard.name}"`}</>
          )}
        </Grid>

        <Grid item xs={2} sm={2} className="">
          <ActionSubscription subscription={this.props.subscription} onSelectMenu={(mode) => this.setState({ mode })} />
        </Grid>
        <Grid item xs={2} sm={2} className="">
          <StatusBox issuedCard={this.props.subscription.issuedCard} />
        </Grid>

        <Grid item xs={2} sm={2} className="">
          Averagre price: {utils.priceFormated(this.props.subscription.averagePrice, 'usd')} per{' '}
          {this.props.subscription.paymentFrequency} based on {this.props.subscription.countAveragePrice} invoices
        </Grid>
        <Grid item xs={2} sm={2} className="">
          {this.props.subscription.paymentFrequency === 'MONTH' && (
            <>Forecast: {utils.priceFormated(this.props.subscription.averagePrice * 12, 'usd')} per year </>
          )}
        </Grid>
      </Grid>
    )
  }
}

export default compose(withApollo, withContext)(SingleSubscriptionList)
