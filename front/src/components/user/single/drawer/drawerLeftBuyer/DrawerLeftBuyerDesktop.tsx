import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { useHistory, useLocation } from 'react-router-dom'
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

const DrawerLeftBuyerDesktop = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const history = useHistory()
  const location = useLocation()
  let baseURL = ''
  const pathnames = location.pathname.split('/')
  if (pathnames.length > 1) {
    baseURL = pathnames[1]
  }

  return (
    <>
      <ListItem className={baseURL === '' ? 'bgGrey' : ''} button onClick={() => history.push('/')}>
        <ListItemIcon>
          <Icon className={baseURL === '' ? 'secondary' : 'black'}>home</Icon>
        </ListItemIcon>
        <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Home'} />
      </ListItem>

      {context.userRoleCompanie.permissions.includes('canSeeCards') && (
        <Link to={'/paymentSource/' + props.companie.id}>
          <ListItem className={baseURL === 'paymentSource' ? 'bgGrey' : ''} button>
            <ListItemIcon>
              <Icon className={baseURL === 'paymentSource' ? 'secondary' : 'black'}>account_balance</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Payment Source" />
          </ListItem>
        </Link>
      )}

      {!context.userRoleCompanie.companie.isPersonal && (
        <>
          {context.userRoleCompanie.permissions && context.userRoleCompanie.permissions.includes('canSeeUsersInCompanie') && (
            <Link to={'/team/' + props.companie.id}>
              <ListItem className={baseURL === 'team' ? 'bgGrey' : ''} button>
                <ListItemIcon>
                  <Icon className={baseURL === 'team' ? 'secondary' : 'black'}>group</Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Members" />
              </ListItem>
            </Link>
          )}
        </>
      )}

      {context.userRoleCompanie.companie.isPersonal && context.userRoleCompanie.permissions.includes('canSeeMyIssuedCards') && (
        <Link to={'/issuedCards/' + props.user.id}>
          <ListItem className={baseURL === 'issuedCards' ? 'bgGrey' : ''} button>
            <ListItemIcon>
              <Icon className={baseURL === 'issuedCards' ? 'secondary' : 'black'}>payment</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="NachoCards" />
          </ListItem>
        </Link>
      )}

      {!context.userRoleCompanie.companie.isPersonal &&
        context.userRoleCompanie.permissions.includes('canSeeMyIssuedCards') &&
        !context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') && (
          <Link to={'/issuedCards/' + props.user.id}>
            <ListItem className={baseURL === 'issuedCards' ? 'bgGrey' : ''} button>
              <ListItemIcon>
                <Icon className={baseURL === 'issuedCards' ? 'secondary' : 'black'}>payment</Icon>
              </ListItemIcon>
              <ListItemText
                classes={{ primary: 'menuDrawerLeft' }}
                primary="NachoCards"
                secondary={'(' + props.user.firstName + ' ' + props.user.lastName + ')'}
              />
            </ListItem>
          </Link>
        )}
      {!context.userRoleCompanie.companie.isPersonal &&
        context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') && (
          <Link to={'/issuedCardsCompany/' + props.companie.id}>
            <ListItem className={baseURL === 'issuedCardsCompany' ? 'bgGrey' : ''} button>
              <ListItemIcon>
                <Icon className={baseURL === 'issuedCardsCompany' ? 'secondary' : 'black'}>payment</Icon>
              </ListItemIcon>
              <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="NachoCards" />
            </ListItem>
          </Link>
        )}

      {context.userRoleCompanie.permissions && context.userRoleCompanie.permissions.includes('canSeeSubscriptionsInCompanie') && (
        <Link to={'/subscriptionsCompany/' + props.companie.id}>
          <ListItem className={baseURL === 'subscriptionsCompany' ? 'bgGrey' : ''} button>
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
                <ListItem className={baseURL === 'subscriptions' ? 'bgGrey' : ''} button>
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

      {context.userRoleCompanie && context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
        <Link to={'/invoicesCompany/' + props.companie.id}>
          <ListItem className={baseURL === 'invoicesCompany' ? 'bgGrey' : ''} button>
            <ListItemIcon>
              <Icon className={baseURL === 'invoicesCompany' ? 'secondary' : 'black'}>view_list</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Transactions" />
          </ListItem>
        </Link>
      )}

      {!context.userRoleCompanie.companie.isPersonal && (
        <>
          {context.userRoleCompanie.permissions.includes('canSeeMyInvoices') &&
            !context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
              <Link to={'/invoices/' + props.user.id}>
                <ListItem className={baseURL === 'invoices' ? 'bgGrey' : ''} button>
                  <ListItemIcon>
                    <Icon className={baseURL === 'invoices' ? 'secondary' : 'black'}>view_list</Icon>
                  </ListItemIcon>
                  <ListItemText
                    classes={{ primary: 'menuDrawerLeft' }}
                    primary="Transactions"
                    secondary={'(' + props.user.firstName + ' ' + props.user.lastName + ')'}
                  />
                </ListItem>
              </Link>
            )}
        </>
      )}

      {context.userRoleCompanie.permissions.includes('canSeeRewards') && (
        <Link to={'/nachoRewards/' + props.companie.id}>
          <ListItem className={baseURL === 'nachoRewards' ? 'bgGrey' : ''} button>
            <ListItemIcon>
              <Icon className={baseURL === 'nachoRewards' ? 'secondary' : 'black'}>card_giftcard</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="NachoRewards" />
          </ListItem>
        </Link>
      )}

      {context.userRoleCompanie.permissions.includes('canSeeCompanie') && (
        <>
          <ListItem
            className={baseURL === 'company' ? 'bgGrey' : ''}
            button
            onClick={() => {
              history.push('/company/' + props.companie.id)
            }}>
            <ListItemIcon>
              <Icon className={baseURL === 'company' ? 'secondary' : 'black'}>settings_applications</Icon>
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: 'menuDrawerLeft',
                secondary: 'menuDrawerLeftSecondary',
              }}
              id={'settingsDesktop'}
              primary={'Settings'}
              secondary={`(${context.userRoleCompanie.companie.name})`}
            />
          </ListItem>
        </>
      )}
      {/* 
      <Link to={'/setupGuide'}>
        <ListItem className={baseURL === 'setupGuide' ? 'bgGrey' : ''} button>
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
        <ListItem className={baseURL === 'marketplaceBtoB' ? 'bgGrey' : ''} button>
          <ListItemIcon>
            <Icon className={baseURL === 'marketplaceBtoB' ? 'secondary' : 'black'}>shopping_cart</Icon>
          </ListItemIcon>
          <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary="Marketplace" />
        </ListItem>
      </a>
    </>
  )
}

export default DrawerLeftBuyerDesktop
