import React from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Grid from '@material-ui/core/Grid'
// import CloseOnboardingNotice from '../../../nav/customTooltip/CloseOnboardingNotice'

type Props = {
  type: string
  companieId: string
  children: any
}

const TenplateOnboardingNotice = (props: Props) => (
  <div>
    <div className="paperOut">
      <Paper className="bgGrey">
        <Grid container>
          <Grid item xs={1} sm={1} className="marginAuto "></Grid>
          <Grid item xs={9} sm={9} className="marginAuto ">
            <p className="textSize10 fontWeight19">
              <Icon className={'textSize12 iconAlignTextBottom'}>info</Icon> {props.children}
            </p>
          </Grid>
          <Grid item xs={2} sm={2} className="tar">
            {/* <CloseOnboardingNotice companieId={props.companieId} type={props.type} /> */}
          </Grid>
        </Grid>
      </Paper>
    </div>
  </div>
)

export default TenplateOnboardingNotice
