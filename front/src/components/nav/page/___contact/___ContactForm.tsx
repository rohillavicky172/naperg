import React from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SEND_CONTACT_MESSAGE_MUTATION } from './___GraphQL'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
var validator = require('email-validator')
type State = {
  name: string
  email: string

  website: string
  emailValidate: boolean
  phoneNumber: string
  message: string
  showSuccess: boolean
}

type Props = {
  sendContactMessage: any
  onCancel: () => void
  onSendContactMessage: () => void
  showCancelButton: boolean
  context: Context
  successMessage: string
  showPhoneNumber: Boolean
  showMessage: Boolean
  showWebsite: Boolean
}

class ContactForm extends React.Component<Props, State> {
  state = {
    name: '',
    email: '',
    emailValidate: true,
    message: '',

    website: '',
    phoneNumber: '',
    showSuccess: false,
  }
  componentDidUpdate = (prevProps: Props) => {
    if (this.props.context !== prevProps.context) {
      this.updateMeFields()
    }
  }

  componentDidMount = () => {
    this.updateMeFields()
  }

  updateMeFields = () => {
    if (this.props.context.me.id) {
      this.setState({
        name: this.props.context.me.firstName + ' ' + this.props.context.me.lastName,
        email: this.props.context.me.email,
        message: '',
      })
    }
  }
  // isFormValidated = () => {
  //   console.log(this.state.email.length, this.state.emailValidate)
  //   return !(this.state.email.length && this.state.emailValidate)
  // }

  sendContactMessage = async (e) => {
    e.preventDefault()

    let contactMessage
    try {
      contactMessage = await this.props.sendContactMessage({
        variables: {
          name: this.state.name,
          email: this.state.email,
          url: window.location.href,
          companieId: this.props.context.userRoleCompanie.companie.id,
          message: this.state.message,
          website: this.state.website,
          phoneNumber: this.state.phoneNumber,
        },
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'message')
      throw e
    }
    if (contactMessage) {
      this.props.onSendContactMessage()
      this.setState({
        name: '',
        email: '',

        message: '',
        website: '',
        phoneNumber: '',
        showSuccess: true,
      })
    }
  }

  render() {
    return (
      <div className="">
        <Grid container>
          <Grid item xs={12}>
            {this.state.showSuccess && <span className="blue textSize12">{this.props.successMessage}</span>}
            <div style={{ height: '50px' }} />
          </Grid>
          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="name">{`Your name`}</InputLabel>
              <Input
                disabled={!!this.props.context.me}
                id="name"
                onChange={(e) => this.setState({ name: e.target.value })}
                type="text"
                value={this.state.name}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="name">{`Your email`}</InputLabel>
              <Input
                disabled={!!this.props.context.me}
                id="email"
                error={!this.state.emailValidate}
                onChange={(e) =>
                  this.setState({
                    email: e.target.value,
                    emailValidate: validator.validate(e.target.value),
                  })
                }
                type="text"
                value={this.state.email}
              />
            </FormControl>
          </Grid>
          {this.props.showPhoneNumber && (
            <Grid item xs={12}>
              <FormControl className="width100per">
                <InputLabel htmlFor="phoneNumber">{`Your telephone number`}</InputLabel>
                <Input
                  className="width100per"
                  id="message"
                  multiline
                  onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                  value={this.state.phoneNumber}
                />
              </FormControl>
            </Grid>
          )}

          {this.props.showWebsite && (
            <Grid item xs={12}>
              <FormControl className="width100per">
                <InputLabel htmlFor="website">{`Website`}</InputLabel>
                <Input
                  className="width100per"
                  id="website"
                  onChange={(e) => this.setState({ website: e.target.value })}
                  value={this.state.website}
                />
              </FormControl>
            </Grid>
          )}

          {this.props.showMessage && (
            <Grid item xs={12}>
              <FormControl className="width100per">
                <InputLabel htmlFor="message">{`Your message`}</InputLabel>
                <Input
                  className="width100per"
                  id="message"
                  multiline
                  rowsMax="10"
                  onChange={(e) => this.setState({ message: e.target.value })}
                  value={this.state.message}
                />
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12}>
            <div style={{ height: '50px' }} />
          </Grid>
          <Grid item xs={12}>
            <div className="tac">
              {this.props.showCancelButton && <Button onClick={this.props.onCancel}>{`Cancel`}</Button>}{' '}
              <Button
                color="primary"
                variant="outlined"
                disabled={!(this.state.email.length && this.state.emailValidate)}
                onClick={this.sendContactMessage}
                type="submit">
                {`Send`}
              </Button>
            </div>

            <div style={{ height: '50px' }} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default compose(
  graphql(SEND_CONTACT_MESSAGE_MUTATION, {
    name: 'sendContactMessage',
  }),
  withContext
)(ContactForm)
