import React from 'react'
import { AppContext } from '../../AppContext'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import { Context } from '../../Context.type'
import { IssuedCard } from '../IssuedCard.type'
import WarningAction from '../../subscription/single/action/WarningAction'
import queryString from 'query-string'

type Props = {
  issuedCard: IssuedCard
}

const IssuedCardWarnings = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const isNewCard = parsed.isNewCard === 'true'
  return (
    <>
      {props.issuedCard.isRequested &&
        props.issuedCard.statusRequested === 'PENDING' &&
        props.issuedCard.createdBy &&
        props.issuedCard.createdBy.id === context.me.id && (
          <div className="paperOut">
            <Paper className="">
              <WarningAction
                iconText={'warning'}
                actionText={''}
                onCancel={() => {}}
                onClick={() => {}}
                message="Your NachoCard will become usable after it has been approved by an Admin"
                shwowActionButton={false}
                shwowCancelButton={false}
              />
            </Paper>
          </div>
        )}
      {props.issuedCard.issuedCardStripe.cardholder &&
        !isNewCard &&
        props.issuedCard.issuedCardStripe.cardholder.requirements &&
        props.issuedCard.issuedCardStripe.cardholder.requirements.disabled_reason && (
          <div className="paperOut">
            <Paper className="">
              <WarningAction
                iconText={'warning'}
                onCancel={() => {}}
                onClick={() => {}}
                actionText={''}
                message={
                  props.issuedCard.issuedCardStripe.cardholder.requirements.disabled_reason === 'under_review'
                    ? `Card is under review.`
                    : `NachoNacho has a regulatory requirement to conduct ongoing monitoring and due diligence of users on our platform. You have been flagged as an unverified cardholder, and your card has been temporarily disabled until we can obtain the necessary documentation to verify your identity.
                    Please edit the NachoCard Details section below and add the empty fields.`
                }
                shwowActionButton={false}
                shwowCancelButton={false}
              />
            </Paper>
          </div>
        )}
    </>
  )
}

export default IssuedCardWarnings
