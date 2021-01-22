import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UPDATE_BALANCE_MUTATION } from './GraphQL'
import { Balance } from '../balance/Balance.type'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'

type Props = {
  balance: Balance
}

const UpdateBalance = (props: Props) => {
  const [updateBalance] = useMutation(UPDATE_BALANCE_MUTATION)
  const client = useApolloClient()

  const updateBalanceF = async () => {
    let charge

    try {
      charge = await updateBalance({
        variables: {
          data: {
            isEnabled: props.balance.isEnabled,
          },
          where: {
            id: props.balance.id,
          },
        },
      })
    } catch (e) {
      throw e
    }
    if (charge) {
      client.resetStore()
    }
  }

  return (
    <div>
      <ButtonSecondValidation
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Update balance`}
        onClick={() => updateBalanceF()}
      />
    </div>
  )
}

export default UpdateBalance
