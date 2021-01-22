import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { User } from '../../../User.type'
import IsValidated from './IsValidated'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import UseWindowDimensions from '../../../../UseWindowDimensions'

type State = {}

type Props = {
  user: User
  context: Context
}

class UserPhoneView extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Phone:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {this.props.user.phone && (
              <>
                {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                {this.props.user.phoneCode} {this.props.user.phone}
                <IsValidated
                  iconNotValidated={'clear'}
                  icon={'done'}
                  isValidated={this.props.user.isPhoneValidated}
                  textValidated={'Phone Verified'}
                  textNotValidated={'Phone not Verified'}
                />
              </>
            )}
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12}>
            {this.props.user.isPhoneChangeRequestedPending && (
              <span className="secondary">
                {`Verification Pending:`} {this.props.user.phoneCodeChangeRequested} {this.props.user.phoneChangeRequested}
              </span>
            )}
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withContext(UserPhoneView)
