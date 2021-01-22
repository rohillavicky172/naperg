import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'

export const UPDATE_FILE_MUTATION = gql`
  mutation UpdateFileMutation($data: FileUpdateInput!, $where: FileWhereUniqueInput!) {
    updateFile(data: $data, where: $where) {
      id
    }
  }
`

type Props = {
  fileId: string
}

const DeleteFile = (props: Props) => {
  const client = useApolloClient()

  const [updatefile] = useMutation(UPDATE_FILE_MUTATION)

  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const updatefileF = async () => {
    setLoading(true)

    try {
      await updatefile({
        variables: {
          data: {
            isDeleted: true,
          },
          where: {
            id: props.fileId,
          },
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    client.resetStore()
    setLoading(false)
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={'delete'}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={'Yes, delete'}
        buttonLoadingText={`Loading...`}
        onClick={() => updatefileF()}
        loading={loading}
      />
      <div className="secondary">{message}</div>
    </>
  )
}

export default DeleteFile
