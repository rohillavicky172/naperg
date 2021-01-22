import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
import { PlaidData } from '../PlaidData.type'
import gql from 'graphql-tag'

export const MUTATION = gql`
  mutation ResetLoginPlaid($where: PlaidDataWhereUniqueInput!) {
    resetLoginPlaid(where: $where) {
      id
    }
  }
`

type Props = {
  plaidData: PlaidData
}

const ResetLoginPlaid = (props: Props) => {
  const [resetLoginPlaid] = useMutation(MUTATION)
  const [message, setMessage] = React.useState('')

  const client = useApolloClient()
  const resetLoginPlaidF = async () => {
    try {
      await resetLoginPlaid({
        variables: {
          where: {
            id: props.plaidData.id,
          },
        },
      })
    } catch (e) {
      setMessage(e.graphQLErrors[0].message)
    }
    client.resetStore()
  }
  return (
    <>
      <ButtonSecondValidation
        color={'primary'}
        size={'medium'}
        variant={'outlined'}
        buttonText={`ResetLoginPlaid (testMode Only)`}
        onClick={() => resetLoginPlaidF()}
      />
      <p className="secondary">{message}</p>
    </>
  )
}

export default ResetLoginPlaid
