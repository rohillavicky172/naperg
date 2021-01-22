import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { Campaign } from '../Campaign.type'

type Props = {
  campaign: Campaign
}

const SingleCampaign = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            <Link className="link" to={`/admin/campaign/${props.campaign.id}`}>
              {props.campaign.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} className="">
            <DateComponent date={props.campaign.createdAt} />
          </Grid>
          <Grid item xs={12} sm={3} className="">
            <Link className="link" to={`/user/${props.campaign.user.id}`}>
              {props.campaign.user.firstName} {props.campaign.user.lastName}
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} className="">
            Active:{props.campaign.isActive ? 'true' : 'false'} / {props.campaign.status}
          </Grid>
          {/* 
          <Grid item xs={12} sm={2} className="">
            <Link className="link" to={`/product/${props.campaign.product.id}`}>
              {props.campaign.product.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.campaign.origin} <br />
            <a itemProp="sameAs" rel="noopener noreferrer" target="_blank" href={props.campaign.link}>
              {props.campaign.link}
            </a>
          </Grid> */}
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleCampaign
