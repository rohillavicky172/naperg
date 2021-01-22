import React from 'react'
import { Button, Grid, Paper } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import { Rating } from '@material-ui/lab/'
import { Review } from '../Review.type'
import EditReview from '../single/EditReview'
import ImageTemplate from '../../nav/ImageTemplate'
import DeleteReview from '../single/DeleteReview'
import { Link } from 'react-router-dom'

type Props = {
  review: Review
}

const SingleReviewAdmin = (props: Props) => {
  const [isEdit, setIsEdit] = React.useState(false)
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        {isEdit ? (
          <>
            <EditReview review={props.review} onUpdate={() => setIsEdit(false)} onCancel={() => setIsEdit(false)} />
          </>
        ) : (
          <Grid container>
            <Grid item xs={12} sm={3} className="">
              <ImageTemplate format={'avatar'} nameFile={props.review.user.nameFile} />
              <Link className="link" to={'/settings/' + props.review.user.id}>
                {props.review.user.firstName} {props.review.user.lastName}
              </Link>
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              <Link className="link" to={'/product/' + props.review.product.id}>
                {props.review.product.name}
              </Link>
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              {props.review.userRoleCompanie && (
                <Link className="link" to={'/company/' + props.review.userRoleCompanie.companie.id}>
                  {props.review.userRoleCompanie.companie.name}
                </Link>
              )}
            </Grid>
            <Grid item xs={12} sm={3} className="marginAuto">
              {props.review.content}
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              {props.review.userTypeReview}
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              <DateComponent date={props.review.createdAt} />
            </Grid>

            <Grid item xs={12} sm={2} className="marginAuto">
              <Rating name="rating" value={props.review.rating} readOnly />
            </Grid>
            <Grid item xs={12} sm={2} className="tar">
              <Button color="primary" variant="outlined" onClick={() => setIsEdit(true)}>
                Edit
              </Button>{' '}
              <DeleteReview review={props.review} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </div>
  )
}

export default SingleReviewAdmin
