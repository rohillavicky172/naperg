import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
import { PlaidData } from '../PlaidData.type'
import gql from 'graphql-tag'

export const MUTATION = gql`
  mutation DeleteplaidData($where: PlaidDataWhereUniqueInput!) {
    deletePlaidData(where: $where) {
      id
    }
  }
`

type Props = {
  plaidData: PlaidData
}

const DeletePlaidData = (props: Props) => {
  const [deletePlaidDataMutation] = useMutation(MUTATION)
  const [message, setMessage] = React.useState('')

  const client = useApolloClient()
  const deletePlaidData = async () => {
    let plaidData
    try {
      plaidData = await deletePlaidDataMutation({
        variables: {
          where: {
            id: props.plaidData.id,
          },
        },
      })
    } catch (e) {
      setMessage(e.graphQLErrors[0].message)
    }
    if (plaidData) {
      client.resetStore()
    }
  }
  return (
    <>
      <ButtonSecondValidation
        color={'primary'}
        size={'small'}
        variant={'text'}
        buttonText={`Delete`}
        onClick={() => deletePlaidData()}
      />
      <p className="secondary">{message}</p>
    </>
  )
}

export default DeletePlaidData
