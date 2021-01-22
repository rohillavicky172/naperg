import React from 'react'
import { Link } from 'react-router-dom'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Subscription } from '../../../subscription/Subscription.type'
import IconButton from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteSubscription from '../action/DeleteSubscription'
// import { graphql } from 'react-apollo'; import {flowRight as compose} from 'lodash';
// import { Product } from '../../../product/Product.type'

type State = {
  anchorEl: any
}
type Props = {
  context: Context
  subscription: Subscription
  onSelectMenu: (menu: string) => void
  // companie: Companie
}

class ActionSubscription extends React.Component<Props, State> {
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

    const isSubscriptionIsMyself = this.props.subscription.user.id === this.props.context.me.id
    return (
      <>
        <div>
          {(this.props.context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') ||
            isSubscriptionIsMyself ||
            (this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') || isSubscriptionIsMyself) ||
            (this.props.subscription.issuedCard.status !== 'canceled' &&
              this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie')) ||
            (this.props.context.me && this.props.context.me.role === 'ADMIN')) && (
            <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
              <Icon>more_vert</Icon>
            </IconButton>
          )}
          <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
            {/* 
            {this.props.subscription.status !== 'CANCELLED' && (
              <MenuItem onClick={() => this.handleClose('showUnsubscribeWarning')}>{`Unsubscribe`}</MenuItem>
            )} 
            {this.props.subscription.status === 'CANCELLED' && <DoNotCancelSubscription subscriptionId={this.props.subscription.id} />} 
            */}

            {(this.props.context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') || isSubscriptionIsMyself) && (
              <Link
                to={'/invoicesCompany/' + this.props.subscription.companie.id + '?subscriptionId=' + this.props.subscription.id}>
                <MenuItem>{`Transactions`}</MenuItem>
              </Link>
            )}

            <Link to={'/product/' + this.props.subscription.product.id}>
              <MenuItem>{`Product page`}</MenuItem>
            </Link>

            {(this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') ||
              isSubscriptionIsMyself) && (
              <Link to={'/issuedCard/' + this.props.subscription.issuedCard.id}>
                <MenuItem>{`View NachoCard`}</MenuItem>
              </Link>
            )}

            {this.props.subscription.issuedCard.status !== 'canceled' &&
              this.props.context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') && (
                <Link to={'/cancelIssuedCard/' + this.props.subscription.issuedCard.id}>
                  <MenuItem>{`Cancel NachoCard`}</MenuItem>
                </Link>
              )}

            {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
              <MenuItem>
                <DeleteSubscription subscriptionId={this.props.subscription.id} />
              </MenuItem>
            )}
          </Menu>
        </div>
      </>
    )
  }
}

export default withContext(ActionSubscription)
