
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { REQUEST_VERIFY_AUTH_DEVICE_MUTATION } from '../GraphQL'
import Button from '@material-ui/core/Button'
import { AuthDevice } from '../AuthDevice.type'
import { User } from '../../user/User.type'

// import { withContext } from '../../withContext'
// import Icon from '@material-ui/core/Icon'
// import { Context } from '../../Context.type'

type State = {
  loading: boolean,

  errorMessage: string
}

type Props = {
  // context: Context,
  user: User,
  method: string,
  history: History,
  authDevice: AuthDevice,
  requestVerifyAuthDevice: any,
  onUpdate: () => void,
  onCancel: () => void
}

class RequestVerifyAuthDevicePhone extends React.Component<Props, State> {
  state = {
    loading: false,
    errorMessage: ''
  }

  render() {
    return (
      <>
        <p>
          {this.props.method === 'phone' && `Send an SMS now to verify you account.`}
          {this.props.method === 'email' && `Send an Email now to verify you account.`}
        </p>
        <Button color="primary" variant="outlined" onClick={this.requestVerifyAuthDevice}>
          {`Request Verification Code`}
        </Button>{' '}
        <Button onClick={this.props.onCancel}>{`Cancel`}</Button>
        <div style={{ height: '10px' }} />
        <div>{this.state.errorMessage && <span className="secondary">{this.state.errorMessage}</span>}</div>
      </>
    )
  }

  requestVerifyAuthDevice = async () => {
    this.setState({ loading: true })
    let data
    try {
      data = await this.props.requestVerifyAuthDevice({
        variables: {
          method: this.props.method
        }
      })
    } catch (e) {
      this.setState({ loading: false })
      // console.log(e)
      if (e.graphQLErrors.length) {
        this.setState({ errorMessage: e.graphQLErrors[0].message })
      }
      // this.setState
    }
    if (data) {
      this.setState({ loading: false })
      // this.props.context.openSnackBar(true, 'Phone Verified!', 'message', 2000)
      this.props.onUpdate()
    }
  }
}

export default compose(
  graphql(REQUEST_VERIFY_AUTH_DEVICE_MUTATION, {
    name: 'requestVerifyAuthDevice'
  })

  // withContext
)(RequestVerifyAuthDevicePhone)
