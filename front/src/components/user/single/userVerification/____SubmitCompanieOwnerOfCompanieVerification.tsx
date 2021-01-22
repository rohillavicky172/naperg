import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

export const MUTATION = gql`
  mutation SubmitOwnerOfCompanieVerification($companieId: String!) {
    submitOwnerOfCompanieVerification(companieId: $companieId) {
      id
      # ownerOfCompanieVerificationStatus
    }
  }
`

type Props = {
  disabled: boolean
  textButton: string
  companieId: string
  onUpdate: () => void
}

const SubmitCompanieOwnerOfCompanieVerification = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('')
  const [updateCompanie] = useMutation(MUTATION)

  const updateCompanieF = async () => {
    setLoading(true)
    let newCompanie
    try {
      newCompanie = await updateCompanie({
        variables: {
          companieId: props.companieId,
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setErrorMessage(graphQLError.message))
    }
    if (newCompanie) {
      props.onUpdate()
      setLoading(false)
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButtonUpdateCompanie'}
        icon={''}
        color={'primary'}
        disabled={props.disabled}
        variant={'outlined'}
        size={'medium'}
        buttonText={props.textButton}
        buttonLoadingText={`Loading...`}
        onClick={() => updateCompanieF()}
        loading={loading}
      />
      <p className="secodary">{errorMessage}</p>
    </>
  )
}

export default SubmitCompanieOwnerOfCompanieVerification
