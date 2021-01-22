import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

export const MUTATION = gql`
  mutation ApproveOwnerOfCompanieVerification($companieId: String!) {
    approveOwnerOfCompanieVerification(companieId: $companieId) {
      id
      ownerOfCompanieVerificationStatus
    }
  }
`

type Props = {
  companieId: string
}

const ApproveCompanieOwnerOfCompanieVerification = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
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
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    if (newCompanie) {
      setMessage('Ok!')
      setLoading(false)
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButtonUpdateCompanie'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={'Approve (+ send email)'}
        buttonLoadingText={`Loading...`}
        onClick={() => updateCompanieF()}
        loading={loading}
      />
      <p className="secondary">{message}</p>
    </>
  )
}

export default ApproveCompanieOwnerOfCompanieVerification
