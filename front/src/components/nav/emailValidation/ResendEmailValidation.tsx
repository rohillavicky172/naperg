import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import gql from 'graphql-tag'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { User } from '../../user/User.type'

type State = {}

type Props = {
  sendLinkValidateEmailMutation: any
  context: Context
  user: User
}

class ResendEmailValidation extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Button variant="outlined" onClick={() => this.sendEmail()}>
          {`I didn't receive verification email. Resend.`}
        </Button>
      </>
    )
  }
  sendEmail = async () => {
    let result
    try {
      result = await this.props.sendLinkValidateEmailMutation({
        variables: {}
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (result) {
      const messageSnackBar = `Email sent successfully to ${result.data.sendLinkValidateEmail.email}!`

      this.props.context.openSnackBar(true, messageSnackBar, 'message')
    }
  }
}

const SEND_LINK_VALIDATE_EMAIL_MUTATION = gql`
  mutation sendLinkValidateEmailMutation {
    sendLinkValidateEmail {
      email
    }
  }
`

export default compose(
  graphql(SEND_LINK_VALIDATE_EMAIL_MUTATION, { name: 'sendLinkValidateEmailMutation' }),
  withContext
)(ResendEmailValidation)
