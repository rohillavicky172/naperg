import React from 'react'
import { PromoCode } from '../PromoCode.type'
import DateComponent from '../../nav/DateComponent'
import { Grid, Paper } from '@material-ui/core'
import DeletePromoCode from '../DeletePromoCode'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
import { Link } from 'react-router-dom'
import RedeemPromoCode from '../RedeemPromoCode'

type Props = {
  promoCode: PromoCode
}

const SinglePromoCodeAdmin = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            {props.promoCode.id}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.promoCode.type}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            <div>
              {'createdAt: '}
              <DateComponent date={props.promoCode.createdAt} />
            </div>
            <div>
              {'startAt: '}
              <DateComponent date={props.promoCode.startAt} />
            </div>
            <div>
              {'endAt: '}
              <DateComponent date={props.promoCode.endAt} />
            </div>
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.promoCode.description}
          </Grid>

          <Grid item xs={12} sm={2} className="">
            {props.promoCode.code}
          </Grid>

          <Grid item xs={12} sm={2} className="">
            <Link className="link" to={`/company/${props.promoCode.companie.id}?mode=admin`}>
              {props.promoCode.companie.name}
            </Link>
          </Grid>

          <Grid item xs={12} sm={1} className="">
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.promoCode.isRedeem}
              textValidated={'Redeemed'}
              textNotValidated={'Not Redeemed'}
            />
          </Grid>
          <Grid item xs={12} sm={1} className="">
            <DeletePromoCode promoCodeId={props.promoCode.id} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} className="">
            <RedeemPromoCode onUpdate={() => {}} companieId={props.promoCode.companie.id} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SinglePromoCodeAdmin
