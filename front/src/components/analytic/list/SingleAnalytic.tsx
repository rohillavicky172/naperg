import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { Analytic } from '../Analytic.type'

type Props = {
  analytic: Analytic
}

const SingleAnalytic = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            <DateComponent date={props.analytic.createdAt} />
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.analytic.type}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.analytic.userId && (
              <Link className="link" to={`/settings/${props.analytic.userId}`}>
                User
              </Link>
            )}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            {props.analytic.companieId}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.analytic.productId && (
              <Link className="link" to={`/product/${props.analytic.productId}`}>
                Product
              </Link>
            )}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            IsBot: {props.analytic.isBot ? `True (${props.analytic.nameBot})` : 'False'}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            ip: {props.analytic.ip}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            {props.analytic.country} / {props.analytic.region}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.analytic.timezone}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.analytic.city}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            origin: {props.analytic.origin}
          </Grid>
          <Grid item xs={12} sm={12} className="">
            origin Full: {props.analytic.url}
          </Grid>
          <Grid item xs={12} sm={12} className="">
            to: {props.analytic.urlTo}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyBrowserName: {props.analytic.friendlyBrowserName}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyBrowserVersion: {props.analytic.friendlyBrowserVersion}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyBrowserMajor: {props.analytic.friendlyBrowserMajor}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyBrowserMajor: {props.analytic.friendlyBrowserMajor}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyEngineName: {props.analytic.friendlyEngineName}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyOsName: {props.analytic.friendlyOsName}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyOsVersion: {props.analytic.friendlyOsVersion}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyDeviceVendor: {props.analytic.friendlyDeviceVendor}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyDeviceModel: {props.analytic.friendlyDeviceModel}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyDeviceType: {props.analytic.friendlyDeviceType}
          </Grid>

          <Grid item xs={12} sm={12} className="">
            friendlyCpuArchitecture: {props.analytic.friendlyCpuArchitecture}
          </Grid>
          <Grid item xs={12} sm={12} className="">
            userAgent: {props.analytic.userAgent}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleAnalytic
