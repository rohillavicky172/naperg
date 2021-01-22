import React from 'react'
import { AppBar, Icon, BottomNavigation, BottomNavigationAction } from '@material-ui/core/'
import './Style.css'
import { Context } from '../../Context.type'
import { AppContext } from '../../AppContext'
import UseWindowDimensions from '../../UseWindowDimensions'

const FooterSeller = () => {
  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = React.useContext(AppContext)
  if (!isMobile) return null
  return (
    <>
      <div style={{ height: '100px' }} />
      <AppBar position="fixed" color="primary" className={'appBarFooter'}>
        <BottomNavigation showLabels className={''}>
          <BottomNavigationAction onClick={() => context.toggleDrawerLeftMobile(true)} label="Menu" icon={<Icon>menu</Icon>} />
        </BottomNavigation>
      </AppBar>
    </>
  )
}

export default FooterSeller
