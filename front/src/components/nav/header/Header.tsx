import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import TopHello from './TopHello'

import { Icon, Button, Toolbar, AppBar } from '@material-ui/core/'
// import SpoofUserStatus from '../../user/single/action/spoofUser/SpoofUserStatus'
import { Link } from 'react-router-dom'
import MenuLeftDesktop from './topLeft/MenuLeftDesktop'
import './Header.css'
import UseWindowDimensions from '../../UseWindowDimensions'

const Header = () => {
  const { context }: { context: Context } = useContext(AppContext)
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="">
      <AppBar classes={{ root: context.testMode ? 'rootHeader' : '' }} position="static" color="inherit">
        <Toolbar>
          {isMobile ? (
            <Button onClick={() => context.toggleDrawerLeft(true)}>
              <Icon>menu</Icon>
              {context.userRoleCompanie && context.userRoleCompanie.companie.name.substring(0, 16)}
              {context.userRoleCompanie && context.userRoleCompanie.companie.name.length > 16 && <>..</>}
            </Button>
          ) : (
            <MenuLeftDesktop showCreateCompanie={true} />
          )}
          <div className="flex" />
          <Link to="/">
            <Button>
              {isMobile ? (
                <>
                  {context.userRoleCompanie.companie.typeCompanie === 'SELLER' ? (
                    <img src="/logo/NachoNachoSellerStationMobile.png" className="logoMobile" alt="logo" />
                  ) : (
                    <img src="/logo/logo_NachoNacho_mobile.png" className="logoMobile" alt="logo" />
                  )}
                </>
              ) : (
                <>
                  {context.userRoleCompanie.companie.typeCompanie === 'SELLER' ? (
                    <img src="/logo/NachoNachoSellerStation.png" className="logo" alt="logo" />
                  ) : (
                    <img src="/logo/logo.png" className="logo" alt="logo" />
                  )}
                </>
              )}
            </Button>
            {process.env.REACT_APP_ENV !== 'production' && <span className="secondary">Dev</span>}
          </Link>
          {/* <SpoofUserStatus /> */}
          <div className="flex" />
          {!isMobile && (
            <a href="https://nachonacho.com/contact">
              <Icon>contact_support</Icon>
            </a>
          )}
          <TopHello />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
