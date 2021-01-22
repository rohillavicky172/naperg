import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from './../../../withContext'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Context } from '../../../Context.type'
import { Subscription } from '../../Subscription.type'
import { Link } from 'react-router-dom'
import IssuedCardDesignSmall from '../../../issuedCard/single/IssuedCardDesignSmall'
import DateComponent from '../../../nav/DateComponent'
import { Companie } from '../../../companie/Companie.type'
// import ActionSubscription from './ActionSubscription'
import '../Style.css'
import Tooltip from '@material-ui/core/Tooltip'
import utils from '../../../utils'

type State = {
  mode: string
}

type Props = {
  companie: Companie
  subscription: Subscription
  context: Context
}

class SingleSubscriptionListLightProduct extends React.Component<Props, State> {
  state = {
    mode: '',
  }
  render() {
    const isMySubscription = this.props.context.me.id === this.props.subscription.user.id
    return (
      <Grid container>
        <Grid item xs={12} sm={2} className="">
          <div className="imageSubcription">
            <ImageTemplate format={'small'} nameFile={this.props.subscription.product.nameFile} />
          </div>
        </Grid>
        <Grid item xs={12} sm={3} className="marginAuto">
          <Link className="link" to={`/subscription/${this.props.subscription.id}`}>
            {utils.getSubscriptionName(
              this.props.subscription.product.name,
              this.props.subscription.issuedCard.last4.toString(),
              this.props.subscription.user.firstName,
              this.props.subscription.user.lastName
            )}
          </Link>
        </Grid>

        <Grid item xs={12} sm={3} className="marginAuto">
          <div>
            Created: <DateComponent date={this.props.subscription.createdAt} />
          </div>
          <div>
            Last payment: <DateComponent date={this.props.subscription.lastInvoiceDate} />
          </div>
        </Grid>
        {!this.props.companie.isPersonal && (
          <Grid item xs={12} sm={2} className="marginAuto">
            <Link className="link" to={'/user/' + this.props.subscription.user.id}>
              {this.props.subscription.user.firstName} {this.props.subscription.user.lastName}
            </Link>
          </Grid>
        )}
        <Grid item xs={12} sm={2} className="marginAuto">
          {this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') || isMySubscription ? (
            <Tooltip title={this.props.subscription.issuedCard.name}>
              <Link className="link" to={'/issuedCard/' + this.props.subscription.issuedCard.id}>
                <IssuedCardDesignSmall issuedCard={this.props.subscription.issuedCard} />
              </Link>
            </Tooltip>
          ) : (
            <>
              <Tooltip title={this.props.subscription.issuedCard.name}>
                <IssuedCardDesignSmall issuedCard={this.props.subscription.issuedCard} />
              </Tooltip>
            </>
          )}
        </Grid>
      </Grid>
    )
  }
}

export default compose(withApollo, withContext)(SingleSubscriptionListLightProduct)
