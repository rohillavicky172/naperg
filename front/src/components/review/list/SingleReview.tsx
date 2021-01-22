import React from 'react'
import { Button, Grid } from '@material-ui/core'
import DateComponent from '../../nav/DateComponent'
import { Rating } from '@material-ui/lab/'
import { Review } from '../Review.type'
import ImageTemplate from '../../nav/ImageTemplate'
import { Link } from 'react-router-dom'
import { Product } from '../../product/Product.type'

type Props = {
  review: Review
  product: Product
}

const SingleReview = (props: Props) => {
  return (
    <Grid container>
      <Grid item xs={12} sm={3} className="">
        <ImageTemplate format={'avatar'} nameFile={props.review.user.nameFile} />
        <Link className="link" to={'/settings/' + props.review.user.id}>
          {props.review.user.firstName} {props.review.user.shortLastName}
        </Link>
        {props.review.userRoleCompanie && <div>{props.review.userRoleCompanie.companie.name}</div>}

        <div>
          <DateComponent date={props.review.createdAt} />
        </div>
      </Grid>

      <Grid item xs={12} sm={3} className="marginAuto">
        <div>
          <Rating name="rating" value={props.review.rating} readOnly />
        </div>
        {props.review.content}
      </Grid>

      <Grid item xs={12} sm={2} className="tar">
        <a rel="noopener noreferrer" target="_blank" href={`https://nachonacho.com/product/${props.product.urlName}`}>
          <Button color="primary" variant="outlined">
            View
          </Button>
        </a>
      </Grid>
    </Grid>
  )
}

export default SingleReview
