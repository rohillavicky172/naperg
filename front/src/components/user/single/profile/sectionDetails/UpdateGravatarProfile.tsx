import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../../../nav/ButtonLoadingAfterClick'

export const MUTATION = gql`
  mutation UpdateGravatarProfile($where: UserWhereUniqueInput!) {
    updateGravatarProfile(where: $where) {
      id
      nameFile
    }
  }
`
type Props = {
  userId: string
}

const UpdateGravatarProfile = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState('')

  const [updateGravatarProfile] = useMutation(MUTATION)

  const updateGravatarProfileF = async () => {
    setLoading(true)

    // let response
    try {
      await updateGravatarProfile({ variables: { where: { id: props.userId } } })
      setResponse('ok')
      setLoading(false)
    } catch (e) {
      if (e.graphQLErrors.length) {
        setResponse(e.graphQLErrors[0].message)
      }
      setLoading(false)
    }
    // console.log(response.data)
  }
  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButton'}
        disabled={false}
        icon={''}
        size={'medium'}
        buttonText={`UpdateGravatarProfile`}
        buttonLoadingText={`Setting up...`}
        variant="outlined"
        loading={loading}
        color={'secondary'}
        onClick={() => updateGravatarProfileF()}
      />
      <div className="secondary">{response}</div>
    </>
  )
}

export default UpdateGravatarProfile
