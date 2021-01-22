import React from 'react'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Product } from '../../../product/Product.type'
import { User } from '../../User.type'
import { Context } from '../../../Context.type'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import { withContext } from '../../../withContext'
import SpoofUser from '../../single/action/spoofUser/SpoofUser'
import RemoveUserFromCompanie from '../../../userRoleCompanie/RemoveUserFromCompanie'

type State = {
  menu: string
}
type Props = {
  product: Product
  companieId: string
  // userRoleCompanie: UserRoleCompanie
  context: Context
  user: User
  // companie: Companie
}

class UserSellerTeamRow extends React.Component<Props, State> {
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

    // const showResendInvitation =
    //   new Date(this.props.user.userRoleCompanies[0].lastDateInvitationSent) < new Date(Date.now() - 2 * 1000 * 60 * 60 * 24)
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn bgHover">
            <Grid container>
              <Grid item xs={12} sm={1} className="marginAuto">
                <ImageTemplate format={'avatar'} nameFile={this.props.user.nameFile} />
              </Grid>
              <Grid item xs={12} sm={4} className="marginAuto">
                {this.props.user.userRoleCompanies[0].isInvitationApproved ? (
                  <div>
                    <span className={isUserMyself ? 'secondary' : ''}>
                      {this.props.user.firstName} {this.props.user.lastName}
                    </span>
                  </div>
                ) : (
                  <>{isInvitationExpired ? <>{`Invitation expired`}</> : <>{`Invitation Pending`}</>}</>
                )}
                <SpoofUser user={this.props.user} />
              </Grid>
              <Grid item xs={12} sm={4} className="marginAuto">
                {this.props.user.email}
              </Grid>

              <Grid item xs={12} sm={2} className="marginAuto">
                {this.props.user.userRoleCompanies[0].companieRole === 'ANALYST' && <>PRODUCT ANALYST</>}
                {this.props.user.userRoleCompanies[0].companieRole === 'ADMIN' && <>PRODUCT ADMIN</>}

                {this.props.user.userRoleCompanies[0].companieRole === 'OWNER' && <>PRODUCT OWNER</>}
              </Grid>
              <Grid item xs={12} sm={1} className="marginAuto">
                {this.props.context.userRoleCompanie.permissions.includes('canRemoveUserFromSellerCompanie') && (
                  <>
                    {this.props.user.userRoleCompanies[0].companieRole !== 'OWNER' && !isUserMyself && (
                      <Tooltip title="Remove User">
                        <IconButton
                          color="default"
                          size="small"
                          onClick={() => this.setState({ menu: 'removeUserFromCompanie' })}>
                          <Icon>delete</Icon>
                        </IconButton>
                      </Tooltip>
                    )}
                  </>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} className="marginAuto">
              {this.state.menu === 'removeUserFromCompanie' && (
                <RemoveUserFromCompanie
                  text={`This user will lose access to the ${this.props.user.userRoleCompanies[0].companie.name} Seller Station. Are you sure you want to remove this user?`}
                  onCancel={this.onCancel}
                  userRoleCompanie={this.props.user.userRoleCompanies[0]}
                />
              )}
              {/*
              {this.state.menu === 'transferOwnership' && (
                <TransferOwnership
                  user={this.props.user}
                  onCancel={this.onCancel}
                  userRoleCompanie={this.props.user.userRoleCompanies[0]}
                  companieId={this.props.companieId}
                />
              )} 
              {/* {this.state.menu === 'role' && (
                <UserRoleCompanieFormCompanieRoleSeller
                  onUpdated={this.onCancel}
                  onCancel={this.onCancel}
                  userRoleCompanie={this.props.user.userRoleCompanies[0]}
                />
              )} */}
            </Grid>
          </Paper>
        </div>
      </>
    )
  }
}

export default compose(withRouter, withContext)(UserSellerTeamRow)
