import React from 'react'
import { User } from '../../User.type'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

export const UPDATE_USER_MUTATION = gql`
  mutation SubmitUserVerification($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    submitUserVerification(data: $data, where: $where) {
      id
      lastName
      firstName
      birthday
      verificationStatusOffSite
      verificationStatus
      verificationDateSubmission
    }
  }
`

type Props = {
  updateTextButton: string
  disabled: boolean
  user: User
}

const SubmitUserVerification = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)

  const updateUserF = async () => {
    setLoading(true)

    try {
      await updateUser({
        variables: {
          where: { id: props.user.id },
          data: {
            firstName: props.user.firstName,
            lastName: props.user.lastName,
            birthday: props.user.birthday,
          },
        },
      })
    } catch (e) {
      setLoading(false)

      if (e.graphQLErrors.length) {
        setErrorMessage('Error: ' + e.graphQLErrors[0].message)
      }
    }
    setLoading(false)
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'updateUser'}
        icon={''}
        color={'primary'}
        disabled={props.disabled}
        variant="outlined"
        size={'medium'}
        buttonText={props.updateTextButton}
        buttonLoadingText={`Loading...`}
        onClick={() => updateUserF()}
        loading={loading}
      />{' '}
      <span className={'secondary'}>{errorMessage}</span>{' '}
    </>
  )
}

export default SubmitUserVerification
