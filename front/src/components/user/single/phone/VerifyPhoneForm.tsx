import React from 'react'
import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../../withContext'
import { User } from '../../User.type'
import { Context } from '../../../Context.type'
import UseWindowDimensions from '../../../UseWindowDimensions'

type State = {
  // user: User,
  num1: string
  num2: string
  num3: string
  num4: string
  num5: string
  num6: string

  errorMessage: string
}

type Props = {
  context: Context
  user: User
  // onCancel: () => void,
  onVerify: (phoneValidationToken: string) => void
  // onChange: (user: User) => void
}

// enum NumCase {
//   num1,
//   num2
//   // num1 = 'num1',
//   // num2 = 'num2',
//   // num3 = 'num3',
//   // num4 = 'num4',
//   // num5 = 'num5',
//   // num6 = 'num6'
// }

class VerifyPhoneForm extends React.Component<Props, State> {
  state = {
    // user: this.props.user,
    errorMessage: '',
    num1: '',
    num2: '',
    num3: '',
    num4: '',
    num5: '',
    num6: '',
  }

  refNum1: any = {}
  refNum2: any = {}
  refNum3: any = {}
  refNum4: any = {}
  refNum5: any = {}
  refNum6: any = {}

  // onChange={e =>
  //   this.props.onChange({
  //     ...this.props.user,
  //     phoneValidationToken: e.target.value
  //   })
  // }
  componentDidMount = () => {
    this.refNum1.focus()
  }
  onPaste = (code) => {
    console.log(code.length)
    if (code.length !== 6 || !Number(code)) {
      this.setState({
        errorMessage: 'Wrong code',
        num1: '',
        num2: '',
        num3: '',
        num4: '',
        num5: '',
        num6: '',
      })
      return true
    }

    this.refNum6.focus()
    this.setState({
      errorMessage: '',
      num1: code[0],
      num2: code[1],
      num3: code[2],
      num4: code[3],
      num5: code[4],
      num6: code[5],
    })
    this.props.onVerify(code)
  }

  onVerify = () => {
    if (this.state.num1 && this.state.num2 && this.state.num3 && this.state.num4 && this.state.num5 && this.state.num6) {
      this.props.onVerify(
        this.state.num1 + this.state.num2 + this.state.num3 + this.state.num4 + this.state.num5 + this.state.num6
      )
    }
  }

  onChange = (e: any, label: string, nextRef: string) => {
    // const label = 'num1'
    // const nextRef = 'refNum2'
    if ((e.target.value < 10 && e.target.value >= 0) || e.target.value === '') {
      if (label === 'num1') {
        this.setState({ num1: e.target.value }, () => {
          this.onVerify()
        })
      }
      if (label === 'num2') {
        this.setState({ num2: e.target.value }, () => {
          this.onVerify()
        })
      }
      if (label === 'num3') {
        this.setState({ num3: e.target.value }, () => {
          this.onVerify()
        })
      }
      if (label === 'num4') {
        this.setState({ num4: e.target.value }, () => {
          this.onVerify()
        })
      }
      if (label === 'num5') {
        this.setState({ num5: e.target.value }, () => {
          this.onVerify()
        })
      }
      if (label === 'num6') {
        this.setState({ num6: e.target.value }, () => {
          this.onVerify()
        })
      }
    }
    if (e.target.value < 10 && e.target.value >= 0 && e.target.value !== '') {
      if (nextRef === 'refNum1') {
        this.refNum1.focus()
      }
      if (nextRef === 'refNum2') {
        this.refNum2.focus()
      }
      if (nextRef === 'refNum3') {
        this.refNum3.focus()
      }
      if (nextRef === 'refNum4') {
        this.refNum4.focus()
      }
      if (nextRef === 'refNum5') {
        this.refNum5.focus()
      }
      if (nextRef === 'refNum6') {
        this.refNum6.focus()
      }
    }
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <Grid container spacing={isMobile ? 1 : 2}>
          {/* <Grid item xs={4} sm={2}>
            <FormControl variant="outlined">
               <OutlinedInput          classes={{ input: 'tac' }}
                id="phoneValidationToken"
                onChange={e =>
                  this.props.onChange({
                    ...this.props.user,
                    phoneValidationToken: e.target.value
                  })
                }
                type="number"
                value={this.props.user.phoneValidationToken ? this.props.user.phoneValidationToken : ''}
              />
            </FormControl>
          </Grid> */}

          <Grid item xs={4} sm={2}>
            <FormControl variant="outlined">
              <OutlinedInput
                onPaste={(e) => this.onPaste(e.clipboardData.getData('Text'))}
                name="num1"
                labelWidth={0}
                inputProps={{
                  autoComplete: 'num-phone-verification',
                }}
                classes={{ input: 'tac' }}
                id="num1"
                type="number"
                inputRef={(input) => (this.refNum1 = input)}
                value={this.state.num1}
                onChange={(e) => this.onChange(e, 'num1', 'refNum2')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl variant="outlined">
              <OutlinedInput
                classes={{ input: 'tac' }}
                id="num2"
                labelWidth={0}
                inputProps={{
                  autoComplete: 'num-phone-verification',
                }}
                type="number"
                inputRef={(input) => (this.refNum2 = input)}
                value={this.state.num2}
                onChange={(e) => this.onChange(e, 'num2', 'refNum3')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl variant="outlined">
              <OutlinedInput
                classes={{ input: 'tac' }}
                id="num3"
                labelWidth={0}
                inputProps={{
                  autoComplete: 'num-phone-verification',
                }}
                type="number"
                inputRef={(input) => (this.refNum3 = input)}
                value={this.state.num3}
                onChange={(e) => this.onChange(e, 'num3', 'refNum4')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl variant="outlined">
              <OutlinedInput
                classes={{ input: 'tac' }}
                id="num4"
                labelWidth={0}
                inputProps={{
                  autoComplete: 'num-phone-verification',
                }}
                type="number"
                inputRef={(input) => (this.refNum4 = input)}
                value={this.state.num4}
                onChange={(e) => this.onChange(e, 'num4', 'refNum5')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl variant="outlined">
              <OutlinedInput
                classes={{ input: 'tac' }}
                id="num5"
                labelWidth={0}
                inputProps={{
                  autoComplete: 'num-phone-verification',
                }}
                type="number"
                inputRef={(input) => (this.refNum5 = input)}
                value={this.state.num5}
                onChange={(e) => this.onChange(e, 'num5', 'refNum6')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4} sm={2}>
            <FormControl variant="outlined">
              <OutlinedInput
                classes={{ input: 'tac' }}
                id="num6"
                labelWidth={0}
                inputProps={{
                  autoComplete: 'num-phone-verification',
                }}
                type="number"
                inputRef={(input) => (this.refNum6 = input)}
                value={this.state.num6}
                onChange={(e) => this.onChange(e, 'num6', 'refNum7')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className="secondary">
            {this.state.errorMessage}
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withContext(VerifyPhoneForm)
