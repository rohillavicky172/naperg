import React from 'react'
import Grid from '@material-ui/core/Grid'
// import Tooltip from '@material-ui/core/Tooltip'
// import DateComponent from '../../nav/DateComponent'
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Slack } from '../Slack.type'
import { Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import DeleteSlack from '../DeleteSlack'

type Props = {
  slack: Slack
}

const SingleAdminSlack = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            Workspace: {props.slack.team_name}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            createdAt: <DateComponent date={props.slack.createdAt} />
          </Grid>
          <Grid item xs={12} sm={3} className="">
            User:{' '}
            {props.slack.user && (
              <Link className="link" to={'/user/' + props.slack.user.id}>
                {props.slack.user.firstName} {props.slack.user.lastName}
              </Link>
            )}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {`Company: `}{' '}
            {props.slack.companie && (
              <Link className="link" to={'/company/' + props.slack.companie.id}>
                {props.slack.companie.name}
              </Link>
            )}
          </Grid>

          <Grid item xs={12} sm={3} className="">
            {`authed_user_id: `}
            {props.slack.authed_user_id}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            <DeleteSlack slackId={props.slack.id} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleAdminSlack
