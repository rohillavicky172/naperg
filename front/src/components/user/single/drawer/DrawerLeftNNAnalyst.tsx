import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { Companie } from '../../../companie/Companie.type'
import { useHistory, useLocation } from 'react-router-dom'
import '../Style.css'
import { Divider } from '@material-ui/core'
import { URL_MARKETPLACE } from '../../../../config/config'
type Props = {
  companie: Companie
}

const DrawerLeftNNAnalyst = (props: Props) => {
  const history = useHistory()
  const location = useLocation()

  const pathnames = location.pathname.split('/')
  let baseURL = ''
  if (pathnames.length > 1) {
    baseURL = pathnames[1]
  }

  if (pathnames.length > 2) {
    if (pathnames[1] === 'seller') {
      baseURL = pathnames[2]
    }
  }

  return (
    <div className="tac">
      <>
        <ListItem className={baseURL === '' ? 'bgGrey' : ''} button onClick={() => history.push('/')}>
          <ListItemIcon>
            <Icon className={baseURL === '' ? 'secondary' : 'black'}>home</Icon>
          </ListItemIcon>
          <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Home'} />
        </ListItem>

        <Divider />
        <Link to={'/balanceAdmin'}>
          <ListItem className={baseURL === 'balanceAdmin' ? 'bgGrey' : ''} button>
            <ListItemIcon>
              <Icon className={baseURL === 'balanceAdmin' ? 'secondary' : 'black'}>settings_applications</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'balance NN'} />
          </ListItem>
        </Link>

        <Link to={'/company/' + props.companie.id}>
          <ListItem className={baseURL === 'company' ? 'bgGrey' : ''} button>
            <ListItemIcon>
              <Icon className={baseURL === 'company' ? 'secondary' : 'black'}>settings_applications</Icon>
            </ListItemIcon>
            <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Settings'} />
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
    </div>
  )
}

export default DrawerLeftNNAnalyst
