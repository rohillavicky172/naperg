import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import { AppContext } from '../../AppContext'
import Icon from '@material-ui/core/Icon'
import HelpNotice from './notice/HelpNotice'
import utils from '../../utils'
import DateComponent from '../../nav/DateComponent'
import { Context } from '../../Context.type'
import { IssuedCard } from '../../issuedCard/IssuedCard.type'
import '../Style.css'
import UseWindowDimensions from '../../UseWindowDimensions'

type Props = {
  isStripeDisabled: boolean
  issuedCard: IssuedCard
}

const IssuedCardAddress = (props: Props) => {
  const { context }: { context: Context } = useContext(AppContext)

  const { billing } = props.issuedCard.issuedCardStripe.cardholder
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={3} className="bold">
          {`Cardholder's Name:`}
        </Grid>

        <Grid item xs={12} md={9}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.issuedCard.issuedCardStripe.cardholder.name}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={3} className="bold">
          {`Billing Address:`}{' '}
          <HelpNotice
            text={`Enter this address when using this NachoCard to pay a vendor and they ask for your Billing Address.`}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {billing.address.line1} {billing.address.line2}
          <br />
          {billing.address.city}, {utils.getLabelState(billing.address.country, billing.address.state)}{' '}
          {billing.address.postal_code}
          <br />
          {utils.getLabelCountry(billing.address.country)}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={3} className="bold">
          {`Phone Number:`}
        </Grid>

        <Grid item xs={12} md={9}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.issuedCard.issuedCardStripe.cardholder.phone_number}
        </Grid>
      </Grid>
      {context.me.role === 'ADMIN' && (
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={3} className="bold">
            {`Email:`}
          </Grid>

          <Grid item xs={12} md={9}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {props.issuedCard.issuedCardStripe.cardholder.email}
          </Grid>
        </Grid>
      )}

      {/* {(context.me.role === 'ADMIN' || props.isStripeDisabled) && (
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={3} className="bold">
            {`Legal Name:`}
          </Grid>

          <Grid item xs={12} md={9}>
            {props.issuedCard.issuedCardStripe.cardholder.individual
              ? props.issuedCard.issuedCardStripe.cardholder.individual.first_name +
                ' ' +
                props.issuedCard.issuedCardStripe.cardholder.individual.last_name
              : ''}
          </Grid>
        </Grid>
      )} */}
      {(context.me.role === 'ADMIN' || props.isStripeDisabled) && (
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={3} className="bold">
            {`Date of birth:`}
          </Grid>

          <Grid item xs={12} md={9}>
            {props.issuedCard.issuedCardStripe.cardholder.individual &&
            props.issuedCard.issuedCardStripe.cardholder.individual.dob ? (
              <DateComponent
                date={
                  new Date(
                    props.issuedCard.issuedCardStripe.cardholder.individual.dob.year,
                    props.issuedCard.issuedCardStripe.cardholder.individual.dob.month - 1,
                    props.issuedCard.issuedCardStripe.cardholder.individual.dob.day
                  )
                }
              />
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      )}
    </>
  )
  // }
}

export default IssuedCardAddress
