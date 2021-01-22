import React from 'react'
// import { flowRight as compose } from 'lodash'
// import LinearProgress from '@material-ui/core/LinearProgress'
// import OnboardingPendingVerification from './OnboardingPendingVerification'
// import { withContext } from '../withContext'
import { Link } from 'react-router-dom'
// import { Context } from '../Context.type'
import { User } from '../user/User.type'
import { Companie } from '../companie/Companie.type'
// import OnboardingLogicPersonal from './OnboardingLogicPersonal'
// import ResendEmailValidation from '../nav/emailValidation/ResendEmailValidation'
import OnboardingLogicCompanie from './OnboardingLogicCompanie'
import OnboardingPendingVerification from './OnboardingPendingVerification'
// import OnboardingLogicCompanieUserCreation from './OnboardingLogicCompanieUserCreation'
// import { History } from '../History.type'

// type State = {
//   step: number
// }

type Props = {
  user: User
  companie: Companie
}

const OnboardingLogic = (props: Props) => {
  // console.log(props.companie.statusApplication)
  return (
    <>
      <div className="tac margin6">
        <Link to={'/'}>
          <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
        </Link>
      </div>
      <div className="tac responsiveMargin2">
        <div className="">
          <h3>Account verification</h3>
        </div>
        {props.companie.statusApplication === 'SUBMITED' && <OnboardingPendingVerification />}
        {props.companie.statusApplication === 'NOT_APPROVED' && (
          <OnboardingLogicCompanie user={props.user} companie={props.companie} />
        )}
        {props.companie.statusApplication === 'APPROVED' && <>Account Approved</>}
      </div>
    </>
  )
}

export default OnboardingLogic
