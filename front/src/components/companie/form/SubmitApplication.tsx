import React from 'react'
import { useMutation } from '@apollo/react-hooks'

import { Companie } from '../Companie.type'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

export const MUTATION = gql`
  mutation SubmitApplication($companieId: ID!) {
    submitApplication(companieId: $companieId) {
      id
      statusApplication
    }
  }
`

type Props = {
  companie: Companie
  onCancel: () => void
  onUpdate: (companie: Companie) => void
}

const SubmitApplication = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [submitApplication] = useMutation(MUTATION)

  const submitApplicationF = async () => {
    setLoading(true)
    let newCompanie
    try {
      newCompanie = await submitApplication({
        variables: {
          companieId: props.companie.id,
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setErrorMessage(graphQLError.message))
    }
    if (newCompanie) {
      setLoading(false)
      props.onUpdate(newCompanie)
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'SubmitApplicationId'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={'Submit'}
        buttonLoadingText={`Loading...`}
        onClick={() => submitApplicationF()}
        loading={loading}
      />
      <p className="secodary">{errorMessage}</p>
    </>
  )
}

export default SubmitApplication
