import React, { useEffect } from 'react'
// import ReactGA from 'react-ga'
import { AppContext } from './AppContext'
import { Context } from './Context.type'
// import { REACTGA_ID } from '../config/config'

import LogRocket from 'logrocket'
LogRocket.init('78jtza/nachnacho')

const ReactGATracking = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  useEffect(() => {
    // console.log('init GA Auth')

    if (context.me) {
      LogRocket.identify(context.me.id, {
        name: context.me.firstName + ' ' + context.me.lastName,
        email: context.me.email,
        // Add your own custom user variables here, ie:
        // subscriptionType: 'pro',
      })
    }
    // ReactGA.initialize(REACTGA_ID)
    // ReactGA.pageview(window.location.pathname)
  }, [context.me])

  return null
}
export default ReactGATracking
