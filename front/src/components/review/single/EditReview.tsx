import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { Review } from '../Review.type'
import ReviewForm from './ReviewForm'
// import { Product } from '../../product/Product.type'
// import { useHistory } from 'react-router-dom'

export const MUTATION = gql`
  mutation UpdateReviewMutation($data: ReviewUpdateInput!, $where: ReviewWhereUniqueInput!) {
    updateReview(data: $data, where: $where) {
      id
      rating
      headline
      userTypeReview
      content
    }
  }
`

type Props = {
  review: Review
  // product: Product
  onUpdate: () => void
  onCancel: () => void
  // cleanFields: () => void
}

const EditReview = (props: Props) => {
  // const history = useHistory()
  const [review, setReview] = React.useState(props.review)
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [updateReview] = useMutation(MUTATION)

  const updateReviewF = async () => {
    let reviewUpdated
    try {
      reviewUpdated = await updateReview({
        variables: {
          data: {
            rating: review.rating,
            userTypeReview: review.userTypeReview,
            headline: review.headline,
            content: review.content,
          },
          where: {
            id: review.id,
          },
        },
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
      // setMessage(e.graphQLErrors[0].message)
    }
    if (reviewUpdated) {
      client.resetStore()
      props.onUpdate()
    }
    // history.push('/admin/reviews')
  }
  return (
    <>
      <ReviewForm review={review} setReview={(review: Review) => setReview(review)} />
      <div style={{ height: '10px' }} />
      <Button color="primary" variant="outlined" onClick={() => updateReviewF()}>
        {`Save`}
      </Button>{' '}
      <Button onClick={() => props.onCancel()}>Cancel</Button>
      <div className="secondary">{message}</div>
    </>
  )
}

export default EditReview
