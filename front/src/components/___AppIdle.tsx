import React from 'react'
import { AppContext } from './AppContext'
import { Context } from './Context.type'
import IdleTimer from 'react-idle-timer'

const AppIdle = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  function onIdle() {
    console.log('idle')
    context.logout()
  }

  return (
    <>
      <IdleTimer
        // ref={ref => {
        //   idleTimer = ref
        // }}
        element={document}
        // onActive={onActive}
        onIdle={onIdle}
        // onAction={onAction}
        // debounce={250}
        timeout={1000 * 60 * 60 * 6} // 6h
      />
    </>
  )
}

export default AppIdle
