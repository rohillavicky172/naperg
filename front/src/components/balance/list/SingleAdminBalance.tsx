import React from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
import utils from '../../utils'
import { Balance } from '../Balance.type'
import { Link } from 'react-router-dom'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
import DateComponent from '../../nav/DateComponent'

type Props = {
  balance: Balance
}

const SingleBalance = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn bgHover">
        <Grid container>
          <Grid item xs={12} sm={2}>
            <div>
              <Link className="link" to={'/balance/' + props.balance.id}>
                Balance
              </Link>
              <IsValidated
                iconNotValidated={'clear'}
                icon={'done'}
                isValidated={props.balance.isEnabled}
                textValidated={'Auto Topup Enabled'}
                textNotValidated={'Auto Topup NOT Enabled'}
              />
            </div>
            <div>
              <DateComponent date={props.balance.createdAt} />
            </div>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div>
              {props.balance.companie.name}
              <Link className="link" to={'/company/' + props.balance.companie.id}>
                <Icon className="textSize7">link</Icon>
              </Link>
              <IsValidated
                iconNotValidated={'clear'}
                icon={'done'}
                isValidated={props.balance.companie.isTrustedPayment}
                textValidated={'Company Trusted'}
                textNotValidated={'Company not Trusted'}
              />
            </div>
            <div>{props.balance.companie.typeCreation}</div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div>valueBalance: {utils.priceFormated(props.balance.valueBalance, props.balance.currency)}</div>
            <div>pendingBalance: {utils.priceFormated(props.balance.pendingBalance, props.balance.currency)}</div>
            <div>minimumBalance: {utils.priceFormated(props.balance.minimumBalance, props.balance.currency)}</div>
            <div>pendingCharge: {utils.priceFormated(props.balance.pendingCharge, props.balance.currency)}</div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div>unpaidCharge: {utils.priceFormated(props.balance.unpaidCharge, props.balance.currency)}</div>
            <div>cashbackPending: {utils.priceFormated(props.balance.cashbackPending, props.balance.currency)}</div>
            <div>cashbackAvailable: {utils.priceFormated(props.balance.cashbackAvailable, props.balance.currency)}</div>
            <div>pendingSmallAmount: {utils.priceFormated(props.balance.pendingSmallAmount, props.balance.currency)}</div>
          </Grid>
          <Grid item xs={12} sm={2}>
            {props.balance.companie.userRoleCompanies.map((userRoleCompanie) => (
              <div key={userRoleCompanie.id}>
                {userRoleCompanie.user.firstName} {userRoleCompanie.user.lastName}
                <Link className="link" to={'/user/' + userRoleCompanie.user.id}>
                  <Icon className="textSize7">link</Icon>
                </Link>
              </div>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleBalance
