import React from 'react'
import { flowRight as compose } from 'lodash'
import { withContext } from '../withContext'
import { withRouter, Link } from 'react-router-dom'
import { Context } from '../Context.type'
import { User } from '../user/User.type'
import { Companie } from '../companie/Companie.type'
import ResendEmailValidation from '../nav/emailValidation/ResendEmailValidation'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { History } from '../History.type'
// import OnboardingPendingVerification from './OnboardingPendingVerification'
// import LinearProgress from '@material-ui/core/LinearProgress'
// import PhoneLogic from '../user/single/phone/PhoneLogic'
// import OnboardingLogicPersonal from './OnboardingLogicPersonal'
// import OnboardingLogicCompanie from './OnboardingLogicCompanie'
// import OnboardingLogicCompanieUserCreation from './OnboardingLogicCompanieUserCreation'
// import MenuLeftDesktop from '../nav/header/topLeft/MenuLeftDesktop'

type State = {
  step: number
}

type Props = {
  history: History
  user: User
  companie: Companie
  context: Context
}

class OnboardingValidateEmail extends React.Component<Props, State> {
  render() {
    // const mode = this.getMode()
    // const valueLinearProgress = this.state.step > mode.step ? 100 : (this.state.step / mode.step) * 100
    return (
      <>
        <Grid container>
          <Grid item xs={6} className="tal"></Grid>
          <Grid item xs={6} className="tar">
            <IconButton
              onClick={() => {
                this.props.context.logout()
                this.props.history.push('/?mode=LOGOUT')
              }}>
              <Icon>clear</Icon>
            </IconButton>
          </Grid>
        </Grid>

        <div className="tac margin6">
          <Link to={'/'}>
            <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
          </Link>
        </div>
        <div className="tac responsiveMargin2">
          <div className="">
            <h3>Account verification</h3>
            {/* <LinearProgress variant="determinate" value={valueLinearProgress} /> */}
          </div>

          <>
            <h3>{`Confirm your email address`}</h3>
            <p>
              {`
        We sent an email to ${this.props.user.email}. 
        Please check your inbox and find the confirmation email we've sent you. Don't forget to check your SPAM folder!`}
            </p>
            <ResendEmailValidation user={this.props.user} />
          </>
        </div>
      </>
    )
  }
}

export default compose(withRouter, withContext)(OnboardingValidateEmail)
