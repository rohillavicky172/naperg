import React from 'react'
import { flowRight as compose } from 'lodash'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../../withContext'
import ImageTemplate from '../../../nav/ImageTemplate'
import { User } from '../../User.type'
import DateComponent from '../../../nav/DateComponent'
// import Icon from '@material-ui/core/Icon'
// import Tooltip from '@material-ui/core/Tooltip'
// import CompanieKPI from '../../../companie/single/CompanieKPI'
// import DeleteUser from '../single/action/DeleteUser'
// import SpoofUserAsAdmin from '../single/action/spoofUser/SpoofUserAsAdmin'
// import SpoofUser from '../../single/action/spoofUser/SpoofUser'
// import CompanieForm from '../../../companie/form/CompanieForm'
// import SeeUserAsAdmin from '../single/action/spoofUser/SeeUserAsAdmin'
// import { Link } from 'react-router-dom'

type State = {}

type Props = {
  user: User
  // first: number,
  // client: any,
  // history: any,
  // usersQueryConnection: any,
  // elemClicked: (user: User) => void
}

class UserSingleList extends React.Component<Props, State> {
  render() {
    // console.log(this.props.user.userRoleCompanies)
    return (
      <div className="paperOut">
        <Paper className="paperIn bgHover">
          <Grid container>
            <Grid item xs={12} sm={2} className="">
              <ImageTemplate format={'avatar'} nameFile={this.props.user.nameFile} />
            </Grid>
            <Grid item xs={12} sm={4} className="">
              {this.props.user.firstName} {this.props.user.lastName}
            </Grid>
            <Grid item xs={12} sm={4} className="">
              {this.props.user.email}
            </Grid>

            <Grid item xs={12} sm={2} className="">
              created: <DateComponent date={this.props.user.createdAt} />
              <br />
              latest loggedin: <DateComponent date={this.props.user.lastLogin} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default compose(withContext)(UserSingleList)
