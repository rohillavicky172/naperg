import React from 'react'
import gql from 'graphql-tag'
import { AppContext } from '../../../AppContext'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
// import { User } from '../../User.type'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Context } from '../../../Context.type'

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

type Props = {
  userId: string
}

const DeleteUser = (props: Props) => {
  const client = useApolloClient()
  const [deleteUser] = useMutation(DELETE_USER_MUTATION)

  const { context }: { context: Context } = React.useContext(AppContext)

  const isUserMyself = (userId) => {
    if (context.me.id) {
      return context.me.id === userId
    }
    return false
  }

  const deleteUserF = async () => {
    await deleteUser({
      variables: { id: props.userId },
    })
    client.resetStore()
  }

  return (
    <>
      <ButtonSecondValidation
        disabled={isUserMyself(props.userId)}
        buttonText={`Delete user`}
        color="secondary"
        size={'small'}
        variant="outlined"
        onClick={deleteUserF}
      />
    </>
  )
}

export default DeleteUser
