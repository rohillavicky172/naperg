import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { useLocation } from 'react-router-dom'
import { Context } from '../../../../Context.type'
import { AppContext } from '../../../../AppContext'
import { User } from '../../../User.type'
import { Companie } from '../../../../companie/Companie.type'
import GetStartedTotal from '../../../../wizard/GetStartedTotal'
import { URL_MARKETPLACE } from '../../../../../config/config'

type Props = {
  user: User
  companie: Companie
}

const DrawerLeftBuyerMobile = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const location = useLocation()
  let baseURL = ''
  const pathnames = location.pathname.split('/')
  if (pathnames.length > 1) {
    baseURL = pathnames[1]
  }

  return (
    <>
      <Link to={'/'}>
        <ListItem className={baseURL === '' ? 'bgGrey' : ''} button onClick={() => context.toggleDrawerLeftMobile(false)}>
          <ListItemIcon>
            <Icon className={baseURL === '' ? 'secondary' : 'black'}>home</Icon>
          </ListItemIcon>
          <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Home'} />
        </ListItem>
      </Link>

      {context.userRoleCompanie.permissions.includes('canSeeCards') && (
        <Link to={'/paymentSource/' + props.companie.id}>
          <ListItem className={baseURL === 'cards' ? 'bgGrey' : ''} button onClick={() => context.toggleDrawerLeftMobile(false)}>
            <ListItemIcon>
              <Icon className={baseURL === 'cards' ? 'secondary' : 'black'}>account_balance</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Payment Source" />
          </ListItem>
        </Link>
      )}

      {!context.userRoleCompanie.companie.isPersonal && (
        <>
          {context.userRoleCompanie.permissions && context.userRoleCompanie.permissions.includes('canSeeUsersInCompanie') && (
            <Link to={'/team/' + props.companie.id}>
              <ListItem
                className={baseURL === 'team' ? 'bgGrey' : ''}
                button
                onClick={() => context.toggleDrawerLeftMobile(false)}>
                <ListItemIcon>
                  <Icon className={baseURL === 'team' ? 'secondary' : 'black'}>group</Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Members" />
              </ListItem>
            </Link>
          )}
        </>
      )}

      {context.userRoleCompanie.permissions && context.userRoleCompanie.permissions.includes('canSeeSubscriptionsInCompanie') && (
        <Link to={'/subscriptionsCompany/' + props.companie.id}>
          <ListItem
            className={baseURL === 'subscriptionsCompany' ? 'bgGrey' : ''}
            button
            onClick={() => context.toggleDrawerLeftMobile(false)}>
            <ListItemIcon>
              <Icon className={baseURL === 'subscriptionsCompany' ? 'secondary' : 'black'}>autorenew</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Subscriptions" />
          </ListItem>
        </Link>
      )}

      {!context.userRoleCompanie.companie.isPersonal && (
        <>
          {context.userRoleCompanie.permissions.includes('canSeeMySubscriptions') &&
            !context.userRoleCompanie.permissions.includes('canSeeSubscriptionsInCompanie') && (
              <Link to={'/subscriptions/' + props.user.id}>
                <ListItem
                  className={baseURL === 'subscriptions' ? 'bgGrey' : ''}
                  button
                  onClick={() => context.toggleDrawerLeftMobile(false)}>
                  <ListItemIcon>
                    <Icon className={baseURL === 'subscriptions' ? 'secondary' : 'black'}>autorenew</Icon>
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: 'menuDrawerLeft' }}
                    primary="Subscriptions"
                    secondary={'(' + props.user.firstName + ' ' + props.user.lastName + ')'}
                  />
                </ListItem>
              </Link>
            )}
        </>
      )}

      {context.userRoleCompanie.permissions.includes('canSeeRewards') && (
        <Link to={'/nachoRewards/' + props.companie.id}>
          <ListItem
            className={baseURL === 'nachoRewards' ? 'bgGrey' : ''}
            button
            onClick={() => context.toggleDrawerLeftMobile(false)}>
            <ListItemIcon>
              <Icon className={baseURL === 'nachoRewards' ? 'secondary' : 'black'}>card_giftcard</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="NachoRewards" />
          </ListItem>
        </Link>
      )}

      {context.userRoleCompanie.permissions.includes('canSeeCompanie') && (
        <>
          <Link to={'/company/' + props.companie.id}>
            <ListItem
              className={baseURL === 'company' ? 'bgGrey' : ''}
              button
              onClick={() => context.toggleDrawerLeftMobile(false)}>
              <ListItemIcon>
                <Icon className={baseURL === 'company' ? 'secondary' : 'black'}>settings_applications</Icon>
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: 'menuDrawerLeft',
                }}
                primary={'Settings'}
                id={'settingsMobile'}
                secondary={`(${context.userRoleCompanie.companie.name})`}
              />
            </ListItem>
          </Link>
        </>
      )}

      {/* <Link to={'/setupGuide'}>
        <ListItem
          className={baseURL === 'setupGuide' ? 'bgGrey' : ''}
          button
          onClick={() => context.toggleDrawerLeftMobile(false)}>
          <ListItemIcon>
            <Icon className={baseURL === 'setupGuide' ? 'secondary' : 'black'}>add_to_queue</Icon>
          </ListItemIcon>
          <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Setup guide" />
        </ListItem>
      </Link> */}

      <Link to={'/getStarted'}>
        <ListItem
          className={baseURL === 'getStarted' ? 'bgGrey' : ''}
          button
          onClick={() => context.toggleDrawerLeftMobile(false)}>
          <ListItemIcon>
            <Icon className={baseURL === 'getStarted' ? 'secondary' : 'black'}>add_to_queue</Icon>
          </ListItemIcon>
          <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={<GetStartedTotal />} />
        </ListItem>
      </Link>

      <a href={URL_MARKETPLACE}>
        <ListItem
          className={baseURL === 'marketplaceBtoB' ? 'bgGrey' : ''}
          button
          onClick={() => context.toggleDrawerLeftMobile(false)}>
          <ListItemIcon>
            <Icon className={baseURL === 'marketplaceBtoB' ? 'secondary' : 'black'}>shopping_cart</Icon>
          </ListItemIcon>
          <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Marketplace" />
        </ListItem>
      </a>
    </>
  )
}

export default DrawerLeftBuyerMobile
