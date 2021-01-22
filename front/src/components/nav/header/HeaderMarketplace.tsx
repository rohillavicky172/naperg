import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Context } from '../../Context.type'
import { Link } from 'react-router-dom'
import './Header.css'
import UseWindowDimensions from '../../UseWindowDimensions'
// import TopHello from './TopHello'
// import Icon from '@material-ui/core/Icon'
// import SpoofUserStatus from '../../user/single/action/spoofUser/SpoofUserStatus'
// import MenuLeftDesktop from './topLeft/MenuLeftDesktop'

const HeaderMarketplace = () => {
  const { context }: { context: Context } = useContext(AppContext)

  // if (!context.me) {
  //   return null
  // }
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="">
      <AppBar classes={{ root: context.testMode ? 'rootHeader' : '' }} position="static" color="inherit">
        <Toolbar>
          <div className="flex" />
          <Link to="/marketplaceBtoB">
            <Button>
              {isMobile ? (
                <img src="/logo/NachoNachoMarketplaceMobile.png" className="logoMobile" alt="logo" />
              ) : (
                <img src="/logo/NachoNachoMarketplace.png" className="logo" alt="logo" />
              )}
            </Button>
            {process.env.REACT_APP_ENV !== 'production' && <span className="secondary">Dev</span>}
          </Link>
          <div className="flex" />
          <Link className="link" to="/">
            Login
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default HeaderMarketplace
