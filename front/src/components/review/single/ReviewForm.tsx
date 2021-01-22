import React from 'react'
import { Input, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core/'
import { Rating } from '@material-ui/lab/'
import { Review } from '../Review.type'
// import utils from '../../utils'

type Props = {
  setReview: (review: Review) => void
  review: Review
}

const ReviewForm = (props: Props) => {
  return (
    <>
      <div>
        <Rating
          name="rating"
          value={props.review.rating}
          onChange={(event, newValue) => {
            props.setReview({
              ...props.review,
              rating: Number(newValue),
            })
          }}
        />
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="userTypeReview">{`userTypeReview`}</InputLabel>
          <Select
            id="userTypeReview"
            value={props.review.userTypeReview}
            onChange={(e: any) =>
              props.setReview({
                ...props.review,
                userTypeReview: e.target.value,
              })
            }>
            <MenuItem value={'VERIFIED_BUYER'}>{`VERIFIED_BUYER`}</MenuItem>
            <MenuItem value={'SELLER'}>{`SELLER`}</MenuItem>
            <MenuItem value={'REGULAR_USER'}>{`REGULAR_USER`}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="content">{`content`}</InputLabel>
          <Input
            id="content"
            type="text"
            multiline
            value={props.review.content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.setReview({
                ...props.review,
                content: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
    </>
  )
}

export default ReviewForm
