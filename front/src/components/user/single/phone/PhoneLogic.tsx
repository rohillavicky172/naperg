import React from 'react'
import UpdatePhone from './UpdatePhone'
import VerifyPhone from './VerifyPhone'
import { User } from '../../User.type'
// import UpdateIsPhoneValidationRequired from '../action/UpdateIsPhoneValidationRequired'

type State = {
  step: number
}

type Props = {
  user: User
  onUpdate: () => void
  onCancel: () => void
  showCancelButton: boolean
}

class PhoneLogic extends React.Component<Props, State> {
  state = {
    step: 1,
  }

  render() {
    return (
      <>
        {this.state.step === 1 && (
          <>
            <h3>{`Phone number verification`}</h3>
            <p>{`As an additional security measure, we require you to verify your phone number`}</p>
            <UpdatePhone
              showCancelButton={this.props.showCancelButton}
              onUpdate={() => this.setState({ step: 2 })}
              onCancel={() => this.props.onCancel()}
              user={this.props.user}
            />

            {this.props.user.isPhoneChangeRequestedPending && (
              <>
                <div style={{ height: '20px' }} />
                <div onClick={() => this.setState({ step: 2 })} className="link cursor tar">
                  Already have a code?
                </div>
              </>
            )}
          </>
        )}
        {this.state.step === 2 && (
          <>
            <h3>{`Confirm your phone number`}</h3>

            <p>{`Please enter the 6-digit code that we just sent to phone number ${this.props.user.phoneCodeChangeRequested} ${this.props.user.phoneChangeRequested}`}</p>

            <VerifyPhone
              onUpdate={() => {
                console.log('onUpdate')
                this.props.onUpdate()
                this.setState({ step: 1 })
              }}
              onCancel={() => {
                this.props.onCancel()
                this.setState({ step: 1 })
              }}
              user={this.props.user}
            />
          </>
        )}
      </>
    )
  }
}

export default PhoneLogic
