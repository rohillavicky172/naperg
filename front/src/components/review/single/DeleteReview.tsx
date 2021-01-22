import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Review } from '../Review.type'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
// import Button from '@material-ui/core/Button'

export const MUTATION = gql`
  mutation DeleteReviewMutation($reviewId: String!) {
    deleteReview(reviewId: $reviewId) {
      id
    }
  }
`
type Props = {
  review: Review
}

const DeleteReview = (props: Props) => {
  // const { productId }: ParamTypes = useParams<ParamTypes>()
  // const history = useHistory()
  // const [review, setReview] = React.useState(reviewClass)
  // const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [deleteReview] = useMutation(MUTATION)

  const deleteReviewF = async () => {
    let reviewCreated
    try {
      reviewCreated = await deleteReview({
        variables: {
          reviewId: props.review.id,
        },
      })
    } catch (e) {
      //
      console.log(e)
    }
    if (reviewCreated) {
      // console.log(reviewCreated)
      // setMessage('Your Review has been succesfully saved!')
      // setReview(reviewClass)
      client.resetStore()
      // props.onUpdate()
      // history.push('/admin/review/' + reviewCreated.data.deleteReview.id)
    }
  }
  return (
    <ButtonSecondValidation color="primary" variant="outlined" onClick={deleteReviewF} buttonText={'Delete'} size={'medium'} />
  )
}

export default DeleteReview
