import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import { Link } from 'react-router-dom'
import { CampaignHistoric } from '../CampaignHistoric.type'
import DeleteCampaignHistoric from '../action/DeleteCampaignHistoric'

type Props = {
  campaignHistoric: CampaignHistoric
}

const SingleCampaignHistoric = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            <DateComponent date={props.campaignHistoric.createdAt} />
          </Grid>
          <Grid item xs={12} sm={3} className="">
            <Link className="link" to={`/user/${props.campaignHistoric.user.id}`}>
              {props.campaignHistoric.user.firstName} {props.campaignHistoric.user.lastName}
            </Link>
          </Grid>
          <Grid item xs={12} sm={3} className="">
            <Link className="link" to={`/admin/campaign/${props.campaignHistoric.campaign.id}`}>
              {props.campaignHistoric.campaign.name}
            </Link>
          </Grid>

          <Grid item xs={12} sm={2} className="">
            actionUnsubscribe: {props.campaignHistoric.actionUnsubscribe ? 'True' : 'False'}{' '}
            {props.campaignHistoric.dateActionUnsubscribe && (
              <>
                (<DateComponent date={props.campaignHistoric.dateActionUnsubscribe} />)
              </>
            )}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            <DeleteCampaignHistoric campaignHistoricId={props.campaignHistoric.id} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleCampaignHistoric
