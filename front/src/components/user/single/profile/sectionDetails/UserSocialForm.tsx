import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withContext } from '../../../../withContext'
import utils from '../../../../utils'
import { User } from '../../../User.type'
import { Context } from '../../../../Context.type'
import UpdateUser from '../../action/UpdateUser'

type State = {
  user: User
  errorMessage: string
  // birthdayErrorMessage: string,
  // firstNameValide: boolean,
  // lastNameValide: boolean,
  // last4SocialValide: boolean,

  instagramLinkValide: boolean
  twitterLinkValide: boolean
  linkedInLinkValide: boolean
  facebookLinkValide: boolean
}

type Props = {
  showCancelButton: boolean
  updateTextButton: string
  cancelTextButton: string
  context: Context

  user: User
  updateUser: any
  onUpdate: () => void
  onCancel: () => void
}

class UserProfileForm extends React.Component<Props, State> {
  state = {
    user: this.props.user,
    errorMessage: '',
    // birthdayErrorMessage: '',
    // firstNameValide: true,
    // lastNameValide: true,
    // last4SocialValide: true,

    instagramLinkValide: true,
    twitterLinkValide: true,
    linkedInLinkValide: true,
    facebookLinkValide: true,
  }

  isFormValide = () => {
    return (
      // !this.state.birthdayErrorMessage.length &&
      // this.state.user.firstName.length &&
      // this.state.firstNameValide &&
      // this.state.user.lastName.length &&
      // this.state.lastNameValide &&
      // this.state.user.last4Social &&
      // this.state.user.last4Social.length > 0 &&
      // this.state.last4SocialValide &&
      this.state.instagramLinkValide &&
      this.state.twitterLinkValide &&
      this.state.linkedInLinkValide &&
      this.state.facebookLinkValide
    )
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="linkedInLink">{`LinkedIn profile`}</InputLabel>
            <Input
              id="linkedInLink"
              error={!this.state.linkedInLinkValide}
              onChange={(e) =>
                this.setState({
                  user: {
                    ...this.state.user,
                    linkedInLink: e.target.value,
                  },
                  linkedInLinkValide: utils.isURL(e.target.value) || e.target.value === '',
                })
              }
              type="text"
              value={this.state.user.linkedInLink}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="twitterLink">{`Twitter user handle`}</InputLabel>
            <Input
              id="twitterLink"
              error={!this.state.twitterLinkValide}
              onChange={(e) =>
                this.setState({
                  user: {
                    ...this.state.user,
                    twitterLink: e.target.value,
                  },
                  twitterLinkValide: true,
                })
              }
              type="text"
              value={this.state.user.twitterLink}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="facebookLink">{`Facebook profile`}</InputLabel>
            <Input
              id="facebookLink"
              error={!this.state.facebookLinkValide}
              onChange={(e) =>
                this.setState({
                  user: {
                    ...this.state.user,
                    facebookLink: e.target.value,
                  },
                  facebookLinkValide: utils.isURL(e.target.value) || e.target.value === '',
                })
              }
              type="text"
              value={this.state.user.facebookLink}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl className="width100per">
            <InputLabel htmlFor="instagramLink">{`Instagram profile`}</InputLabel>
            <Input
              id="instagramLink"
              error={!this.state.instagramLinkValide}
              onChange={(e) =>
                this.setState({
                  user: {
                    ...this.state.user,
                    instagramLink: e.target.value,
                  },
                  instagramLinkValide: utils.isURL(e.target.value) || e.target.value === '',
                })
              }
              type="text"
              value={this.state.user.instagramLink}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          <br />
        </Grid>
        <Grid item xs={12} sm={12}>
          <div className="">
            {this.props.showCancelButton && <Button onClick={() => this.props.onCancel()}>{this.props.cancelTextButton}</Button>}{' '}
            <UpdateUser
              disabled={!this.isFormValide()}
              user={this.state.user}
              updateTextButton={this.props.updateTextButton}
              onUpdate={() => this.props.onUpdate()}
            />
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withContext(UserProfileForm)
