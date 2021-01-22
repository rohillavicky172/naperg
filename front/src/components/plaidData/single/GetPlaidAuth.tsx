import React from 'react'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
import { useMutation } from '@apollo/react-hooks'
import { GET_PLAID_AUTH_MUTATION } from '../GraphQL'
import { PlaidData } from '../PlaidData.type'

type Props = {
  plaidData: PlaidData
}

const GetPlaidAuth = (props: Props) => {
  let message = ''

  const [getAuth, data] = useMutation(GET_PLAID_AUTH_MUTATION)
  const [response, setResponse] = React.useState('')

  if (data.error) {
    message = data.error.message
  }

  const getAuthF = async (id: string) => {
    let plaidData
    try {
      plaidData = await getAuth({
        variables: {
          plaidDataId: id,
        },
      })
    } catch (e) {
      message = e.graphQLErrors[0].message
    }
    // console.log(message)

    if (plaidData && plaidData.data) {
      // console.log(plaidData.data.getPlaidAuth)
      setResponse(plaidData.data.getPlaidAuth)
    }
  }
  // console.log(response)
  return (
    <>
      <ButtonSecondValidation
        color={'primary'}
        size={'small'}
        variant={'text'}
        buttonText={`getAuth`}
        onClick={() => getAuthF(props.plaidData.id)}
      />
      {message && <div className="secondary">{message}</div>}
      {response && <pre>{JSON.stringify(JSON.parse(response), null, 2)}</pre>}
    </>
  )
}

export default GetPlaidAuth
