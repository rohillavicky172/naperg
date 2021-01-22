
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { UPDATE_AUTH_DEVICE_MUTATION } from '../GraphQL'
import { AuthDevice } from '../AuthDevice.type'
import { Client } from '../../Client.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import UpdateAuthDeviceForm from './UpdateAuthDeviceForm'
// import IsDeletedLogically from '../../nav/IsDeletedLogically'

type State = {
  loading: boolean
  authDevice: AuthDevice
}

type Props = {
  userId: string
  buttonText: string
  userRoleCompanieId: string
  authDevice: AuthDevice
  context: Context
  updateAuthDevice: any
  client: Client
  updateDateInvitationInCompanie: any
}

class UpdateAuthDevice extends React.Component<Props, State> {
  state = {
    authDevice: this.props.authDevice,
    loading: false
  }

  updateAuthDevice = async () => {
    this.setState({ loading: true })
    try {
      await this.props.updateAuthDevice({
        variables: {
          data: {
            isVerified: this.state.authDevice.isVerified
          },
          where: { id: this.props.authDevice.id }
        }
      })
    } catch (e) {
      this.setState({ loading: false })
      console.log(e)
    }
    this.setState({ loading: false })
    // this.props.client.resetStore()
  }

  render() {
    return (
      <>
        <UpdateAuthDeviceForm
          authDevice={this.state.authDevice}
          onUpdate={authDevice => this.setState({ authDevice: authDevice })}
        />

        <ButtonLoadingAfterClick
          id={'idButton'}
          disabled={false}
          icon={''}
          size={'medium'}
          color={'secondary'}
          variant={'outlined'}
          buttonText={'Save'}
          buttonLoadingText={`Setting up...`}
          onClick={() => {
            this.updateAuthDevice()
          }}
          loading={this.state.loading}
        />
      </>
    )
  }
}

export default compose(
  graphql(UPDATE_AUTH_DEVICE_MUTATION, {
    name: 'updateAuthDevice'
  }),
  withApollo,
  withContext
)(UpdateAuthDevice)
