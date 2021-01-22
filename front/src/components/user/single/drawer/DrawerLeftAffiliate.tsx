import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { User } from '../../User.type'
import { Companie } from '../../../companie/Companie.type'
import { URL_MARKETPLACE } from '../../../../config/config'
import '../Style.css'

type State = {}

type Props = {
  user: User
  companie: Companie
  context: Context
  isMobile: boolean
  location: any
  history: any
}

class DrawerLeftAffiliate extends React.Component<Props, State> {
  render() {
    const pathnames = this.props.location.pathname.split('/')
    let baseURL = ''
    if (pathnames.length > 1) {
      baseURL = pathnames[1]
    }

    return (
      <>
        <>
          <ListItem
            className={baseURL === '' ? 'bgGrey' : ''}
            button
            onClick={() => {
              this.props.history.push('/')
            }}>
            <ListItemIcon>
              <Icon className={baseURL === '' ? 'secondary' : 'black'}>home</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} className="hideMobile" primary={'Home'} />
          </ListItem>

          <Link to={`/affiliateInviteUser`}>
            <ListItem className={baseURL === 'affiliateInviteUser' ? 'bgGrey' : ''} button>
              <ListItemIcon>
                <Icon className={baseURL === 'affiliateInviteUser' ? 'secondary' : 'black'}>supervised_user_circle</Icon>
              </ListItemIcon>
              <ListItemText classes={{ primary: 'menuDrawerLeft' }} className="hideMobile" primary="Invite Users" />
            </ListItem>
          </Link>

          <Link to={`/affiliateUsers/${this.props.context.me.id}`}>
            <ListItem className={baseURL === 'affiliateUsers' ? 'bgGrey' : ''} button>
              <ListItemIcon>
                <Icon className={baseURL === 'affiliateUsers' ? 'secondary' : 'black'}>group</Icon>
              </ListItemIcon>
              <ListItemText classes={{ primary: 'menuDrawerLeft' }} className="hideMobile" primary="Users" />
            </ListItem>
          </Link>

          <Link to={'/company/' + this.props.companie.id}>
            <ListItem className={baseURL === 'company' ? 'bgGrey' : ''} button>
              <ListItemIcon>
                <Icon className={baseURL === 'company' ? 'secondary' : 'black'}>settings_applications</Icon>
              </ListItemIcon>
              <ListItemText classes={{ primary: 'menuDrawerLeft' }} className="hideMobile" primary={'Settings'} />
            </ListItem>
          </Link>
          <a href={URL_MARKETPLACE}>
            <ListItem className={baseURL === 'marketplaceBtoB' ? 'bgGrey' : ''} button>
              <ListItemIcon>
                <Icon className={baseURL === 'marketplaceBtoB' ? 'secondary' : 'black'}>shopping_cart</Icon>
              </ListItemIcon>
              <ListItemText classes={{ primary: 'menuDrawerLeft' }} className="hideMobile" primary="Marketplace" />
            </ListItem>
          </a>
          {/* )} */}
        </>
        {/* )} */}
      </>
    )
  }
}

export default compose(withRouter, withContext)(DrawerLeftAffiliate)
