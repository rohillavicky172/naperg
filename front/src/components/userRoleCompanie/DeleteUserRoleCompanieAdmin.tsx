import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
import gql from 'graphql-tag'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'

export const MUTATION = gql`
  mutation DeleteUserRoleCompanie($where: UserRoleCompanieWhereUniqueInput!) {
    deleteUserRoleCompanie(where: $where) {
      id
    }
  }
`

type Props = {
  userRoleCompanie: UserRoleCompanie
}

const DeleteUserRoleCompanieAdmin = (props: Props) => {
  const client = useApolloClient()
  const [message, setMessage] = React.useState('')
  const [deleteUserRoleCompanie] = useMutation(MUTATION)

  const deleteUserRoleCompanieF = async () => {
    let newCompanie
    try {
      newCompanie = await deleteUserRoleCompanie({
        variables: {
          where: {
            id: props.userRoleCompanie.id,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (newCompanie) {
      setMessage(`User successfully removed!`)
      client.resetStore()
    }
  }

  return (
    <div>
      <ButtonSecondValidation
        id={'DeleteUserRoleCompanieAdmin'}
        color={'secondary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`HARD Delete`}
        onClick={() => deleteUserRoleCompanieF()}
      />

      <div className="secondary">{message}</div>
    </div>
  )
}

export default DeleteUserRoleCompanieAdmin
