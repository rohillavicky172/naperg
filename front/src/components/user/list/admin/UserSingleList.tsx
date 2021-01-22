import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImageTemplate from '../../../nav/ImageTemplate'
import CompanieKPI from '../../../companie/single/CompanieKPI'
import IsValidated from '../../single/profile/sectionDetails/IsValidated'
import { User } from '../../User.type'
import DateComponent from '../../../nav/DateComponent'
import SpoofUser from '../../single/action/spoofUser/SpoofUser'
import AdminResendInvitationInAppResetPassword from '../../single/action/AdminResendInvitationInAppResetPassword'
import { Link } from 'react-router-dom'
import IsDeletedLogically from '../../../nav/IsDeletedLogically'
import UpdateDateInvitationInCompanie from '../../../companie/single/action/UpdateDateInvitationInCompanie'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'

type State = {}

type Props = {
  user: User
}

class UserSingleList extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn bgHover">
          <Grid container>
            <Grid item xs={12} sm={3} className="">
              <SpoofUser user={this.props.user} />
              <Link className="link" to={`/settings/${this.props.user.id}?mode=profileAdmin`}>
                {this.props.user.firstName} {this.props.user.lastName}
              </Link>{' '}
              <IsValidated
                iconNotValidated={'phone_disabled'}
                icon={'phone'}
                isValidated={this.props.user.isPhoneValidated}
                textValidated={'Phone Verified'}
                textNotValidated={'Phone not Verified'}
              />
              <IsValidated
                iconNotValidated={'cancel_presentation'}
                icon={'mail'}
                isValidated={this.props.user.isEmailValidated}
                textValidated={'Email Verified'}
                textNotValidated={'Email not Verified'}
              />
              <br />
              <Link className="link" to={`/settings/${this.props.user.id}?mode=profileAdmin`}>
                {this.props.user.email}
              </Link>{' '}
              <Link className="link" to={'/logs?type=postmark&message=' + this.props.user.email}>
                <Tooltip title={'Logs for Email: ' + this.props.user.email}>
                  <Icon className="textSize11 iconAlignTextBottom">history</Icon>
                </Tooltip>
              </Link>
            </Grid>
            <Grid item xs={12} sm={2} className="">
              <div>role: {this.props.user.role}</div>
              <div>signupType: {this.props.user.signupType}</div>
              <div>verificationStatus: {this.props.user.verificationStatus}</div>

              {this.props.user.invitedBy && (
                <div>
                  {`Inviter: `}
                  <Link className="link" to={'/user/' + this.props.user.invitedBy.id}>
                    {this.props.user.invitedBy.firstName} {this.props.user.invitedBy.lastName}
                  </Link>
                </div>
              )}
              <div>
                {this.props.user.invitedByCompanie && (
                  <>
                    {`Company Inviter: `}
                    <Link className="link" to={'/company/' + this.props.user.invitedByCompanie.id}>
                      {this.props.user.invitedByCompanie.name}
                    </Link>
                  </>
                )}
              </div>
            </Grid>

            <Grid item xs={12} sm={3} className="">
              created: <DateComponent date={this.props.user.createdAt} />
              <br />
              latest connection: <DateComponent date={this.props.user.lastLogin} />
              {!this.props.user.lastLogin && <AdminResendInvitationInAppResetPassword user={this.props.user} />}
            </Grid>

            <Grid item xs={12} sm={3} className="">
              {this.props.user.userRoleCompanies &&
                this.props.user.userRoleCompanies.map((userRoleCompanie) => (
                  <div key={userRoleCompanie.id}>
                    <IsValidated
                      iconNotValidated={'clear'}
                      icon={'message'}
                      isValidated={userRoleCompanie.isInvitationApproved}
                      textValidated={'Invitation accepted'}
                      textNotValidated={'Invitation not accepted'}
                    />
                    <IsValidated
                      iconNotValidated={'clear'}
                      icon={'done'}
                      isValidated={userRoleCompanie.companie.isVerified}
                      textValidated={'Company Verified'}
                      textNotValidated={'Company not Verified'}
                    />
                    <Link
                      className="link"
                      to={'/userRoleCompanie?companieId=' + userRoleCompanie.companie.id + '&userId=' + this.props.user.id}>
                      <Tooltip title={`User Role companie for ${this.props.user.firstName} in ${userRoleCompanie.companie.name}`}>
                        <Icon className="textSize11 iconAlignTextBottom">accessibility_new</Icon>
                      </Tooltip>
                    </Link>
                    <Link className="link" to={`/company/${userRoleCompanie.companie.id}?mode=admin`}>
                      {userRoleCompanie.companie.name}
                    </Link>
                    <IsValidated
                      iconNotValidated={'school'}
                      icon={'security'}
                      isValidated={userRoleCompanie.companie.isTrustedPayment}
                      textValidated={'Trusted'}
                      textNotValidated={'Not Trusted'}
                    />
                    {userRoleCompanie.companie.deletedLogically && <IsDeletedLogically title={'Company deleted'} />}
                    <CompanieKPI
                      companieId={userRoleCompanie.companie.id}
                      users={userRoleCompanie.companie.userRoleCompanies.length}
                      invoices={userRoleCompanie.companie.invoices.length}
                      issuedCards={userRoleCompanie.companie.issuedCards.length}
                      payments={userRoleCompanie.companie.sources.length}
                      subscriptions={userRoleCompanie.companie.subscriptions.length}
                    />{' '}
                    {userRoleCompanie.companie.typeCompanie}/{userRoleCompanie.companieRole}
                    {!userRoleCompanie.isInvitationApproved && (
                      <>
                        <UpdateDateInvitationInCompanie
                          disabled={false}
                          buttonText={`Resend invitation to join company`}
                          userId={this.props.user.id}
                          userRoleCompanieId={userRoleCompanie.id}
                        />
                      </>
                    )}
                  </div>
                ))}
            </Grid>
            <Grid item xs={12} sm={1} className="">
              <ImageTemplate format={'avatar'} nameFile={this.props.user.nameFile} />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default UserSingleList
