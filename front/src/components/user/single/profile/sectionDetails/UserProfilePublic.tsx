
import React from 'react'
// import { graphql,  withApollo } from 'react-apollo'; import {flowRight as compose} from 'lodash';
// import { withContext } from '../../../../withContext'
// import { USER_QUERY } from '../../../GraphQL'
// import NotFound from '../../../../nav/error/NotFound'
// import NotAuth from '../../../../nav/error/NotAuth'
// import Loading from '../../../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import { User } from '../../../User.type'
// import { User } from '../../../../user/User.type'
import ImageTemplate from '../../../../nav/ImageTemplate'
import SpoofUser from '../../../../user/single/action/spoofUser/SpoofUser'

type State = {}

type Props = {
  user: User,
  isUserMyself: boolean
}

class UserProfilePublic extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Grid container justify="center" alignItems="center">
          <ImageTemplate format={'bigAvatar'} nameFile={this.props.user.nameFile} />
        </Grid>
        <br />
        <Grid container justify="center" alignItems="center">
          <h3>
            {this.props.user.firstName} {this.props.user.lastName}
          </h3>
          {!this.props.isUserMyself && <SpoofUser user={this.props.user} />}
        </Grid>
      </>
    )
  }
}

export default UserProfilePublic
