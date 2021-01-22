
import React from 'react'
import OnboardingConfirmationForm from './OnboardingConfirmationForm'
import OnboardingAddresses from '../addresse/list/OnboardingAddresses'
import UserProfileOnboarding from '../user/single/profile/sectionDetails/UserProfileOnboarding'
import UserSocialForm from '../user/single/profile/sectionDetails/UserSocialForm'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Companie } from '../companie/Companie.type'
import { User } from '../user/User.type'
// import OnboardingCompanieForm from './OnboardingCompanieForm'
// import OnboardingLeadershipForm from './OnboardingLeadershipForm'
// import { withRouter } from 'react-router-dom'
// const queryString = require('query-string')

type State = {
  step: number,
  totalStep: number
}

type Props = {
  user: User,
  step: number,
  nextStep: () => void,
  previousStep: () => void,
  companie: Companie,
  context: Context
}

class OnboardingLogicPersonal extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.step === 1 && (
          <>
            <h3>{`Your details`}</h3>
            <p>{`We need to verify your identity to protect you and other NachoNacho users`}</p>
            <UserProfileOnboarding
              userId={this.props.context.me.id}
              onUpdate={() => this.props.nextStep()}
              onCancel={() => this.props.previousStep()}
            />
          </>
        )}

        {this.props.step === 2 && (
          <>
            <h3>Social (optional)</h3>
            <p>This will help us verify your identity and approve your application quicker.</p>
            <UserSocialForm
              showCancelButton={true}
              updateTextButton={'Next'}
              cancelTextButton={'Back'}
              user={this.props.user}
              onUpdate={() => this.props.nextStep()}
              onCancel={() => this.props.previousStep()}
            />
          </>
        )}

        {this.props.step === 3 && (
          <>
            <h3>Home Address</h3>
            <OnboardingAddresses
              type="MAILING"
              onCreate={() => this.props.nextStep()}
              onUpdate={() => this.props.nextStep()}
              onCancel={() => this.props.previousStep()}
              userId={this.props.context.me.id}
              companieId={this.props.companie.id}
              variables={{
                where: {
                  companie: {
                    id: this.props.companie.id
                  },
                  type: 'MAILING'
                }
              }}
            />
          </>
        )}
        {this.props.step === 4 && (
          <>
            <h3>{`Confirmation`}</h3>

            <OnboardingConfirmationForm
              onUpdate={() => this.props.nextStep()}
              onCancel={() => this.props.previousStep()}
              companie={this.props.companie}
            />
          </>
        )}
      </>
    )
  }
}

export default withContext(OnboardingLogicPersonal)
