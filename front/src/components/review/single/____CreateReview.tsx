import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import { Review, reviewClass } from '../Review.type'
import ReviewForm from './ReviewForm'
import { Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { ParamTypes } from '../../ParamTypes.type'
import ProductTitle from '../../product/single/page/ProductTitle'

export const MUTATION = gql`
  mutation CreateReviewMutation($data: ReviewCreateInput!) {
    createReview(data: $data) {
      id
      rating
      content
    }
  }
`
type Props = {
  productId: string
  // product: Product
  // on: () => void
  // cleanFields: () => void
}

const CreateReview = (props: Props) => {
  // const { productId }: ParamTypes = useParams<ParamTypes>()
  // const history = useHistory()
  const [review, setReview] = React.useState(reviewClass)
  // const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [createReview] = useMutation(MUTATION)

  const createReviewF = async () => {
    let reviewCreated
    try {
      reviewCreated = await createReview({
        variables: {
          data: {
            rating: review.rating,
            content: review.content,
            productId: props.productId,
          },
        },
      })
    } catch (e) {
      //
      console.log(e)
    }
    if (reviewCreated) {
      console.log(reviewCreated)
      // setMessage('Your Review has been succesfully saved!')
      setReview(reviewClass)
      client.resetStore()
      // props.onUpdate()
      // history.push('/admin/review/' + reviewCreated.data.createReview.id)
    }
  }
  return (
    <>
      {/* <ProductTitle title="Create new Review for " productId={productId} /> */}
      {/* <div style={{ height: '30px' }} /> */}
      <ReviewForm review={review} setReview={(review: Review) => setReview(review)} />

      <div style={{ height: '30px' }} />
      <Button color="primary" variant="outlined" onClick={() => createReviewF()}>
        {`Create`}
      </Button>
    </>
  )
}

export default CreateReview
