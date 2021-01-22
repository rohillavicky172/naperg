import React from 'react'
import { Source } from '../../source/Source.type'
import Icon from '@material-ui/core/Icon'
// import { IssuedCardStripe } from '../../issuedCard/IssuedCard.type'

type State = {}

type Props = {
  showIcon: boolean
  source: Source
}

class PaymentMethodFormatSource extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.source.object === 'issuing.card' && (
          <span>
            {this.props.source.brand} {this.props.source.funding ? '(' + this.props.source.funding + ') card' : ''}{' '}
            {`ending in ${this.props.source.last4} expiring ${this.props.source.exp_month}/${this.props.source.exp_year}`}
          </span>
        )}
        {this.props.source.object === 'card' && (
          <span>
            {this.props.showIcon && <Icon className="iconAlignText">credit_card</Icon>} {this.props.source.brand}{' '}
            {this.props.source.funding ? '(' + this.props.source.funding + ') card' : ''}{' '}
            {`ending in ${this.props.source.last4} expiring ${this.props.source.exp_month}/${this.props.source.exp_year}`}
          </span>
        )}
        {this.props.source.object === 'bank_account' && (
          <span>
            {this.props.showIcon && <Icon className="iconAlignText">account_balance</Icon>} {this.props.source.bank_name}{' '}
            {`account ending in`} {this.props.source.last4}
          </span>
        )}{' '}
        {/* {`${`"${this.props.source.nickname}"`}`} */}
        {this.props.source.nickname && <>{`"${this.props.source.nickname}"`}</>}
      </>
    )
  }
}

export default PaymentMethodFormatSource
