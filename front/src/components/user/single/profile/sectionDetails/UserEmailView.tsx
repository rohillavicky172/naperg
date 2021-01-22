import React from 'react'
import IsValidated from './IsValidated'
import { User } from '../../../User.type'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import UseWindowDimensions from '../../../../UseWindowDimensions'
type State = {}

type Props = {
  context: Context
  user: User
}

class UserEmailView extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Email:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.user.email}{' '}
            <IsValidated
              iconNotValidated={'clear'}
              icon={'done'}
              isValidated={this.props.user.isEmailValidated}
              textValidated={'Email Verified'}
              textNotValidated={'Email not Verified'}
            />
          </Grid>
        </Grid>

        {this.props.user.emailChangeRequested && (
          <Grid container>
            <Grid item xs={12} sm={12}>
              <br />
              <span className="secondary">
                {`Pending request:`} {this.props.user.emailChangeRequested}. An email has been sent.
              </span>
            </Grid>{' '}
          </Grid>
        )}
      </>
    )
  }
}

export default withContext(UserEmailView)
