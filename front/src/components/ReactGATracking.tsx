import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { AppContext } from './AppContext'
import { Context } from './Context.type'
import { REACTGA_ID } from '../config/config'
import { useLocation } from 'react-router-dom'

const ReactGATracking = () => {
  const location = useLocation()
  const { context }: { context: Context } = React.useContext(AppContext)
  useEffect(() => {
    console.log('init GA')
    ReactGA.initialize(REACTGA_ID)
  }, [])
  useEffect(() => {
    const currentPath = location.pathname
    if (context.me) {
      console.log('init GA Auth')

      ReactGA.set({
        page: currentPath,
        userId: context.me.id,
        dimension1: context.me.firstName,
        dimension2: context.me.lastName,
        dimension3: context.me.email,
      })
      ReactGA.pageview(currentPath)
    } else {
      console.log('init GA not Auth')
      ReactGA.set({ page: currentPath })
      ReactGA.pageview(currentPath)
    }
  }, [context.me, location.pathname])

  return null
}
export default ReactGATracking
