import React from 'react'
import { Link } from 'react-router-dom'
import { ReviewRequest } from '../../ReviewRequest.type'
import { Grid, Paper } from '@material-ui/core'
import DateComponent from '../../../nav/DateComponent'
import ReviewRequestDelete from './ReviewRequestDelete'

type Props = {
  reviewRequest: ReviewRequest
  // page: number
  // variables: any
}

const ReviewRequesAdminSingle = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={4} className="">
            {props.reviewRequest.email}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.reviewRequest.firstName} {props.reviewRequest.lastName}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            Sent: <DateComponent date={props.reviewRequest.createdAt} />
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.reviewRequest.privateMessageInviter}
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/product/${props.reviewRequest.product.id}`}>
              {props.reviewRequest.product.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <Link className="link" to={`/company/${props.reviewRequest.companieRequester.id}`}>
              {props.reviewRequest.companieRequester.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            <ReviewRequestDelete reviewRequestId={props.reviewRequest.id} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default ReviewRequesAdminSingle
