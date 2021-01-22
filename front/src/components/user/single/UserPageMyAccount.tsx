
import React from 'react'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import UserProfile from './profile/UserProfile'

type State = {}

type Props = {
  context: Context
}

class UserPageMyAccount extends React.Component<Props, State> {
  render() {
    // if (!this.props.context.me) {
    //   return <Login goTo={() => {}} title={`Log in`} redirectAfter={''} />
    // }
    return (
      <>
        <div className="paperOut">
          {/* <EmailValidated /> */}
          <UserProfile userId={this.props.context.me.id} />
        </div>
      </>
    )
  }
}

export default withContext(UserPageMyAccount)
