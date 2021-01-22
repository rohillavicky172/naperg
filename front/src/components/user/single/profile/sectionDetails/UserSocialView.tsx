import React from 'react'
import Grid from '@material-ui/core/Grid'
import { User } from '../../../User.type'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import Icon from '@material-ui/core/Icon'
import UseWindowDimensions from '../../../../UseWindowDimensions'
type State = {}

type Props = {
  user: User

  context: Context
}

class UserSocialView extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`LinkedIn profile:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.user.linkedInLink}
          </Grid>
        </Grid>

        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Twitter user handle:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.user.twitterLink}
          </Grid>
        </Grid>

        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Facebook profile:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.user.facebookLink}
          </Grid>
        </Grid>

        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Instagram profile:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.user.instagramLink}
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withContext(UserSocialView)
