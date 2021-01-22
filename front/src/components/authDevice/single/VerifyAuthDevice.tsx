import React from 'react'
import { AUTH_DEVICE } from '../../../config/config'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { VERIFY_AUTH_DEVICE_MUTATION } from '../GraphQL'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Client } from '../../Client.type'
import { AuthDevice } from '../AuthDevice.type'
import { Context } from '../../Context.type'
import VerifyPhoneForm from '../../user/single/phone/VerifyPhoneForm'

type State = {
  loading: boolean
  errorMessage: string
}

type Props = {
  client: Client
  context: Context
  authDevice: AuthDevice
  verifyAuthDevice: any
  onUpdate: () => void
  onCancel: () => void
}

class VerifyAuthDevice extends React.Component<Props, State> {
  state = {
    loading: false,
    errorMessage: '',
  }

  render() {
    return (
      <>
        <VerifyPhoneForm onVerify={(validationToken) => this.verifyAuthDevice(validationToken)} />
        <div style={{ height: '10px' }} />
        <div>{this.state.errorMessage && <span className="secondary">{this.state.errorMessage}</span>}</div>
        <div style={{ height: '10px' }} />
        <div>
          <Button
            onClick={() => {
              this.props.onCancel()
            }}>{`Cancel`}</Button>
        </div>
      </>
    )
  }

  verifyAuthDevice = async (validationToken: string) => {
    this.setState({ loading: true })
    let data
    try {
      data = await this.props.verifyAuthDevice({
        variables: {
          where: { id: this.props.authDevice.id },
          data: {
            validationToken,
          },
        },
      })
    } catch (e) {
      this.setState({ loading: false })
      // console.log(e)
      if (e.graphQLErrors.length) {
        this.setState({ errorMessage: e.graphQLErrors[0].message })
      }
    }
    if (data) {
      this.setState({ loading: false })
      localStorage.setItem(AUTH_DEVICE + '|' + this.props.context.me.email, JSON.stringify(data.data.verifyAuthDevice))

      await this.props.client.resetStore()
      await this.props.context.refreshContext()
      this.props.onUpdate()
    }
  }
}

export default compose(
  graphql(VERIFY_AUTH_DEVICE_MUTATION, {
    name: 'verifyAuthDevice',
  }),
  withContext,
  withApollo
)(VerifyAuthDevice)
