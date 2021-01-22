import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import SubApp from './SubApp'
// import { ME_QUERY_ROLE } from './user/GraphQL'
import { AppContext } from './AppContext'
import { graphql } from 'react-apollo'
import { UserRoleCompanie } from './userRoleCompanie/UserRoleCompanie.type'
import { flowRight as compose } from 'lodash'
import SnackBarCustom from './nav/SnackBarCustom'
import { Query } from './Query.type'
import { contextClass } from './Context.type'
import { AuthDevice, authDeviceClass } from './authDevice/AuthDevice.type'
import { User, userClass } from './user/User.type'
import gql from 'graphql-tag'

import {
  TEST_MODE,
  AUTH_DEVICE,
  AUTH_TOKEN,
  COOKIE_OPTIONS,
  USER_ROLE_COMPANIE,
  USER_ROLE_COMPANIE_ADMIN_WHILE_SPOOFING,
  SPOOFED_USER_ID,
} from '../config/config'

import { Context } from './Context.type'

export const ME_QUERY_ROLE = gql`
  query Me {
    me {
      id
      role
      enabled2FA
      firstName
      lastName
      nameFile
      email
      signupType
      isEmailValidated
      isPhoneValidated
      verificationStatusOffSite
      # verificationStatus
      # isPhoneValidated
      # isTwoFactorTotpVerified
      isPhoneValidationRequired
      enabled2FAPhone
      enabled2FAEmail
      enabled2FATotp
    }
  }
`

const cookie = require('cookie')

type Props = {
  location: any
  meQuery: Query
}

type State = {
  context: Context
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1476A3', // blue
    },
    secondary: {
      main: '#FD8723', // orange
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
})

class App extends React.Component<Props, State> {
  refreshContext = () => {
    const key = Math.random()
    this.setState({ context: { ...this.state.context, key } })
  }
  setModeContext = (modeContext: string) => {
    console.log(modeContext)
    this.setState({ context: { ...this.state.context, modeContext: modeContext } })
  }
  toggleDrawerRight = (isSideBarOpenRight: boolean) => {
    this.setState({ context: { ...this.state.context, isSideBarOpenRight: isSideBarOpenRight } })
  }

  toggleDrawerLeft = (isSideBarOpenLeft: boolean) => {
    this.setState({ context: { ...this.state.context, isSideBarOpenLeft: isSideBarOpenLeft } })
  }
  toggleDrawerLeftMobile = (isSideBarOpenLeftMobile: boolean) => {
    this.setState({ context: { ...this.state.context, isSideBarOpenLeftMobile: isSideBarOpenLeftMobile } })
  }

  openSnackBar = (showCloseIcon: boolean, message: string, type: string, time = 5000) => {
    if (this.props.meQuery && this.props.meQuery.me && this.props.meQuery.me.role === 'ADMIN') {
      this.child._openSnackBar(message, time, showCloseIcon)
    } else {
      if (type === 'error') {
        this.child._openSnackBar('Oops...', time, showCloseIcon)
      } else {
        this.child._openSnackBar(message, time, showCloseIcon)
      }
    }
  }
  logout = () => {
    console.log('logout')

    document.cookie.split(';').forEach(function (c) {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    document.cookie = cookie.serialize(AUTH_TOKEN, '', COOKIE_OPTIONS)
    localStorage.removeItem(USER_ROLE_COMPANIE)
    localStorage.removeItem(SPOOFED_USER_ID)
    localStorage.removeItem(USER_ROLE_COMPANIE_ADMIN_WHILE_SPOOFING)
    localStorage.setItem(TEST_MODE, 'false')
    this.refreshContext()
  }

  state: State = {
    context: {
      ...contextClass,

      refreshContext: this.refreshContext,
      toggleDrawerRight: this.toggleDrawerRight,
      setModeContext: this.setModeContext,

      toggleDrawerLeft: this.toggleDrawerLeft,
      toggleDrawerLeftMobile: this.toggleDrawerLeftMobile,
      openSnackBar: this.openSnackBar,
      logout: this.logout,
    },
  }

  child: any

  getAuthState = (userRoleCompanie: UserRoleCompanie) => {
    const authToken = cookie.parse(document.cookie)[AUTH_TOKEN]

    if (!authToken) {
      console.log('_')
      return ''
    }

    if (this.props.meQuery.error) {
      console.log('_')
      return 'error'
    }
    if (this.props.meQuery.loading) {
      console.log('_')
      return 'loading'
    }

    if (!this.props.meQuery.me) {
      console.log('_')
      return 'loading'
    }

    if (!this.props.meQuery.me.isEmailValidated) {
      console.log('_')
      return 'emailNotVerified'
    }

    if (!this.props.meQuery.me.isPhoneValidated && this.props.meQuery.me.isPhoneValidationRequired) {
      console.log('_')
      return 'phoneNotVerified'
    }
    if (!this.props.meQuery.me.firstName || !this.props.meQuery.me.lastName) {
      console.log('_')
      return 'noName'
    }
    if (this.props.meQuery.me.verificationStatusOffSite) {
      console.log('_')
      return 'verificationStatusOffSite'
    }
    if (userRoleCompanie && !userRoleCompanie.id) {
      console.log('_')
      return ''
    }
    if (!(userRoleCompanie && userRoleCompanie.permissions && userRoleCompanie.companie)) {
      console.log('_')
      return ''
    }

    const authDevice = JSON.parse(localStorage.getItem(AUTH_DEVICE + '|' + this.props.meQuery.me.email) || '{}')
    console.log('authDevice')
    console.log(authDevice.id)

    const user = this.props.meQuery.me
    if (!authDevice.isVerified) {
      if (user.enabled2FATotp || user.enabled2FAPhone || user.enabled2FAEmail) {
        console.log('Device not verified')
        return 'deviceNotVerified'
      }
    }

    return 'loggedin'
  }
  render() {
    const testMode = localStorage.getItem(TEST_MODE) === 'true'
    const userRoleCompanie: UserRoleCompanie = JSON.parse(localStorage.getItem(USER_ROLE_COMPANIE) || '{}')

    const authState = this.getAuthState(userRoleCompanie)

    console.log(authState)

    let me: User = userClass
    let authDevice: AuthDevice = authDeviceClass

    if (this.props.meQuery && this.props.meQuery.me) {
      me = this.props.meQuery.me

      authDevice = JSON.parse(localStorage.getItem(AUTH_DEVICE + '|' + me.email) || '{}')
    }

    return (
      <>
        <MuiThemeProvider theme={theme}>
          <AppContext.Provider
            value={{
              context: {
                // productsQuery: this.state.context.productsQuery,
                testMode,
                authState,
                userRoleCompanie,
                authDevice,
                me,
                // isMobile: this.state.isMobile,
                isSideBarOpenRight: this.state.context.isSideBarOpenRight,
                // isSideBarOpenAdmin: this.state.context.isSideBarOpenAdmin,
                isSideBarOpenLeft: this.state.context.isSideBarOpenLeft,
                // isSideBarOpenLeftCategories: this.state.context.isSideBarOpenLeftCategories,
                refreshContext: this.state.context.refreshContext,
                toggleDrawerRight: this.state.context.toggleDrawerRight,
                isSideBarOpenLeftMobile: this.state.context.isSideBarOpenLeftMobile,
                // toggleDrawerAdmin: this.state.context.toggleDrawerAdmin,
                toggleDrawerLeft: this.state.context.toggleDrawerLeft,
                toggleDrawerLeftMobile: this.state.context.toggleDrawerLeftMobile,
                openSnackBar: this.state.context.openSnackBar,
                logout: this.state.context.logout,
                setModeContext: this.state.context.setModeContext,
                modeContext: this.state.context.modeContext,
                key: this.state.context.key,
                // mode
                // toggleDrawerLeftCategories: this.toggleDrawerLeftCategories,
                // logout: this.logout,
                // refetchMe: this.refetchMe
                // showOnboardProcess
                // showSearchMobile: this.state.context.showSearchMobile,
                // toggleShowSearchMobile: this.toggleShowSearchMobile,
                // searchProducts: this.searchProducts,
              },
            }}>
            <SubApp />
            <SnackBarCustom
              ref={(instance) => {
                this.child = instance
              }}
            />
          </AppContext.Provider>
        </MuiThemeProvider>
      </>
    )
  }
}

export default compose(
  graphql(ME_QUERY_ROLE, {
    name: 'meQuery',
  })
)(App)
