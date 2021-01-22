import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
// import DateComponent from '../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { Cardholder } from '../Cardholder.type'
import { issuedCardClass } from '../../issuedCard/IssuedCard.type'
import IssuedCardAddress from '../../issuedCard/single/IssuedCardAddress'
type Props = {
  cardholder: Cardholder
}

// class SingleCardholder extends React.Component<Props, State> {
const SingleCardholder = (props: Props) => {
  // let messages = this.props.cardholder.message.split('|')

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/user/${props.cardholder.user.id}`}>
              {props.cardholder.user.firstName} {props.cardholder.user.lastName}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            cardholder Name: {props.cardholder.name}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/company/${props.cardholder.companie.id}`}>
              {props.cardholder.companie.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/adminIssuedCards/?cardholderId=${props.cardholder.id}`}>
              {props.cardholder.issuedCards.length} NachoCards
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            stripe_issuedCardHolder_id: {props.cardholder.stripe_issuedCardHolder_id}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/cardholder/${props.cardholder.id}`}>
              cardholder
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} className="">
            <div className="paperOut">
              <Paper className="paperIn">
                <IssuedCardAddress
                  isStripeDisabled={false}
                  issuedCard={{
                    ...issuedCardClass,
                    issuedCardStripe: {
                      ...issuedCardClass.issuedCardStripe,
                      cardholder: props.cardholder.cardholderStripe,
                    },
                  }}
                />
              </Paper>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleCardholder
