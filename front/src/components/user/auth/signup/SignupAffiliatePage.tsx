import React from 'react'
import CreateNewUser from './CreateNewUser'
import { withRouter } from 'react-router'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { flowRight as compose } from 'lodash'
import { Paper } from '@material-ui/core'
type State = {}

type Props = {
  history: any
  context: Context
}

class SignupAffiliatePage extends React.Component<Props, State> {
  render() {
    return (
      <div className="responsiveMargin2">
        <div className="paperOut">
          <Paper className="paperIn">
            <CreateNewUser
              showPrivateMessageInviter={true}
              title={`Invite a User`}
              subTitle={`Invite your contacts to join NachoNacho!`}
              signupType={'AFFILIATEFORM'}
            />
          </Paper>
        </div>
      </div>
    )
  }
}

export default compose(withRouter, withContext)(SignupAffiliatePage)
