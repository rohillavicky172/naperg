import React from 'react'

import { ReviewRequest } from '../ReviewRequest.type'
import { Grid, Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'

type Props = {
  reviewRequest: ReviewRequest
  // page: number
  // variables: any
}

const ReviewRequesSingle = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={4} className="">
            <div>
              Invited by: {props.reviewRequest.userRequester.firstName} {props.reviewRequest.userRequester.lastName}
            </div>
            <div>
              Sent: <DateComponent date={props.reviewRequest.createdAt} />
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <div>
              {props.reviewRequest.firstName} {props.reviewRequest.lastName}
            </div>
            <div>{props.reviewRequest.email}</div>
            <div> {props.reviewRequest.companieName}</div>
          </Grid>

          <Grid item xs={12} sm={4} className="">
            <div>Private Message:</div>
            {props.reviewRequest.privateMessageInviter}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default ReviewRequesSingle
