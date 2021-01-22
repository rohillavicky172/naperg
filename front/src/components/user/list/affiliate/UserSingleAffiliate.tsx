import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../nav/ImageTemplate'
import { User } from '../../User.type'
import DateComponent from '../../../nav/DateComponent'
import SpoofUser from '../../single/action/spoofUser/SpoofUser'
import AdminResendInvitationInAppResetPassword from '../../single/action/AdminResendInvitationInAppResetPassword'

type Props = {
  user: User
}

const UserSingleAffiliate = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn bgHover">
        <Grid container>
          <Grid item xs={12} sm={2} className="">
            <ImageTemplate format={'avatar'} nameFile={props.user.nameFile} />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <SpoofUser user={props.user} />
            {props.user.firstName} {props.user.lastName}
            <br />
            {props.user.email}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            Created" <DateComponent date={props.user.createdAt} />
            <br />
            Last Login: <DateComponent date={props.user.lastLogin} />
            {!props.user.lastLogin && <AdminResendInvitationInAppResetPassword user={props.user} />}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            {props.user.userRoleCompanies.map((userRoleCompanie) => (
              <div key={userRoleCompanie.id}>
                <Link className="link" to={`/affiliateCompany/${userRoleCompanie.companie.id}`}>
                  {userRoleCompanie.companie.name}
                </Link>
              </div>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default UserSingleAffiliate
