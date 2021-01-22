import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../../../nav/ButtonLoadingAfterClick'

export const MUTATION = gql`
  mutation UpdateMetadataProfile($where: UserWhereUniqueInput!) {
    updateMetadataProfile(where: $where) {
      id
      nameFile
    }
  }
`
type Props = {
  userId: string
}

const UpdateMetadataProfile = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState('')

  const [updateMetadataProfile] = useMutation(MUTATION)

  const updateMetadataProfileF = async () => {
    setLoading(true)

    try {
      await updateMetadataProfile({ variables: { where: { id: props.userId } } })
      setResponse('ok')
      setLoading(false)
    } catch (e) {
      if (e.graphQLErrors.length) {
        setResponse(e.graphQLErrors[0].message)
      }
      setLoading(false)
    }
  }
  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButton'}
        disabled={false}
        icon={''}
        size={'medium'}
        buttonText={`UpdateMetadataProfile`}
        buttonLoadingText={`Setting up...`}
        variant="outlined"
        loading={loading}
        color={'secondary'}
        onClick={() => updateMetadataProfileF()}
      />
      <div className="secondary">{response}</div>
    </>
  )
}

export default UpdateMetadataProfile
