import React from 'react'
import { TEST_MODE } from '../../../config/config'
import Icon from '@material-ui/core/Icon'
import ToggleTestMode from '../header/ToggleTestMode'
import { withContext } from '../../withContext'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { Context } from '../../Context.type'
import { Client } from '../../Client.type'
import { History } from '../../History.type'

type State = {
  message1: string
  message2: string
}

type Props = {
  message: string
  context: Context
  client: Client
  history: History
}

class Error extends React.Component<Props, State> {
  state = {
    message1: '',
    message2: ''
  }
  componentDidMount() {
    const testMode = localStorage.getItem(TEST_MODE) === 'true'
    let modeString = testMode ? 'Live' : 'Test'
    let modeStringOppsotite = testMode ? 'Test' : 'Live'
    let message1 = this.props.message

    if (message1 === 'NOT_AUTH') {
      // this.props.history.replace('/login?mode=NOT_AUTH')
      // utils.removeTokenLogout()
      this.props.context.logout()
      // this.props.context.logout()
      this.props.client.resetStore()
      setTimeout(() => {
        this.props.history.push('/?mode=NOT_AUTH')
      }, 500)
      return
    }
    if (message1 === 'jwt expired') {
      // this.props.history.replace('/login?mode=NOT_AUTH')
      // utils.removeTokenLogout()
      this.props.context.logout()
      // this.props.context.logout()
      this.props.client.resetStore()
      setTimeout(() => {
        this.props.history.push('/?mode=NOT_AUTH')
      }, 500)
      return
    }
    if (message1 === 'NO_DEVICE') {
      this.props.context.logout()
      this.props.client.resetStore()
      setTimeout(() => {
        this.props.history.push('/?mode=NO_DEVICE')
      }, 500)
      return
    }
    if (message1 === 'DEVICE_NOT_VERIFIED') {
      // this.props.context.logout()
      this.props.client.resetStore()
      setTimeout(() => {
        this.props.history.push('/?mode=DEVICE_NOT_VERIFIED')
      }, 500)
      return
    }
    let message2 = ''
    if (this.props.message === 'Wrong environment') {
      message1 = `Did you mean to be in ${modeString} Mode?`
      message2 = `We couldn't find what you were looking for in ${modeStringOppsotite} Mode, but we found it in ${modeString} Mode.`
    }
    this.setState({ message1, message2 })
  }
  render() {
    return (
      <>
        {this.props.context.me.role === 'ADMIN' && (
          <div className="tac">
            <Icon className="textSize20">error_outline</Icon>
            <h2>{`Error!`}</h2>
            <h3>{`Oops! Something went wrong. Please try again or contact us.`}</h3>
            {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
              <>
                <h4>{this.state.message1}</h4>
                <p>{this.state.message2}</p>
              </>
            )}
            <br />
            {this.props.message === 'Wrong environment' && <ToggleTestMode onClick={() => {}} />}
          </div>
        )}
      </>
    )
  }
}

export default compose(
  withContext,
  withRouter,
  withApollo
)(Error)
