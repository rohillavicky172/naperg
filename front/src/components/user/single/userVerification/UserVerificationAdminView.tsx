import React from 'react'

import { Grid, Icon } from '@material-ui/core'
import UseWindowDimensions from '../../../UseWindowDimensions'
import { User } from '../../User.type'
import DateComponent from '../../../nav/DateComponent'
import ApproveUserVerification from './ApproveUserVerification'

type Props = {
  user: User
}

const UserVerificationAdminView = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <h3>User Verification</h3>
      <p>This action will sned an email to the user. He will be able to connect his payment source</p>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          verificationStatusOffSite
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.verificationStatusOffSite === true ? 'True' : 'False'}
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          verificationStatus
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.verificationStatus}
        </Grid>
      </Grid>

      <Grid container alignItems="flex-end">
        <Grid item xs={12} md={4} className="bold">
          verificationDateSubmission
        </Grid>

        <Grid item xs={12} md={8}>
          {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
          {props.user.verificationDateSubmission && <DateComponent date={props.user.verificationDateSubmission} />}
        </Grid>
      </Grid>
      <ApproveUserVerification userId={props.user.id} />
    </>
  )
}

export default UserVerificationAdminView
