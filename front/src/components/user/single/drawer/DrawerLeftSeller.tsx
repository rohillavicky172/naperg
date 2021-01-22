import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { Context } from '../../../Context.type'
import { Product } from '../../../product/Product.type'
import { Companie } from '../../../companie/Companie.type'
import { AppContext } from '../../../AppContext'
import { useHistory, useLocation } from 'react-router-dom'
import '../Style.css'
import { Divider } from '@material-ui/core'
import { URL_MARKETPLACE } from '../../../../config/config'

type Props = {
  companie: Companie
}

const DrawerLeftSeller = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
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

        {!context.userRoleCompanie.companie.isPersonal && (
          <>
            {context.userRoleCompanie.permissions && context.userRoleCompanie.permissions.includes('canSeeUsersInCompanie') && (
              <Link to={`/seller/team/${props.companie.id}`}>
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

        {props.companie.ownedProducts.map((product: Product, i: number) => (
          <div key={product.id}>
            <Divider />
            <Link to={`/product/${product.id}`}>
              <ListItem className={baseURL === 'product' ? 'bgGrey' : ''} button>
                <ListItemIcon>
                  <Icon id={'productOwner' + i} className={baseURL === 'product' ? 'secondary' : 'black'}>
                    insert_photo
                  </Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={product.name} secondary={'(Product page)'} />
              </ListItem>
            </Link>

            <Link to={`/seller/subscriptionsProduct/${product.id}`}>
              <ListItem className={baseURL === 'subscriptionsProduct' ? 'bgGrey' : ''} button>
                <ListItemIcon>
                  <Icon
                    id={'productOwnerSubscriptions' + i}
                    className={baseURL === 'subscriptionsProduct' ? 'secondary' : 'black'}>
                    autorenew
                  </Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Subscriptions'} />
              </ListItem>
            </Link>
            <Link to={`/seller/invoicesProduct/${product.id}`}>
              <ListItem className={baseURL === 'invoicesProduct' ? 'bgGrey' : ''} button>
                <ListItemIcon>
                  <Icon id={'productOwnerInvoices' + i} className={baseURL === 'invoicesProduct' ? 'secondary' : 'black'}>
                    view_list
                  </Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Transactions'} />
              </ListItem>
            </Link>

            <Link to={`/seller/dashboard/${props.companie.id}/${product.id}`}>
              <ListItem className={baseURL === 'dashboard' ? 'bgGrey' : ''} button>
                <ListItemIcon>
                  <Icon className={baseURL === 'dashboard' ? 'secondary' : 'black'}>monetization_on</Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Invoices'} />
              </ListItem>
            </Link>
            <Link to={`/seller/reviewRequest/${product.id}`}>
              <ListItem className={baseURL === 'reviewRequest' ? 'bgGrey' : ''} button>
                <ListItemIcon>
                  <Icon className={baseURL === 'reviewRequest' ? 'secondary' : 'black'}>star_rate</Icon>
                </ListItemIcon>
                <ListItemText classes={{ primary: 'menuDrawerLeft' }} primary={'Reviews'} />
              </ListItem>
            </Link>
          </div>
        ))}
        <Divider />
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

export default DrawerLeftSeller
