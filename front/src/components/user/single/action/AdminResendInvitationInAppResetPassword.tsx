import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import DateComponent from '../../../nav/DateComponent'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { RESEND_INVITATION_IN_APP_RESET_PASSWORD_MUTATION } from '../../GraphQL'
import { User } from '../../User.type'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'

type State = {}

type Props = {
  user: User
  // userId: string,
  context: Context
  // user: User,
  resendInvitationInAppResetPassword: any
  client: any
}

class AdminResendInvitationInAppResetPassword extends React.Component<Props, State> {
  resendInvitationInAppResetPassword = async () => {
    let data
    try {
      data = await this.props.resendInvitationInAppResetPassword({
        variables: { where: { id: this.props.user.id } },
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (data) {
      this.props.context.openSnackBar(true, 'sent', 'message')
      this.props.client.resetStore()
    }
  }

  render() {
    // console.log(this.props.user)
    return (
      <>
        <div>
          {`Last sent: `}
          <DateComponent date={this.props.user.resetPasswordRequest} />
        </div>
        <div>
          <ButtonSecondValidation
            buttonText={`Resend Invitation`}
            color="secondary"
            size={'small'}
            variant="outlined"
            onClick={() => {
              this.resendInvitationInAppResetPassword()
            }}
          />
        </div>
      </>
    )
  }
}

export default compose(
  graphql(RESEND_INVITATION_IN_APP_RESET_PASSWORD_MUTATION, {
    name: 'resendInvitationInAppResetPassword',
  }),
  withApollo,
  withContext
)(AdminResendInvitationInAppResetPassword)
