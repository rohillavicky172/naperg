import React from 'react'
import { Companie } from '../companie/Companie.type'
import Button from '@material-ui/core/Button'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import SubmitApplication from '../companie/form/SubmitApplication'

type State = {
  companie: Companie
  companieNameValidate: boolean
}
type Props = {
  context: Context
  onCancel: () => void
  onUpdate: () => void

  companie: Companie
}

class OnboardingCompanieForm extends React.Component<Props, State> {
  state = {
    companie: this.props.companie,
    companieNameValidate: true,
  }

  render() {
    return (
      <>
        <div>
          <p className="tal">
            {this.props.context.userRoleCompanie.companie.isPersonal ? (
              <span>
                {`By submitting this application to NachoNacho, you confirm that the information provided is complete and accurate.`}
              </span>
            ) : (
              <span>
                {`By submitting this application to NachoNacho, you confirm that you are authorized to create this account and the information provided is complete and accurate.`}
              </span>
            )}
          </p>
        </div>

        <div style={{ height: '20px' }} />

        <div>
          <Button onClick={this.props.onCancel}>Back</Button>{' '}
          <SubmitApplication
            onUpdate={() => this.props.onUpdate()}
            onCancel={() => this.props.onCancel()}
            companie={this.state.companie}
          />
        </div>
      </>
    )
  }
}

export default withContext(OnboardingCompanieForm)
