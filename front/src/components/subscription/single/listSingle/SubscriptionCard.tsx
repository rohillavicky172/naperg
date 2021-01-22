import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from './../../../withContext'
import StatusBox from '../../../issuedCard/single/StatusBox'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Context } from '../../../Context.type'
import { Subscription } from '../../Subscription.type'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import '../Style.css'

type State = {}

type Props = {
  subscription: Subscription
  context: Context
}

class SubscriptionCard extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Link to={'/subscription/' + this.props.subscription.id}>
          <Card className="card">
            <ImageTemplate format={'medium'} nameFile={this.props.subscription.product.nameFile} />

            <div className="contentText">
              <h3 className="fontWeight12 textSize11 margin1 tac black">
                <span itemProp="name">{this.props.subscription.product.name}</span>
              </h3>

              {!this.props.subscription.companie.isPersonal && (
                <div className="tac">
                  <p className="textSize7 grey6 margin1">
                    <span itemProp="description">
                      {this.props.subscription.user.firstName} {this.props.subscription.user.lastName}
                    </span>
                  </p>
                </div>
              )}

              <div className="shortDescriptionDiv tac">
                <p className="textSize7 grey6 margin1">
                  <span itemProp="description">
                    {'Visa'} x{this.props.subscription.issuedCard.last4}
                  </span>
                </p>
              </div>
            </div>
          </Card>
          <div className="textSize2">
            <StatusBox issuedCard={this.props.subscription.issuedCard} />
          </div>
        </Link>
      </>
    )
  }
}

export default compose(
  withApollo,
  withContext
)(SubscriptionCard)
