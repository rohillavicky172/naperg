import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'

export const UPDATE_USER_MUTATION = gql`
  mutation ApproveUserVerification($userId: String!) {
    approveUserVerification(userId: $userId) {
      id
      verificationStatus
      verificationStatusOffSite
      verificationDateSubmission
    }
  }
`

type Props = {
  userId: string
}

const ApproveUserVerification = (props: Props) => {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const updateUserF = async () => {
    let updatedUser
    try {
      updatedUser = await updateUser({
        variables: {
          userId: props.userId,
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setErrorMessage(graphQLError.message))
    }
    if (updatedUser) {
      setErrorMessage('Ok!')
    }
  }

  return (
    <>
      <ButtonSecondValidation
        id={'updateUserId'}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={'Approve (+ send Email)'}
        onClick={updateUserF}
      />

      <div className={'secondary'}>{errorMessage}</div>
    </>
  )
}

export default ApproveUserVerification
