
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import ResendEmailValidation from './ResendEmailValidation'
import { User } from '../../user/User.type'

type State = {}

type Props = {
  user: User
}

class isEmailValidated extends React.Component<Props, State> {
  render() {
    return (
      <>
        {!this.props.user.isEmailValidated && (
          <div className="paperOut">
            <Paper className="paperIn">
              <p>
                <Icon>error_outline</Icon>{' '}
                {`Your email has not been verified. Please check your email inbox (or perhaps your spam folder)!`}
              </p>
              <ResendEmailValidation user={this.props.user} />
            </Paper>
          </div>
        )}
      </>
    )
  }
}

export default isEmailValidated
