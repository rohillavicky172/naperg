import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import DateComponent from '../../nav/DateComponent'
import IsDeviceSelected from './IsDeviceSelected'
import { AuthDevice } from '../AuthDevice.type'

type Props = {
  authDevice: AuthDevice
}

const NameDevice = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={5} sm={2} className="marginAuto">
        {props.authDevice.browserName === 'chrome-extension' ? (
          <Icon>extension</Icon>
        ) : (
          <>
            {props.authDevice.friendlyDeviceType === 'mobile' ? (
              <>
                {props.authDevice.friendlyOsName === 'Android' ? (
                  <>
                    <Icon>phone_android</Icon>
                    <Icon>android</Icon>
                  </>
                ) : (
                  <>{props.authDevice.friendlyOsName === 'iOS' ? <Icon>phone_iphone</Icon> : <Icon>phone_iphone</Icon>}</>
                )}
              </>
            ) : (
              <>{props.authDevice.friendlyOsName === 'Mac OS' ? <Icon>laptop_mac</Icon> : <Icon>computer</Icon>}</>
            )}

            <IsDeviceSelected authDevice={props.authDevice} />
          </>
        )}
      </Grid>
      <Grid item xs={7} sm={10} className="marginAuto">
        {props.authDevice.browserName === 'chrome-extension' && <>{`Google Chrome extension.`} </>}
        {props.authDevice.friendlyDeviceModel
          ? `${props.authDevice.friendlyDeviceModel}. `
          : `${props.authDevice.friendlyOsName}. `}
        {`Last login on `}
        <DateComponent  date={props.authDevice.lastLogin} />
        {` in `}
        {props.authDevice.city ? props.authDevice.city : props.authDevice.timeZone}
      </Grid>
    </Grid>
  )
}

export default NameDevice
