
import React from 'react'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../../nav/ImageTemplate'

import { User } from '../../../User.type'

type State = {}

type Props = {
  user: User
  // userQuery: {
  //   error: string,
  //   loading: string,
  //   user: User
  // },
  // context: Context
}

class UserProfileView extends React.Component<Props, State> {
  render() {
    return (
      <Grid container>
        <Grid item xs={12} sm={12}>
          <ImageTemplate format={'avatar'} nameFile={this.props.user.nameFile} />
        </Grid>
      </Grid>
    )
  }
}

export default UserProfileView
