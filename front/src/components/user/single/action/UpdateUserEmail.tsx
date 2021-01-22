
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_USER_EMAIL_MUTATION } from '../../GraphQL'
import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'
import { User } from '../../User.type'
import { Context } from '../../../Context.type'
// import { withRouter } from 'react-router-dom'
// import Grid from '@material-ui/core/Grid'
// import FormHelperText from '@material-ui/core/FormHelperText'
// import utils from '../../../utils'
// import Switch from '@material-ui/core/Switch'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import UpdateUser from './UpdateUser'

type State = {
  user: User,
  errorMessage: string
}

type Props = {
  context: Context,
  disabled: boolean,
  user: User,
  updateUserEmail: any,
  changeEditMode: () => void
}

class UpdateUserEmail extends React.Component<Props, State> {
  state = {
    user: this.props.user,
    errorMessage: ''
  }

  render() {
    return (
      <>
        <Button disabled={this.props.disabled} variant="outlined" color={'secondary'} onClick={() => this.updateUserEmail()}>
          {`Save`}
        </Button>{' '}
        <span className={'secondary'}>{this.state.errorMessage}</span>{' '}
      </>
    )
  }

  updateUserEmail = async () => {
    // if (this.props.user.email !== this.props.user.email) {
    //   this.props.context.openSnackBar(true, `Confirm your new email from your inbox. (Don't forget to check your spam folder)`, 'message')
    // }
    // console.log('updateUser')
    let updatedUser
    try {
      updatedUser = await this.props.updateUserEmail({
        variables: {
          where: { id: this.props.user.id },
          data: {
            emailChangeRequested: this.props.user.emailChangeRequested
            // isEmailValidated: this.props.user.isEmailValidated
          }
        }
      })
    } catch (e) {
      console.log(e.graphQLErrors)
      if (e.graphQLErrors.length) {
        this.setState({ errorMessage: 'Error: ' + e.graphQLErrors[0].message })
      }
      // this.setState
    }
    if (updatedUser) {
      this.props.changeEditMode()
    }
  }
}

export default compose(
  graphql(UPDATE_USER_EMAIL_MUTATION, {
    name: 'updateUserEmail'
  }),
  // withRouter,
  withContext
  // withApollo
)(UpdateUserEmail)
