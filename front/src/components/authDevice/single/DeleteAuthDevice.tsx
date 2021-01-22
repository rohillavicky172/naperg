
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { DELETE_AUTH_DEVICE_MUTATION } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Client } from '../../Client.type'
import { AuthDevice } from '../AuthDevice.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

type State = {
  loading: boolean
}

type Props = {
  context: Context
  sourceId: string
  companieId: string
  deleteCard: any
  deleteAuthDevice: any
  authDevice: AuthDevice
  client: Client
}

class DeleteAuthDevice extends React.Component<Props, State> {
  state = {
    loading: false
  }
  deleteAuthDevice = async () => {
    this.setState({ loading: true })
    let card
    try {
      card = await this.props.deleteAuthDevice({
        variables: {
          where: {
            id: this.props.authDevice.id
          }
        }
      })
    } catch (e) {
      this.setState({ loading: false })
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    this.setState({ loading: false })
    if (card) {
      this.props.context.openSnackBar(true, `Device successfully deleted`, 'message')
      this.props.client.resetStore()
    }
  }

  render() {
    return (
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        disabled={false}
        color={'secondary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Hard Delete`}
        buttonLoadingText={`Loading...`}
        onClick={() => {
          this.deleteAuthDevice()
        }}
        loading={this.state.loading}
      />
    )
  }
}

export default compose(
  graphql(DELETE_AUTH_DEVICE_MUTATION, {
    name: 'deleteAuthDevice'
  }),
  withContext,
  withApollo
)(DeleteAuthDevice)
