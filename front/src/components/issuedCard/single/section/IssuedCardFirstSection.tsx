import React from 'react'
import { IssuedCard } from '../../../issuedCard/IssuedCard.type'
import StatusBox from '../StatusBox'
import IssuedCardDialog from '../IssuedCardDialog'
import IssuedCardDesign from '../design/IssuedCardDesign'
import UseWindowDimensions from '../../../UseWindowDimensions'

type Props = {
  issuedCard: IssuedCard
}

const IssuedCardFirstSection = (props: Props) => {
  if (!props.issuedCard.id) {
    return null
  }
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div>
      {isMobile && (
        <div className="">
          <IssuedCardDialog issuedCard={props.issuedCard} />
          <div style={{ height: '10px' }} />
        </div>
      )}
      <StatusBox issuedCard={props.issuedCard} />
      <IssuedCardDesign showCopyToClipboard={true} issuedCard={props.issuedCard} />
    </div>
  )
}

export default IssuedCardFirstSection
