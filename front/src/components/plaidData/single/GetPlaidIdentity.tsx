import React from 'react'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { GET_PLAID_IDENTITY_MUTATION } from '../GraphQL'
import { PlaidData } from '../PlaidData.type'

type Props = {
  plaidData: PlaidData
}

const GetPlaidIdentity = (props: Props) => {
  const client = useApolloClient()
  const [getPlaidIdentity] = useMutation(GET_PLAID_IDENTITY_MUTATION)
  const [message, setMessage] = React.useState('')

  const getPlaidIdentityF = async (id: string) => {
    let plaidData
    try {
      plaidData = await getPlaidIdentity({
        variables: {
          plaidDataId: id,
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
      <div>
        <ButtonSecondValidation
          color={'primary'}
          size={'medium'}
          variant={'outlined'}
          buttonText={`GetPlaidIdentity`}
          onClick={() => getPlaidIdentityF(props.plaidData.id)}
        />
      </div>
      <p className={'secondary'}>{message}</p>
    </>
  )
}

export default GetPlaidIdentity
