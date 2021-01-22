import React from 'react'
import OnboardingCompanieForm from './OnboardingCompanieForm'
import OnboardingLeadershipForm from './OnboardingLeadershipForm'
import OnboardingConfirmationForm from './OnboardingConfirmationForm'
import OnboardingAddresses from '../addresse/list/OnboardingAddresses'
import UserProfileOnboarding from '../user/single/profile/sectionDetails/UserProfileOnboarding'
import UserSocialForm from '../user/single/profile/sectionDetails/UserSocialForm'
// import { withContext } from '../withContext'
// import { Context } from '../Context.type'
import { Companie } from '../companie/Companie.type'
import { User } from '../user/User.type'
import { LinearProgress } from '@material-ui/core'

// import { withRouter } from 'react-router-dom'
// const queryString = require('query-string')

type Props = {
  user: User
  companie: Companie
}

const OnboardingLogicCompanie = (props: Props) => {
  const [step, setStep] = React.useState(1)
  const maxStep = 7
  const valueLinearProgress = step > maxStep ? 100 : (step / maxStep) * 100
  return (
    <>
      <LinearProgress variant="determinate" value={valueLinearProgress} />
      {step === 1 && (
        <>
          <h3>Your details</h3>
          <p>{`We need to verify your identity to protect you and other NachoNacho users`}</p>
          <UserProfileOnboarding userId={props.user.id} onUpdate={() => setStep(step + 1)} onCancel={() => setStep(step - 1)} />
        </>
      )}
      {step === 2 && (
        <>
          <h3>Social (optional)</h3>
          <p>This will help us verify your identity and approve your application quicker.</p>
          <UserSocialForm
            showCancelButton={true}
            updateTextButton={'Next'}
            cancelTextButton={'Back'}
            user={props.user}
            onUpdate={() => setStep(step + 1)}
            onCancel={() => setStep(step - 1)}
          />
        </>
      )}

      {step === 3 && (
        <>
          <h3>Your Company/Group details</h3>
          <OnboardingCompanieForm
            showCancelButton={true}
            textButton={'Next'}
            textCancelButton={'Back'}
            onUpdate={() => setStep(step + 1)}
            onCancel={() => setStep(step - 1)}
            companie={props.companie}
          />
        </>
      )}
      {step === 4 && (
        <>
          <h3>Business Address</h3>

          <OnboardingAddresses
            type="MAILING"
            onCreate={() => setStep(step + 1)}
            onUpdate={() => setStep(step + 1)}
            onCancel={() => setStep(step - 1)}
            userId={props.user.id}
            companieId={props.companie.id}
            variables={{
              where: {
                companie: {
                  id: props.companie.id,
                },
                type: 'MAILING',
              },
            }}
          />
        </>
      )}

      {step === 5 && (
        <>
          <h3>Beneficial Ownership</h3>
          <div className="tal">
            {`Provide details of one person who owns 25% or more of the Company/Group. If no one owns 25% or more, enter the managing director or controlling person of the Company/Group.`}
          </div>
          <div style={{ height: '20px' }} />
          <OnboardingLeadershipForm
            textButton={'Next'}
            textCancelButton={'Back'}
            onUpdate={() => setStep(step + 1)}
            onCancel={() => setStep(step - 1)}
            companie={props.companie}
          />
        </>
      )}

      {step === 6 && (
        <>
          <h3>Confirmation</h3>

          <OnboardingConfirmationForm
            onUpdate={() => setStep(step + 1)}
            onCancel={() => setStep(step - 1)}
            companie={props.companie}
          />
        </>
      )}
    </>
  )
}

export default OnboardingLogicCompanie
