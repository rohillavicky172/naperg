
import React from 'react'
// import { graphql } from 'react-apollo'; import {flowRight as compose} from 'lodash';
import { Link } from 'react-router-dom'
import { Product } from '../../product/Product.type'
import { UserRoleCompanie } from '../../userRoleCompanie/UserRoleCompanie.type'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { User } from '../../user/User.type'
import { Event } from '../../Event.type'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

type State = {
  anchorEl: any
}
type Props = {
  context: Context
  product: Product
  event: Event
  onSelectMenu: (nemu: string) => void
  user: User
  // companie: Companie,
  isUserMyself: boolean
  isInvitationExpired: boolean
  userRoleCompanie: UserRoleCompanie
}

class ActionSingleCompanieTeam extends React.Component<Props, State> {
  state = {
    anchorEl: null
  }
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose = (menu: string) => {
    this.setState({ anchorEl: null })
    this.props.onSelectMenu(menu)
  }
  render() {
    const { anchorEl } = this.state
    // console.log(this.props.user.userRoleCompanies[0])
    return (
      <>
        <div>
          <Button aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
            <Icon>more_vert</Icon>
          </Button>
          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
            {/* <MenuItem onClick={() => this.handleClose('authorizations')}>{`See authorizations`}</MenuItem>
            <MenuItem onClick={() => this.handleClose('addAuthorization')}>{`Add authorization`}</MenuItem> */}

            {this.props.context.userRoleCompanie.permissions.includes('canEditRoleUser') &&
              this.props.user.userRoleCompanies[0].companieRole !== 'OWNER' && (
                <MenuItem onClick={() => this.handleClose('role')}>{`Edit role`}</MenuItem>
              )}

            {((this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') &&
              this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyIssuedCards')) ||
              (this.props.isUserMyself && this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyIssuedCards'))) && (
              <Link to={'/issuedCards/' + this.props.user.id}>
                <MenuItem>{`NachoCards`}</MenuItem>
              </Link>
            )}
            {this.props.context.userRoleCompanie.permissions.includes('canCreateIssuedCardsInCompanie') &&
              this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyIssuedCards') && (
                <Link to={'/createIssuedCard/' + this.props.user.id}>
                  <MenuItem>{`+ NachoCard`}</MenuItem>
                </Link>
              )}

            {this.props.user.userRoleCompanies[0].isInvitationApproved &&
              this.props.user.userRoleCompanies[0].permissions.includes('canSeeMySubscriptions') &&
              this.props.context.userRoleCompanie.permissions.includes('canSeeSubscriptionsInCompanie') && (
                <Link to={'/subscriptions/' + this.props.user.id}>
                  <MenuItem>{`Subscriptions`}</MenuItem>
                </Link>
              )}

            {((this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyInvoices') &&
              this.props.context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie')) ||
              (this.props.isUserMyself && this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyInvoices'))) && (
              <Link to={'/invoices/' + this.props.user.id}>
                <MenuItem>{`Transactions`}</MenuItem>
              </Link>
            )}

            {this.props.context.userRoleCompanie.permissions &&
              !this.props.isInvitationExpired &&
              !this.props.isUserMyself &&
              this.props.context.userRoleCompanie.permissions.includes('canTransferOwnership') && (
                <MenuItem onClick={() => this.handleClose('transferOwnership')}>{`Make this user OWNER`}</MenuItem>
              )}
            {this.props.context.userRoleCompanie.permissions &&
              this.props.user.userRoleCompanies[0].permissions.includes('canBeRemovedFromCompanie') &&
              !this.props.isUserMyself &&
              this.props.context.userRoleCompanie.permissions.includes('canRemoveUserFromCompanie') && (
                <MenuItem onClick={() => this.handleClose('removeUserFromCompanie')}>
                  {`Remove from `} {this.props.context.userRoleCompanie.companie.name}
                </MenuItem>
              )}
          </Menu>
        </div>
      </>
    )
  }
}

export default withContext(ActionSingleCompanieTeam)
