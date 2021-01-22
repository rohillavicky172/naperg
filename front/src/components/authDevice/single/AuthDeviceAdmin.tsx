import React from 'react'
import { Grid, Button, Paper } from '@material-ui/core/'
import DateComponent from '../../nav/DateComponent'
import DeleteAuthDevice from './DeleteAuthDevice'
import UpdateAuthDevice from './UpdateAuthDevice'
import { Link } from 'react-router-dom'
import { AuthDevice } from '../AuthDevice.type'

type Props = {
  authDevice: AuthDevice
}

const AuthDeviceAdmin = (props: Props) => {
  const [show, setShow] = React.useState(false)

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Button onClick={() => setShow(!show)}>{`Admin Details`}</Button>
        {show && (
          <Grid container>
            <Grid item xs={12} sm={12} className="">
              <UpdateAuthDevice authDevice={props.authDevice} />
            </Grid>
            <Grid item xs={12} sm={12} className="">
              deviceToken: {props.authDevice.deviceToken}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyBrowserName: {props.authDevice.friendlyBrowserName}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyBrowserVersion: {props.authDevice.friendlyBrowserVersion}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyBrowserMajor: {props.authDevice.friendlyBrowserMajor}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyEngineName: {props.authDevice.friendlyEngineName}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyEngineVersion: {props.authDevice.friendlyEngineVersion}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              timeZoneOffset: {props.authDevice.timeZoneOffset}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              timeZone: {props.authDevice.timeZone}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              country: {props.authDevice.country}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              region: {props.authDevice.region}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              eu: {props.authDevice.eu}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              city: {props.authDevice.city}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyOsName: {props.authDevice.friendlyOsName}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyOsVersion: {props.authDevice.friendlyOsVersion}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyDeviceVendor: {props.authDevice.friendlyDeviceVendor}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyDeviceModel: {props.authDevice.friendlyDeviceModel}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyDeviceType: {props.authDevice.friendlyDeviceType}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              friendlyCpuArchitecture: {props.authDevice.friendlyCpuArchitecture}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              userAgent: {props.authDevice.userAgent}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              browserVersion1a: {props.authDevice.browserVersion1a}
            </Grid>

            <Grid item xs={12} sm={12} className="">
              browserVersion1b: {props.authDevice.browserVersion1b}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              createdAt: <DateComponent date={props.authDevice.createdAt} />
            </Grid>
            <Grid item xs={12} sm={12} className="">
              lastLogin: <DateComponent date={props.authDevice.lastLogin} />
            </Grid>

            <Grid item xs={12} sm={12} className="">
              ip: {props.authDevice.ip}
            </Grid>

            <Grid item xs={12} sm={12} className="">
              language: {props.authDevice.language}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              timeZone: {props.authDevice.timeZone}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              browserName: {props.authDevice.browserName}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              browserEngine: {props.authDevice.browserEngine}
            </Grid>

            <Grid item xs={12} sm={12} className="">
              browserLanguage: {props.authDevice.browserLanguage}
            </Grid>

            <Grid item xs={12} sm={12} className="">
              browserPlatform: {props.authDevice.browserPlatform}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              javaEnabled: {props.authDevice.javaEnabled ? 'true' : 'false'}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              dataCookiesEnabled: {props.authDevice.dataCookiesEnabled ? 'true' : 'false'}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              browserOnline: {props.authDevice.browserOnline ? 'true' : 'false'}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              sizeScreenW: {props.authDevice.sizeScreenW}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              sizeScreenH: {props.authDevice.sizeScreenH}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              sizeInW: {props.authDevice.sizeInW}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              sizeInH: {props.authDevice.sizeInH}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              sizeAvailW: {props.authDevice.sizeAvailW}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              sizeAvailH: {props.authDevice.sizeAvailH}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              scrColorDepth: {props.authDevice.scrColorDepth}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              scrPixelDepth: {props.authDevice.scrPixelDepth}
            </Grid>
            <Grid item xs={12} sm={12} className="">
              User:{' '}
              <Link className="link" to={'/user/' + props.authDevice.user.id}>
                {props.authDevice.user.firstName} {props.authDevice.user.lastName}
              </Link>
            </Grid>
            <Grid item xs={12} sm={12} className="">
              <DeleteAuthDevice authDevice={props.authDevice} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  )
}

export default AuthDeviceAdmin
