import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { TrackingLink } from '../TrackingLink.type'

type Props = {
  trackingLink: TrackingLink
}

const SingleTrackingLink = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            <DateComponent date={props.trackingLink.date} />
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {props.trackingLink.user && (
              <Link className="link" to={`/user/${props.trackingLink.user.id}`}>
                {props.trackingLink.user.firstName} {props.trackingLink.user.lastName}
              </Link>
            )}
            <br />
            {props.trackingLink.companie && (
              <Link className="link" to={`/company/${props.trackingLink.companie.id}`}>
                {props.trackingLink.companie.name}
              </Link>
            )}
          </Grid>
          <Grid item xs={12} sm={2} className="">
            <Link className="link" to={`/product/${props.trackingLink.product.id}`}>
              {props.trackingLink.product.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.trackingLink.origin} <br />
            <a itemProp="sameAs" rel="noopener noreferrer" target="_blank" href={props.trackingLink.link}>
              {props.trackingLink.link}
            </a>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleTrackingLink
