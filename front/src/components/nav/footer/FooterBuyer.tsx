import React from 'react'
import { AppBar, Icon, BottomNavigation, BottomNavigationAction } from '@material-ui/core/'
import './Style.css'
import { useLocation } from 'react-router-dom'
import { Context } from '../../Context.type'
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import UseWindowDimensions from '../../UseWindowDimensions'

const FooterBuyer = () => {
  let baseURL = ''
  const location = useLocation()
  const pathnames = location.pathname.split('/')
  if (pathnames.length > 1) {
    baseURL = pathnames[1]
  }
  const history = useHistory()
  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = React.useContext(AppContext)
  if (!isMobile) return null
  return (
    <>
      <div style={{ height: '100px' }} />

      <AppBar position="fixed" color="primary" className={'appBarFooter'}>
        {/* <Divider /> */}
        <BottomNavigation showLabels className={''}>
          <BottomNavigationAction onClick={() => context.toggleDrawerLeftMobile(true)} label="Menu" icon={<Icon>menu</Icon>} />

          {context.me.role === 'ADMIN' && (
            <BottomNavigationAction
              onClick={() => history.push('/dashboardAdmin/')}
              label="Admin"
              className={baseURL === 'issuedCards' ? 'bgGrey secondary' : ''}
              icon={<Icon>admin_panel_settings</Icon>}
            />
          )}

          {context.userRoleCompanie.companie.isPersonal &&
            context.userRoleCompanie.permissions.includes('canSeeMyIssuedCards') && (
              <BottomNavigationAction
                onClick={() => history.push('/issuedCards/' + context.me.id)}
                label="NachoCards"
                className={baseURL === 'issuedCards' ? 'bgGrey secondary' : ''}
                icon={<Icon>payment</Icon>}
              />
            )}

          {!context.userRoleCompanie.companie.isPersonal &&
            context.userRoleCompanie.permissions.includes('canSeeMyIssuedCards') &&
            !context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') && (
              <BottomNavigationAction
                onClick={() => history.push('/issuedCards/' + context.me.id)}
                className={baseURL === 'issuedCards' ? 'bgGrey secondary' : ''}
                label="NachoCards"
                icon={<Icon>payment</Icon>}
              />
            )}

          {!context.userRoleCompanie.companie.isPersonal &&
            context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') && (
              <BottomNavigationAction
                onClick={() => history.push('/issuedCardsCompany/' + context.userRoleCompanie.companie.id)}
                className={baseURL === 'issuedCardsCompany' ? 'bgGrey secondary' : ''}
                label="NachoCards"
                icon={<Icon>payment</Icon>}
              />
            )}

          {context.userRoleCompanie && context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
            <BottomNavigationAction
              onClick={() => history.push('/invoicesCompany/' + context.userRoleCompanie.companie.id)}
              className={baseURL === 'invoicesCompany' ? 'bgGrey secondary' : ''}
              label="Transactions"
              icon={<Icon>view_list</Icon>}
            />
          )}

          {!context.userRoleCompanie.companie.isPersonal && (
            <>
              {context.userRoleCompanie.permissions.includes('canSeeMyInvoices') &&
                !context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
                  <BottomNavigationAction
                    onClick={() => history.push('/invoices/' + context.userRoleCompanie.companie.id)}
                    className={baseURL === 'invoices' ? 'bgGrey secondary' : ''}
                    label="Transactions"
                    icon={<Icon>view_list</Icon>}
                  />
                )}
            </>
          )}
        </BottomNavigation>
      </AppBar>
    </>
  )
}

export default FooterBuyer
