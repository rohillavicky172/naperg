import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import EmailElement from '../../../auth/EmailElement'
import { withContext } from '../../../../withContext'
import { User } from '../../../User.type'
import { Context } from '../../../../Context.type'
import UpdateUserEmail from '../../action/UpdateUserEmail'
// // import FormControl from '@material-ui/core/FormControl'
// // import InputLabel from '@material-ui/core/InputLabel'
// // import Input from '@material-ui/core/Input'
// import Switch from '@material-ui/core/Switch'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import FormHelperText from '@material-ui/core/FormHelperText'

type State = {
  user: User
  errorMessage: string
  emailChangeRequestedValide: boolean
}

type Props = {
  context: Context

  user: User
  updateUser: any
  changeEditMode: () => void
}

class UserEmailForm extends React.Component<Props, State> {
  state = {
    user: this.props.user,
    errorMessage: '',
    // birthdayErrorMessage: '',
    emailChangeRequestedValide: false,
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.user !== prevProps.user) {
      this.initEmail()
    }
  }
  componentDidMount() {
    this.initEmail()
  }

  initEmail = () => {
    if (!this.props.user.emailChangeRequested) {
      this.setState({
        user: {
          ...this.state.user,
          emailChangeRequested: this.props.user.email,
        },
      })
    }
  }
  render() {
    return (
      <>
        <Grid item xs={12} sm={6}>
          {/* <FormControl>
            <InputLabel htmlFor="emailChangeRequested">{`Email`}</InputLabel>
            <Input
              id="emailChangeRequested"
              error={this.state.errorMessage.length > 0}
              className="inputResponsive"
              onChange={e =>
                this.setState({
                  user: {
                    ...this.state.user,
                    emailChangeRequested: e.target.value
                  }
                })
              }
              type="text"
              value={this.state.user.emailChangeRequested}
            />
            {this.state.errorMessage && <FormHelperText classes={{ root: 'red' }}>{this.state.errorMessage}</FormHelperText>}
          </FormControl> */}

          <EmailElement
            className="width100per"
            // goToLogin={() => {}}
            handleNext={() => {}}
            email={this.state.user.emailChangeRequested ? this.state.user.emailChangeRequested : ''}
            onChange2={(e) => {
              this.setState({
                user: {
                  ...this.state.user,
                  emailChangeRequested: e.email,
                },
                emailChangeRequestedValide: e.inputValidation2,
              })
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <br />
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className="">
            <UpdateUserEmail
              disabled={!this.state.emailChangeRequestedValide}
              user={this.state.user}
              onUpdate={() => this.props.changeEditMode()}
            />

            <Button onClick={() => this.props.changeEditMode()}>{`Cancel`}</Button>
          </div>
        </Grid>
      </>
    )
  }
}

export default withContext(UserEmailForm)
