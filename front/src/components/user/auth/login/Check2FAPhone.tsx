
import React from 'react'
import { withContext } from '../../../withContext'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { Context } from '../../../Context.type'
import VerifyAuthDevice from '../../../authDevice/single/VerifyAuthDevice'
import RequestVerifyAuthDevicePhone from '../../../authDevice/single/RequestVerifyAuthDevicePhone'
import { User } from '../../User.type'
// import Paper from '@material-ui/core/Paper'
// import { USER_QUERY } from '../../GraphQL'
// import { Link } from 'react-router-dom'
// import LoginDetails from './LoginDetails'
// import NotFound from '../../../nav/error/NotFound'
// import NotAuth from '../../../nav/error/NotAuth'
// import Loading from '../../../nav/error/Loading'

type State = {
  mode: string
}

type Props = {
  context: Context,
  redirectAfter: string,
  user: User,
  method: String,
  title: string,
  onCancel: () => void,
  goTo: (page: string) => void
}

class Check2FAPhone extends React.Component<Props, State> {
  state = {
    mode: 'typeRequest'
  }
  render() {
    return (
      <>
        {this.state.mode === 'typeRequest' && (
          <RequestVerifyAuthDevicePhone
            method={this.props.method}
            user={this.props.user}
            onCancel={this.props.onCancel}
            authDevice={this.props.context.authDevice}
            onUpdate={() => this.setState({ mode: 'confirmation' })}
          />
        )}

        {this.state.mode === 'confirmation' && (
          <>
            <h3>{`Confirmation`}</h3>
            <p>{`Please check your phone for the 6-digit code that we just sent to you.`}</p>
            <VerifyAuthDevice onUpdate={() => {}} onCancel={this.props.onCancel} authDevice={this.props.context.authDevice} />
          </>
        )}
      </>
    )
  }
}

export default compose(
  withContext,
  withApollo
)(Check2FAPhone)
