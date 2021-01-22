import React from 'react'
import gql from 'graphql-tag'
import { Companie } from './Companie.type'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'

type Props = {
  companie: Companie
}

export const DELETE_COMPANIE_MUTATION = gql`
  mutation DeleteCompanie($where: CompanieWhereUniqueInput!) {
    deleteCompanie(where: $where) {
      id
    }
  }
`

const DeleteCompanie = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [deleteCompanie] = useMutation(DELETE_COMPANIE_MUTATION)

  const deleteCompanieF = async () => {
    let result
    try {
      result = await deleteCompanie({
        variables: {
          where: {
            id: props.companie.id,
          },
        },
      })
    } catch (e) {
      setMessage(e.graphQLErrors[0].message)
    }
    if (result) {
      client.resetStore()
    }
  }

  return (
    <>
      <ButtonSecondValidation
        id={'deleteCompanie'}
        color={'primary'}
        size={'medium'}
        variant={'outlined'}
        buttonText={`Delete Companie (admin)`}
        onClick={() => deleteCompanieF()}
      />
      <div className="secondary">{message}</div>
    </>
  )
}
export default DeleteCompanie
