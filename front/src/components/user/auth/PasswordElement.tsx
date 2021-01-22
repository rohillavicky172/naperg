
import React from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'

type State = {
  inputValidation: boolean,
  isPasswordLongEnough: boolean,
  hasLowerCase: boolean,
  hasUpperCase: boolean,
  hasNumber: boolean,
  hasSpecialChar: boolean,
  password: string,
  passwordMinimumLength: number
}

type Props = {
  onChange: (e: any) => void,
  // onFocusField: () => void,
  handleNext: () => any,
  className: string,
  label: string,
  // activeStep: boolean,
  password: string
}

export default class PasswordElement extends React.Component<Props, State> {
  state = {
    inputValidation: true,
    isPasswordLongEnough: true,
    hasLowerCase: true,
    hasUpperCase: true,
    hasNumber: true,
    hasSpecialChar: true,
    password: '',
    passwordMinimumLength: 6
  }

  // componentDidUpdate(prevProps: Props) {
  //   if (this.props.activeStep !== prevProps.activeStep) {
  //     if (this.props.activeStep) {
  //       this.input2.focus()
  //     }
  //   }
  // }
  // input2: any

  onChange(e: any) {
    let inputValidation = false
    if (
      this.isPasswordLongEnough(e.target.value) &&
      this.hasLowerCase(e.target.value) &&
      this.hasUpperCase(e.target.value) &&
      this.hasNumber(e.target.value) &&
      this.hasSpecialChar(e.target.value)
    ) {
      inputValidation = true
    }

    this.setState(
      {
        password: e.target.value,
        inputValidation: inputValidation,
        hasNumber: this.hasNumber(e.target.value),
        hasSpecialChar: this.hasSpecialChar(e.target.value),
        hasUpperCase: this.hasUpperCase(e.target.value),
        hasLowerCase: this.hasLowerCase(e.target.value),
        isPasswordLongEnough: this.isPasswordLongEnough(e.target.value)
      },
      () => {
        this.props.onChange(this.state)
      }
    )
  }

  hasLowerCase(str: string) {
    return str.toUpperCase() !== str
  }
  hasUpperCase(str: string) {
    return str.toLowerCase() !== str
  }
  hasNumber(string: string) {
    return /\d/.test(string)
  }

  hasSpecialChar(str: string) {
    var format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/
    if (format.test(str)) {
      return true
    } else {
      return false
    }
  }

  isPasswordLongEnough(password: string) {
    if (password.length >= this.state.passwordMinimumLength) {
      this.setState({ isPasswordLongEnough: true })
      return true
    }
    this.setState({ isPasswordLongEnough: false })
    return false
  }

  handleNext = async () => {
    this.props.handleNext()
  }

  handleKey = (data: any) => {
    if (data.charCode === 13) {
      //keyPress enter
      this.handleNext()
    }
  }

  onFocus = async () => {
    // this.props.onFocusField()
  }
  render() {
    return (
      <>
        <FormControl className={this.props.className}>
          <InputLabel htmlFor="password">{this.props.label}</InputLabel>
          <Input
            id="password"
            className=""
            value={this.props.password}
            error={!this.state.inputValidation}
            onFocus={this.onFocus}
            onChange={this.onChange.bind(this)}
            type="password"
            onKeyPress={this.handleKey}
          />

          {!this.state.isPasswordLongEnough && (
            <FormHelperText classes={{ root: 'red' }}>
              {`At least ${this.state.passwordMinimumLength} characters long`}
            </FormHelperText>
          )}
          {!this.state.hasLowerCase && (
            <FormHelperText classes={{ root: 'red' }}>{`At least a lower case letter`}</FormHelperText>
          )}
          {!this.state.hasUpperCase && (
            <FormHelperText classes={{ root: 'red' }}>{`At least an upper case letter`}</FormHelperText>
          )}
          {!this.state.hasNumber && <FormHelperText classes={{ root: 'red' }}>{`At least one number`}</FormHelperText>}
          {!this.state.hasSpecialChar && (
            <FormHelperText classes={{ root: 'red' }}>{`At least one special character`}</FormHelperText>
          )}
        </FormControl>
      </>
    )
  }
}
