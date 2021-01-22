import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { PromoCode } from '../PromoCode.type'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'

type Props = {
  promoCode: PromoCode
}

const SinglePromoCode = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={4} className="marginAuto">
            Promo Code: {props.promoCode.code}
          </Grid>
          <Grid item xs={12} sm={4} className="marginAuto">
            Description: {props.promoCode.description}
          </Grid>

          <Grid item xs={12} sm={2} className="marginAuto">
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={props.promoCode.isRedeem}
              textValidated={'Redeemed'}
              textNotValidated={'Not Redeemed'}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SinglePromoCode
