import React from 'react'
import Button from '@material-ui/core/Button'
import { DELETE_FILE_MUTATION } from './GraphQL'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

type Props = {
  fileId: string
}

const DeleteFileAdmin = (props: Props) => {
  const client = useApolloClient()
  const [deleteFile, data] = useMutation(DELETE_FILE_MUTATION)
  console.log(data)

  return (
    <Button
      onClick={async () => {
        deleteFile({
          variables: {
            where: {
              id: props.fileId,
            },
          },
        })
        await client.resetStore()
      }}>
      <span className="secondary">Hard delete</span>
    </Button>
  )
}

export default DeleteFileAdmin
