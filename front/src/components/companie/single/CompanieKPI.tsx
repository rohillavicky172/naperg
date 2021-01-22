import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { Link } from 'react-router-dom'
// import { User } from '../../user/User.type'
// import { Invoice } from '../../invoice/Invoice.type'
// import { IssuedCard } from '../../issuedCard/IssuedCard.type'

type State = {}

type Props = {
  companieId: string
  users: Number
  invoices: Number
  payments: Number
  subscriptions: Number
  issuedCards: Number
}

class CompanieKPI extends React.Component<Props, State> {
  render() {
    // console.log(this.props.payments)
    return (
      <>
        (
        <Tooltip title={this.props.users.toString() + ' Users'}>
          <Link className="link" to={'/team/' + this.props.companieId}>
            {this.props.users}U{' '}
          </Link>
        </Tooltip>
        <Tooltip title={this.props.invoices.toString() + ' Transactions'}>
          <Link className="link" to={'/invoicesCompany/' + this.props.companieId}>
            {this.props.invoices}T{' '}
          </Link>
        </Tooltip>
        <Tooltip title={this.props.issuedCards.toString() + ' NachoCards'}>
          <Link className="link" to={'/issuedCardsCompany/' + this.props.companieId + '?statusIssuedCard=ALL'}>
            {this.props.issuedCards}N{' '}
          </Link>
        </Tooltip>
        {this.props.payments.toString() !== undefined && (
          <Tooltip title={this.props.payments.toString() + ' Payments'}>
            <Link className="link" to={'/paymentSource/' + this.props.companieId}>
              {this.props.payments}P{' '}
            </Link>
          </Tooltip>
        )}
        <Tooltip title={this.props.subscriptions.toString() + ' Subscriptions'}>
          <Link className="link" to={'/subscriptionsCompany/' + this.props.companieId}>
            {this.props.subscriptions}S
          </Link>
        </Tooltip>
        )
      </>
    )
  }
}

export default CompanieKPI
