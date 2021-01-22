import React from 'react'
import { AUTH_DEVICE } from '../../../../../config/config'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import { TOTP_LOGIN_VERIFY_MUTATION } from './GraphQL'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
// import { withContext } from '../../../withContext'
// import { Client } from '../../../../Client.type'
// import { User } from '../../User.type'
// import { Context } from '../../../Context.type'

type State = {
  loading: boolean
  errorMessage: string
  token: string
}

type Props = {
  // me: User,
  userId: string
  context: Context
  verifyLogin: any
  // user: User,
  onCancel: () => void
  onUpdate: () => void
  // verify: any,
  client: any
}

class TotpLoginVerify extends React.Component<Props, State> {
  state = {
    token: '',
    loading: false,
    errorMessage: '',
  }
  verifyLogin = async () => {
    this.setState({ loading: true })
    this.setState({ errorMessage: '' })
    let dataAuthDevice
    try {
      dataAuthDevice = await this.props.verifyLogin({ variables: { token: this.state.token } })
    } catch (e) {
      this.setState({ loading: false })
      this.setState({ errorMessage: e.graphQLErrors[0].message })
    }
    this.setState({ loading: false })
    if (dataAuthDevice && dataAuthDevice.data && dataAuthDevice.data.totpLoginVerify) {
      // this.props.context.openSnackBar(true, 'Phone Verified!', 'message', 2000)
      localStorage.setItem(AUTH_DEVICE + '|' + this.props.context.me.email, JSON.stringify(dataAuthDevice.data.totpLoginVerify))

      await this.props.client.resetStore()
      await this.props.context.refreshContext()
      this.props.onUpdate()
    }
    // const secret = dataSecret.data.totpGenerateSecret
    // console.log(dataUser.data.totpFirstVerify.isTwoFactorTotpVerified)
    // if (dataUser.data && dataUser.data.totpFirstVerify && dataUser.data.totpFirstVerify.isTwoFactorTotpVerified === false) {
    //   this.setState({ errorMessage: 'Wrong code!' })
    // } else {
    //   this.props.onUpdate()
    // }
  }

  render() {
    return (
      <>
        <p>Get a verification code from the Authenticator app</p>
        <FormControl className="width100per">
          <InputLabel htmlFor="token">{`Token`}</InputLabel>
          <Input
            id="token"
            onChange={(e) =>
              this.setState({
                token: e.target.value,
              })
            }
            type="text"
            value={this.state.token}
          />
        </FormControl>
        <div style={{ height: '10px' }} />
        <div>
          <Button color="secondary" variant="outlined" onClick={() => this.verifyLogin()}>
            Verify
          </Button>{' '}
          <Button onClick={() => this.props.onCancel()}>Cancel</Button>
          <p className="secondary">{this.state.errorMessage}</p>
        </div>
      </>
    )
  }
}

export default compose(
  graphql(TOTP_LOGIN_VERIFY_MUTATION, {
    name: 'verifyLogin',
  }),
  withApollo,
  withContext
)(TotpLoginVerify)
