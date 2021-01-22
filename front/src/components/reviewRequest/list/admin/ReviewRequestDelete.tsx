import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'

export const MUTATION = gql`
  mutation ReviewRequestDelete($id: ID!) {
    reviewRequestDelete(id: $id) {
      id
    }
  }
`

type Props = {
  reviewRequestId: string
}

const ReviewRequestDelete = (props: Props) => {
  const client = useApolloClient()
  const [requestUserReview] = useMutation(MUTATION)
  const [message, setMessage] = React.useState('')

  const _confirm = async () => {
    try {
      await requestUserReview({
        variables: {
          id: props.reviewRequestId,
        },
      })
    } catch (e) {
      setMessage(`Error.`)
      throw e
    }

    setMessage(`Deleted`)
    client.resetStore()
  }

  return (
    <>
      <ButtonSecondValidation
        id={'idButton'}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Delete`}
        onClick={_confirm}
      />

      <div className="secondary">{message}</div>
    </>
  )
}

export default ReviewRequestDelete
