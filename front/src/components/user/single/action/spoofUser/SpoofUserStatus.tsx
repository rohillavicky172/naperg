
import React from 'react'
import Button from '@material-ui/core/Button'
// import { Context } from '../../../../Context.type'
import { SPOOFED_USER_ID, USER_ROLE_COMPANIE, USER_ROLE_COMPANIE_ADMIN_WHILE_SPOOFING } from '../../../../../config/config'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'

type State = {
  testMode: boolean
}

type Props = {
  context: Context,
  client: {
    resetStore: () => void
  }
}

class SpoofUserStatus extends React.Component<Props, State> {
  unSpoofUser = () => {
    localStorage.setItem(SPOOFED_USER_ID, '')

    let userRoleCompanie = JSON.parse(localStorage.getItem(USER_ROLE_COMPANIE_ADMIN_WHILE_SPOOFING) || '{}')
    localStorage.setItem(USER_ROLE_COMPANIE, JSON.stringify(userRoleCompanie))

    this.props.client.resetStore()
  }

  render() {
    const spoofedUserId = localStorage.getItem(SPOOFED_USER_ID)
    return (
      <>
        {spoofedUserId && (
          <Button onClick={() => this.unSpoofUser()} color="primary" variant="contained">
            {`LoggedIn as : ${this.props.context.me.firstName}. Cancel`}
          </Button>
        )}
      </>
    )
  }
}

export default compose(
  withApollo,
  withContext
)(SpoofUserStatus)
