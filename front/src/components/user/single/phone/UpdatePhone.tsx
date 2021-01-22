import React from 'react'

import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_PHONE_MUTATION } from './GraphQL'
import Button from '@material-ui/core/Button'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import { withContext } from '../../../withContext'
import { User } from '../../User.type'
import { Context } from '../../../Context.type'
import PhoneForm from './PhoneForm'

type State = {
  user: User
  loading: boolean
  errorMessage: string
}

type Props = {
  context: Context
  disabled: boolean
  showCancelButton: boolean
  user: User
  updatePhone: any
  onUpdate: () => void
  onCancel: () => void
}

class UpdatePhone extends React.Component<Props, State> {
  state = {
    loading: false,
    user: this.props.user,
    errorMessage: ''
  }
  isFormValid = () => {
    return (
      this.state.user.phoneChangeRequested && this.state.user.phoneCodeChangeRequested
      // &&
      // this.state.user.phoneChangeRequested + this.state.user.phoneCodeChangeRequested !==
      //   this.state.user.phone + this.state.user.phoneCode
    )
  }

  render() {
    // const phoneCode = this.state.user.phoneCodeChangeRequested
    //   ? this.state.user.phoneCodeChangeRequested
    //   : this.state.user.phoneCode
    //   ? this.state.user.phoneCode
    //   : '+1'
    // const phoneChangeRequested = this.state.user.phoneChangeRequested
    //   ? this.state.user.phoneChangeRequested
    //   : this.state.user.phone
    //   ? this.state.user.phone
    //   : ''

    return (
      <>
        <PhoneForm
          phone={this.state.user.phoneChangeRequested}
          phoneCode={this.state.user.phoneCodeChangeRequested}
          onChangePhone={phone => this.setState({ user: { ...this.state.user, phoneChangeRequested: phone } })}
          onChangePhoneCode={phoneCode => this.setState({ user: { ...this.state.user, phoneCodeChangeRequested: phoneCode } })}
          onKeyPress={() => this.updatePhone()}
        />
        <div style={{ height: '10px' }} />
        {this.state.errorMessage && <div className="secondary">{this.state.errorMessage}</div>}
        <div>
          <ButtonLoadingAfterClick
            id={'idButton'}
            icon={''}
            color={'secondary'}
            disabled={!this.isFormValid()}
            variant={'outlined'}
            size={'medium'}
            buttonText={'Send verification code'}
            buttonLoadingText={`Loading...`}
            onClick={() => {
              this.updatePhone()
            }}
            loading={this.state.loading}
          />{' '}
          {this.props.showCancelButton && (
            <Button
              onClick={() => {
                this.props.onCancel()
              }}>{`Cancel`}</Button>
          )}
        </div>
      </>
    )
  }

  updatePhone = async () => {
    let data
    this.setState({ loading: true })
    try {
      data = await this.props.updatePhone({
        variables: {
          where: { id: this.state.user.id },
          data: {
            phoneChangeRequested: this.state.user.phoneChangeRequested,
            phoneCodeChangeRequested: this.state.user.phoneCodeChangeRequested
          }
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
      this.props.onUpdate()
    }
  }
}

export default compose(
  graphql(UPDATE_PHONE_MUTATION, {
    name: 'updatePhone'
  }),
  withContext
)(UpdatePhone)
