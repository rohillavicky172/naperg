import React from 'react'
import { User } from '../../User.type'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
// import User2FAForm from './User2FAForm'
import UseWindowDimensions from '../../../UseWindowDimensions'

type State = {
  isEditMode: boolean
}

type Props = {
  // userQuery: Query,
  context: Context
  user: User
}

class User2FA extends React.Component<Props, State> {
  state = {
    isEditMode: false,
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        {this.state.isEditMode ? (
          <>
            {/* <User2FAForm
            showCancelButton={true}
            updateTextButton={'Save'}
            cancelTextButton={'Cancel'}
            user={this.props.user}
            onUpdate={() => this.setState({ isEditMode: false })}
            onCancel={() => this.setState({ isEditMode: false })}
          /> */}
          </>
        ) : (
          <>
            <div className="tar">
              <Button
                disabled={
                  !(
                    this.props.user.isTwoFactorTotpVerified ||
                    this.props.user.isPhoneValidated ||
                    this.props.user.isEmailValidated
                  )
                }
                color={'primary'}
                variant="outlined"
                size="small"
                onClick={() => this.setState({ isEditMode: true })}>
                {`Edit`}
              </Button>
            </div>
            <>
              <Grid container alignItems="flex-end">
                <Grid item xs={12} md={4} className="bold">
                  {`2-Factor Authentication:`}
                </Grid>

                <Grid item xs={12} md={8}>
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {this.props.user.enabled2FA ? 'ON' : 'OFF'}
                </Grid>
              </Grid>
            </>
          </>
        )}
      </>
    )
  }
}

export default withContext(User2FA)
