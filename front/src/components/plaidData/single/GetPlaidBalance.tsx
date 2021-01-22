import React from 'react'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
import { GET_PLAID_BALANCE_MUTATION } from '../GraphQL'
import { PlaidData } from '../PlaidData.type'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

type Props = {
  plaidData: PlaidData
}

const GetPlaidBalance = (props: Props) => {
  const [getPlaidBalance] = useMutation(GET_PLAID_BALANCE_MUTATION)
  const [message, setMessage] = React.useState('')
  const client = useApolloClient()
  const getPlaidBalanceF = async () => {
    let plaidData
    try {
      plaidData = await getPlaidBalance({
        variables: {
          plaidDataId: props.plaidData.id,
        },
      })
    } catch (e) {
      setMessage(e.graphQLErrors[0].message)
    }
    if (plaidData) {
      setMessage('Done')
      await client.resetStore()
    }
  }
  return (
    <>
      <ButtonSecondValidation
        color={'primary'}
        size={'medium'}
        variant={'outlined'}
        buttonText={`getPlaidBalance`}
        onClick={() => getPlaidBalanceF()}
      />
      <p className="secondary">{message}</p>
    </>
  )
}

export default GetPlaidBalance
