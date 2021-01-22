import React, { useContext } from 'react'
import { List, Button, Drawer, Divider } from '@material-ui/core'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { User } from '../../User.type'
import { Link } from 'react-router-dom'
// import SpoofUserStatus from '../action/spoofUser/SpoofUserStatus'
import { Companie } from '../../../companie/Companie.type'
import ToggleTestMode from '../../../nav/header/ToggleTestMode'
import DrawerLeftBuyer from './drawerLeftBuyer/DrawerLeftBuyer'
import DrawerLeftAffiliate from './DrawerLeftAffiliate'
import DrawerLeftSeller from './DrawerLeftSeller'
import RefreshPage from '../../../nav/header/RefreshPage'
import UseWindowDimensions from '../../../UseWindowDimensions'

import '../Style.css'
import DrawerLeftNNAnalyst from './DrawerLeftNNAnalyst'

type Props = {
  user: User
  companie: Companie
}

const DrawerLeft = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = useContext(AppContext)

  if (!props.companie) {
    return null
  }
  if (!context.userRoleCompanie) {
    return null
  }

  return (
    <div className={isMobile ? '' : 'drawerLeft'}>
      <Drawer
        open={isMobile ? context.isSideBarOpenLeftMobile : true}
        anchor="left"
        onClose={() => context.toggleDrawerLeftMobile(false)}
        variant={isMobile ? 'temporary' : 'permanent'}
        classes={{
          paper: isMobile ? '' : 'paperDrawerLeft',
        }}>
        <List>
          {props.companie.typeCompanie === 'NN_ANALYST' && <DrawerLeftNNAnalyst companie={props.companie} />}
          {props.companie.typeCompanie === 'BUYER' && <DrawerLeftBuyer user={props.user} companie={props.companie} />}
          {props.companie.typeCompanie === 'AFFILIATE' && <DrawerLeftAffiliate user={props.user} companie={props.companie} />}

          {props.companie.typeCompanie === 'SELLER' && <DrawerLeftSeller companie={props.companie} />}

          {props.user && props.user.id && (props.user.role === 'ADMIN' || props.user.role === 'INFLUENCER') && (
            <>
              {props.companie.typeCompanie === 'BUYER' && (
                <div className="tac">
                  <Divider />
                  <ToggleTestMode onClick={() => {}} />
                </div>
              )}
            </>
          )}
          <RefreshPage />
          {/* <SpoofUserStatus /> */}
          {props.user.role === 'ADMIN' && (
            <div className="paperOut">
              <Link to={`/dashboardAdmin`}>
                <Button color="primary" variant="outlined" onClick={() => context.toggleDrawerLeftMobile(false)}>
                  ADMIN
                </Button>
              </Link>{' '}
            </div>
          )}
          <div style={{ height: '80px' }} />
        </List>
      </Drawer>
    </div>
  )
}

export default DrawerLeft
