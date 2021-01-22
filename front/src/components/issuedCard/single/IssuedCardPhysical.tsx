import React from 'react'
import { flowRight as compose } from 'lodash'
import utils from '../../utils'
import { withContext } from '../../withContext'
import { IssuedCard } from '../IssuedCard.type'
import { withRouter } from 'react-router'
import UpdateStatusIssuedCard from '../action/UpdateStatusIssuedCard'
import Paper from '@material-ui/core/Paper'
import DateComponent from '../../nav/DateComponent'

type State = {}

type Props = {
  issuedCard: IssuedCard
}

class IssuedCardPhysical extends React.Component<Props, State> {
  render() {
    if (this.props.issuedCard.status !== 'inactive') {
      return null
    }

    if (!this.props.issuedCard.issuedCardStripe.shipping) {
      return null
    }

    const { shipping } = this.props.issuedCard.issuedCardStripe
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>NachoCard Shipping Status</h3>

            <div>Carrier: {shipping.carrier}</div>
            <div>
              ETA: <DateComponent date={new Date(shipping.eta * 1000)} />
            </div>

            <div>Status: {shipping.status}</div>
            <div>
              Shipped To:
              <br />
              {shipping.name}
              <br />
              {shipping.address.line1} {shipping.address.line2}
              <br />
              {shipping.address.city}, {utils.getLabelState(shipping.address.country, shipping.address.state)}{' '}
              {shipping.address.postal_code}
              <br />
              {utils.getLabelCountry(shipping.address.country)}
            </div>
            <div className="tac">
              <UpdateStatusIssuedCard
                onClick={() => {}}
                type="Button"
                status={`active`}
                text={'Activate NachoCard'}
                issuedCard={this.props.issuedCard}
              />
            </div>
          </Paper>
        </div>
      </>
    )
  }
}

export default compose(withContext, withRouter)(IssuedCardPhysical)
