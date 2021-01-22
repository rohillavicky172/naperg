import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import { AuthDevice } from '../AuthDevice.type'
import { AUTH_DEVICE } from '../../../config/config'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

type Props = {
  authDevice: AuthDevice
}

const IsDeviceSelected = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  let deviceTokenHeader
  const authDeviceString = localStorage.getItem(AUTH_DEVICE + '|' + context.me.email)

  const authDevice = JSON.parse(authDeviceString ? authDeviceString : '{}')
  console.log(deviceTokenHeader)
  if (authDevice.id !== props.authDevice.id) {
    return null
  }
  return (
    <>
      <Tooltip title={'Current device'}>
        <Icon className="secondary">done</Icon>
      </Tooltip>
    </>
  )
}

export default IsDeviceSelected
