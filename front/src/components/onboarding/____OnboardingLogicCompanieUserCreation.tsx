import React from 'react'
import OnboardingCompanieForm from './OnboardingCompanieForm'
import OnboardingLeadershipForm from './OnboardingLeadershipForm'
import OnboardingConfirmationForm from './OnboardingConfirmationForm'
import OnboardingAddresses from '../addresse/list/OnboardingAddresses'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Companie } from '../companie/Companie.type'
import { User } from '../user/User.type'

// import { withRouter } from 'react-router-dom'
// const queryString = require('query-string')

type State = {
  step: number
  totalStep: number
}

type Props = {
  user: User
  step: number
  nextStep: () => void
  previousStep: () => void
  companie: Companie
  context: Context
}

class OnboardingLogicCompanieUserCreation extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.step === 1 && (
          <>
            <h3>Your Company/Group details</h3>
            <OnboardingCompanieForm
              showCancelButton={false}
              textButton={'Next'}
              textCancelButton={'Back'}
              onUpdate={() => this.props.nextStep()}
              onCancel={() => this.props.previousStep()}
              companie={this.props.companie}
            />
          </>
        )}
        {this.props.step === 2 && (
          <>
            <h3>Business Address</h3>
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
                    id: this.props.companie.id,
                  },
                  type: 'MAILING',
                },
              }}
            />
          </>
        )}

        {this.props.step === 3 && (
          <>
            <h3>Beneficial Ownership</h3>
            <div className="tal">
              {`Provide details of one person who owns 25% or more of the Company/Group. If no one owns 25% or more, enter the managing director or controlling person of the Company/Group.`}
            </div>
            <div style={{ height: '20px' }} />
            <OnboardingLeadershipForm
              textButton={'Next'}
              textCancelButton={'Back'}
              onUpdate={() => this.props.nextStep()}
              onCancel={() => this.props.previousStep()}
              companie={this.props.companie}
            />
          </>
        )}

        {this.props.step === 4 && (
          <>
            <h3>Confirmation</h3>

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

export default withContext(OnboardingLogicCompanieUserCreation)
