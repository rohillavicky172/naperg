import React from 'react'
import { flowRight as compose } from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import DateComponent from '../../../nav/DateComponent'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Product } from '../../../product/Product.type'
import { User } from '../../User.type'
import { UserRoleCompanie } from '../../../userRoleCompanie/UserRoleCompanie.type'
import RemoveUserFromCompanie from '../../../userRoleCompanie/RemoveUserFromCompanie'
import { Context } from '../../../Context.type'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import TransferOwnership from '../../../userRoleCompanie/TransferOwnership'
import UserRoleCompanieFormCompanieRole from '../../../userRoleCompanie/form/UserRoleCompanieFormCompanieRole'
import ActionSingleCompanieTeam from '../../../companie/single/ActionSingleCompanieTeam'
import { withContext } from '../../../withContext'
import UpdateDateInvitationInCompanie from '../../../companie/single/action/UpdateDateInvitationInCompanie'
import SpoofUser from '../../single/action/spoofUser/SpoofUser'

type State = {
  menu: string
}
type Props = {
  product: Product
  companieId: string
  userRoleCompanie: UserRoleCompanie
  context: Context
  user: User
  // companie: Companie
}

class UserTeamRow extends React.Component<Props, State> {
  state = {
    menu: '',
  }
  onSelectMenu = (menu: string) => {
    this.setState({ menu })
  }

  onCancel = () => {
    this.setState({ menu: '' })
  }
  render() {
    const isUserMyself = this.props.context.me.id === this.props.user.id

    const isInvitationExpired = new Date(this.props.user.resetPasswordExpires) < new Date() && !this.props.user.lastLogin

    const showResendInvitation =
      new Date(this.props.user.userRoleCompanies[0].lastDateInvitationSent) < new Date(Date.now() - 2 * 1000 * 60 * 60 * 24)
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn bgHover">
            <Grid container>
              <Grid item xs={10} sm={11} className="">
                <Grid container>
                  <Grid item xs={12} sm={1} className="marginAuto">
                    <ImageTemplate format={'avatar'} nameFile={this.props.user.nameFile} />
                  </Grid>
                  <Grid item xs={12} sm={4} className="marginAuto">
                    {this.props.user.userRoleCompanies[0].isInvitationApproved ? (
                      <>
                        <div>
                          <Link className="link" to={'/user/' + this.props.user.id}>
                            <span className={isUserMyself ? 'secondary' : ''}>
                              {this.props.user.firstName} {this.props.user.lastName}
                            </span>
                          </Link>
                        </div>
                        <div>
                          <DateComponent date={this.props.user.userRoleCompanies[0].createdAt} />
                        </div>
                      </>
                    ) : (
                      <>
                        {isInvitationExpired ? (
                          <div>
                            <div>{`Invitation expired`}</div>
                            <div>
                              {this.props.context.userRoleCompanie.permissions.includes('canAddUserInCompanie') && (
                                <UpdateDateInvitationInCompanie
                                  disabled={!showResendInvitation}
                                  buttonText={showResendInvitation ? `Resend invitation` : `Invitation sent`}
                                  userId={this.props.user.id}
                                  userRoleCompanieId={this.props.user.userRoleCompanies[0].id}
                                />
                              )}
                            </div>
                          </div>
                        ) : (
                          <>
                            <div>{`Invitation Pending`}</div>

                            <div>
                              {this.props.context.userRoleCompanie.permissions.includes('canAddUserInCompanie') && (
                                <UpdateDateInvitationInCompanie
                                  disabled={!showResendInvitation}
                                  buttonText={showResendInvitation ? `Resend invitation` : `Invitation sent`}
                                  userId={this.props.user.id}
                                  userRoleCompanieId={this.props.user.userRoleCompanies[0].id}
                                />
                              )}
                            </div>
                          </>
                        )}
                      </>
                    )}
                    <SpoofUser user={this.props.user} />
                  </Grid>
                  <Grid item xs={12} sm={4} className="marginAuto">
                    {this.props.user.email}
                  </Grid>
                  <Grid item xs={12} sm={2} className="marginAuto">
                    {this.props.user.userRoleCompanies[0].companieRole}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} sm={1} className="">
                {/* {(!isUserMyself ) && ( */}
                <>
                  {/* {(this.props.context.userRoleCompanie.permissions.includes('canSeeDetailsUserInCompanie') || isUserMyself) &&
                    (this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyIssuedCards') ||
                      this.props.user.userRoleCompanies[0].permissions.includes('canSeeMySubscriptions') ||
                      this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyInvoices')) && ( */}
                  <>
                    <ActionSingleCompanieTeam
                      isUserMyself={isUserMyself}
                      isInvitationExpired={isInvitationExpired}
                      user={this.props.user}
                      onSelectMenu={this.onSelectMenu}
                    />
                  </>
                  {/* )} */}
                </>
                {/* )} */}
              </Grid>

              <Grid container>
                <Grid item xs={12} className="marginAuto">
                  {this.state.menu === 'role' && (
                    <UserRoleCompanieFormCompanieRole
                      onUpdated={this.onCancel}
                      onCancel={this.onCancel}
                      userRoleCompanie={this.props.user.userRoleCompanies[0]}
                    />
                  )}
                  {this.state.menu === 'removeUserFromCompanie' && (
                    <RemoveUserFromCompanie
                      text={`This user will lose access to their company account. All their NachoCards, Subscriptions and Transactions will still be visible to you. Are you sure you want to remove this user?`}
                      onCancel={this.onCancel}
                      userRoleCompanie={this.props.user.userRoleCompanies[0]}
                    />
                  )}
                  {this.state.menu === 'transferOwnership' && (
                    <TransferOwnership
                      user={this.props.user}
                      onCancel={this.onCancel}
                      userRoleCompanie={this.props.user.userRoleCompanies[0]}
                      companieId={this.props.companieId}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </>
    )
  }
}

export default compose(withRouter, withContext)(UserTeamRow)
