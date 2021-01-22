import React from 'react'
import CreateNewUser from './CreateNewUser'
import { Paper } from '@material-ui/core'

const SignupAdminPage = () => {
  return (
    <div className="responsiveMargin2">
      <div className="paperOut">
        <Paper className="paperIn">
          <CreateNewUser showPrivateMessageInviter={false} subTitle={''} title={`Invite new user`} signupType={'ADMINFORM'} />
        </Paper>
      </div>
    </div>
  )
}

export default SignupAdminPage
