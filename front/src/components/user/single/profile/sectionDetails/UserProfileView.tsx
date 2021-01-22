import React from 'react'
import Grid from '@material-ui/core/Grid'
import { User } from '../../../User.type'
import DateComponent from '../../../../nav/DateComponent'
import Icon from '@material-ui/core/Icon'
import UseWindowDimensions from '../../../../UseWindowDimensions'

type Props = {
  user: User
}

const UserProfileView = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`First name:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.firstName}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Last name:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.lastName}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Date of birth:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.birthday && <DateComponent date={props.user.birthday} />}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Last 4 digits of social security no.:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.last4Social}
        </Grid>
      </Grid>
      {/* <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          {`Emails:`}
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.unsubscribe ? 'true' : 'false'}
        </Grid>
      </Grid> */}
    </>
  )
}

export default UserProfileView
