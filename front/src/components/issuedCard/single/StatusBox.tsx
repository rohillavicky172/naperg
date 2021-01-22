
import React from 'react'
import { IssuedCard } from '../IssuedCard.type'

import '../Style.css'
import utils from '../../utils'

type State = {}

type Props = {
  issuedCard: IssuedCard
}

class StatusBox extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.issuedCard.isRequested && this.props.issuedCard.statusRequested !== 'APPROVED' ? (
          <>
            <span className="issuedCardNumberCanceled bgSecondary">
              {this.props.issuedCard.statusRequested === 'DECLINED' && <>Request Declined</>}
              {this.props.issuedCard.statusRequested === 'PENDING' && <>Request Pending</>}
            </span>
          </>
        ) : (
          <>
            {this.props.issuedCard.status === 'active' && (
              <>
                {(new Date(this.props.issuedCard.dateValidFrom ? this.props.issuedCard.dateValidFrom : 0) >= new Date() ||
                  (new Date(this.props.issuedCard.dateValidTo ? this.props.issuedCard.dateValidTo : 0) < new Date() &&
                    this.props.issuedCard.dateValidTo)) && (
                  <span className="issuedCardNumberCanceled bgSecondary">{'Date restriction'}</span>
                )}
              </>
            )}
            {this.props.issuedCard.status === 'canceled' && (
              <span className="issuedCardNumberCanceled bgGrey3">
                {utils.mappingStatusIssuedCard(this.props.issuedCard.status)}
              </span>
            )}
            {this.props.issuedCard.status === 'inactive' && (
              <span className="issuedCardNumberCanceled bgSecondary">
                {utils.mappingStatusIssuedCard(this.props.issuedCard.status)}
              </span>
            )}
          </>
        )}
      </>
    )
  }
}

export default StatusBox
