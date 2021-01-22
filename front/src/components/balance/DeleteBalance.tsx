import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'

export const DELETE_BALANCE = gql`
  mutation DeleteBalance($where: BalanceWhereUniqueInput!) {
    deleteBalance(where: $where) {
      id
    }
  }
`

type Props = {
  balanceId: string
}

const DeleteBalance = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const [deleteBalance] = useMutation(DELETE_BALANCE)

  const deleteBalanceF = async () => {
    let balance
    try {
      balance = await deleteBalance({
        variables: {
          where: {
            id: props.balanceId,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
      throw e
    }
    if (balance) {
      client.resetStore()
    }
  }

  return (
    <>
      <ButtonSecondValidation
        id={'deleteBalance'}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Delete balance (admin)`}
        onClick={deleteBalanceF}
      />
      <div className="secondary">{message}</div>
    </>
  )
}

export default DeleteBalance
