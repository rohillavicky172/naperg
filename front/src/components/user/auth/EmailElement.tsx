import React from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { USER_EXISTS_BY_EMAIL_QUERY } from '../GraphQL'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
const validator = require('email-validator')

type State = {
  inputValidation2: boolean
  hideErrorsTexts: boolean
  isEmailAlreadyExists: boolean
  isEmailValidated: boolean
  email: string
}

type Props = {
  className: string
  onChange2: (e: any) => void
  handleNext: () => void
  // goToLogin: () => void,
  // onFocusField: () => void,
  // activeStep: boolean,
  email: string
  client: any
}

class EmailElement extends React.Component<Props, State> {
  state = {
    hideErrorsTexts: false,
    inputValidation2: true,
    email: '',
    isEmailAlreadyExists: false,
    isEmailValidated: false
  }

  validateEmail(email) {
    return validator.validate(email)
  }

  onChange = async (e: any) => {
    let email = e.target.value
    this.setState({ email })
    this.props.onChange2({ ...this.state, email })
    let inputValidation2 = false
    let isEmailAlreadyExists = false
    let isEmailValidated = this.validateEmail(email)

    if (isEmailValidated) {
      let user
      try {
        user = await this.getUser(email)
      } catch (e) {
        isEmailAlreadyExists = false
      }

      if (user) {
        isEmailAlreadyExists = true
      }
      inputValidation2 = !isEmailAlreadyExists
    }

    this.setState(
      {
        isEmailValidated: isEmailValidated,
        hideErrorsTexts: true,
        isEmailAlreadyExists: isEmailAlreadyExists,
        inputValidation2: inputValidation2
      },
      () => {
        this.props.onChange2(this.state)
      }
    )
  }

  handleNext = async () => {
    this.props.handleNext()
  }
  // onFocus = async () => {
  //   this.props.onFocusField()
  // }

  getUser = async (email: string) => {
    let user
    try {
      user = await this.props.client.query({
        query: USER_EXISTS_BY_EMAIL_QUERY,
        variables: {
          email: email
        }
      })
    } catch (e) {
      throw e
    }
    if (user && user.data && user.data.userExistsByEmailQuery) {
      return user.data.userExistsByEmailQuery
    }
  }

  handleKey = (data: any) => {
    if (data.charCode === 13) {
      //keyPress enter
      this.setState({ hideErrorsTexts: false })
      this.handleNext()
    }
  }

  render() {
    return (
      <>
        <FormControl className={this.props.className}>
          <InputLabel htmlFor="email">{`Email address`}</InputLabel>
          <Input
            id="email"
            onChange={this.onChange.bind(this)}
            value={this.props.email}
            error={!this.state.inputValidation2}
            // onFocus={this.onFocus}
            type="text"
            // inputRef={node => (this.input2 = node)}
            onKeyPress={this.handleKey}
          />
          {this.state.email.length > 0 && (
            <>
              {this.state.isEmailAlreadyExists && (
                <FormHelperText error>
                  {`Email already exists`}
                  {/* <span className="cursor blue" onClick={this.props.goToLogin}>
                    {' '}
                    {`Please log in.`}
                  </span> */}
                </FormHelperText>
              )}
            </>
          )}
        </FormControl>
      </>
    )
  }
}

export default compose(withApollo)(EmailElement)
