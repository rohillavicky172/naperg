
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { UPDATE_AUTH_DEVICE_MUTATION } from '../GraphQL'
// import Button from '@material-ui/core/Button'
import { AuthDevice } from '../AuthDevice.type'
import IsDeletedLogically from '../../nav/IsDeletedLogically'
import { Client } from '../../Client.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

type State = {
  loading: boolean
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

class DeleteAuthDeviceLogically extends React.Component<Props, State> {
  state = {
    loading: false
  }

  updateAuthDevice = async () => {
    this.setState({ loading: true })
    try {
      await this.props.updateAuthDevice({
        variables: {
          data: {
            isDeleted: true
          },
          where: { id: this.props.authDevice.id }
        }
      })
    } catch (e) {
      console.log(e)
    }
    this.props.client.resetStore()
  }

  render() {
    return (
      <>
        {this.props.authDevice.isDeleted ? (
          <IsDeletedLogically title={'Device deleted'} />
        ) : (
          <ButtonLoadingAfterClick
            id={'idButton'}
            disabled={false}
            icon={''}
            size={'medium'}
            color={'secondary'}
            variant={'outlined'}
            buttonText={'Disable'}
            buttonLoadingText={`Setting up...`}
            onClick={() => {
              this.updateAuthDevice()
            }}
            loading={this.state.loading}
          />
        )}
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
)(DeleteAuthDeviceLogically)
