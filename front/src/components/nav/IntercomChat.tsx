import React from 'react'
import { INTERCOM_APP_ID } from '../../config/config'
import { IntercomProvider, useIntercom } from 'react-use-intercom'
import UseWindowDimensions from '../UseWindowDimensions'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'

const IntercomChat = () => {
  return (
    <IntercomProvider appId={INTERCOM_APP_ID}>
      <HomePage />
    </IntercomProvider>
  )
}

const HomePage = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const isMobile = UseWindowDimensions.isMobile()
  const location = useLocation()
  const {
    boot,
    shutdown,

    show,
  } = useIntercom()

  React.useEffect(() => {
    if (!context.me.id) return

    const user = {
      userId: context.me.id,
      email: context.me.email,
      name: context.me.firstName + ' ' + context.me.lastName,
    }

    if (isMobile) {
      if (location.pathname === '/contact') {
        boot(user)
        show()
      } else {
        shutdown()
      }
    } else {
      boot(user)
    }
  }, [isMobile, location, context, boot, show, shutdown])

  return null
}
export default IntercomChat
