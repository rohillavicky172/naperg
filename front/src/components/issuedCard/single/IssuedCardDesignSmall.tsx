
import React from 'react'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import '../Style.css'
import { IssuedCard } from '../IssuedCard.type'
// import utils from '../../utils'
// import Grid from '@material-ui/core/Grid'
// import CopyToClipboard from './CopyToClipboard'

type State = {}

type Props = {
  context: Context,
  issuedCard: IssuedCard
}

class IssuedCardDesignSmall extends React.Component<Props, State> {
  render() {
    let classNameIssuedCard = 'issuedCardContainerSmall'

    if (this.props.issuedCard.status === 'active') {
      classNameIssuedCard = 'issuedCardContainerSmall bgPrimary'
    }
    if (this.props.issuedCard.status === 'canceled') {
      classNameIssuedCard = 'issuedCardContainerSmall bgGrey3'
    }
    if (this.props.issuedCard.status === 'inactive') {
      classNameIssuedCard = 'issuedCardContainerSmall bgSecondary'
    }

    let classNameType = ''
    if (this.props.issuedCard.type === 'physical') {
      classNameType = 'issuedCardPhysical'
    }
    return (
      <div className={`${classNameIssuedCard} ${classNameType}`}>
        <div className="tal">*{this.props.issuedCard.last4}</div>
        <div className="tar">
          <img src="/nachocard/visa_white.png" alt="Visa" className="issuedCardImageVisaSmall" />
        </div>
      </div>
    )
  }
}

export default withContext(IssuedCardDesignSmall)
