import React from 'react'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { useMutation } from '@apollo/react-hooks'
// import { GET_PLAID_AUTH_MUTATION } from '../GraphQL'
import { Source } from '../../Source.type'
import gql from 'graphql-tag'

export const RETRIEVE_SOURCE_IN_STRIPE_MUTATION = gql`
  mutation RetrieveSourceInStripe($where: SourceWhereUniqueInput!) {
    retrieveSourceInStripe(where: $where)
  }
`

type Props = {
  source: Source
}

const RetrieveSourceInStripe = (props: Props) => {
  let message = ''

  const [getAuth, data] = useMutation(RETRIEVE_SOURCE_IN_STRIPE_MUTATION)
  const [response, setResponse] = React.useState('')

  if (data.error) {
    message = data.error.message
  }

  const getAuthF = async () => {
    let plaidData
    try {
      plaidData = await getAuth({
        variables: {
          where: {
            id: props.source.id,
          },
        },
      })
    } catch (e) {
      message = e.graphQLErrors[0].message
    }
    console.log(plaidData.data)

    if (plaidData && plaidData.data) {
      setResponse(plaidData.data.retrieveSourceInStripe)
    }
  }
  console.log(response)
  return (
    <>
      <ButtonSecondValidation
        color={'primary'}
        size={'small'}
        variant={'text'}
        buttonText={`RetrieveSourceInStripe`}
        onClick={() => getAuthF()}
      />
      {message && <div className="secondary">{message}</div>}
      {response && <pre>{JSON.stringify(JSON.parse(response), null, 2)}</pre>}
    </>
  )
}

export default RetrieveSourceInStripe
