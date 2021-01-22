import React from 'react'
import Button from '@material-ui/core/Button'
import { fileClass, File } from '../File.type'
import FileForm from './FileForm'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

export const CREATE_FILE_MUTATION = gql`
  mutation CreateFileMutation($data: FileCreateInput!) {
    createFile(data: $data) {
      id
    }
  }
`

type Props = {
  typeFile: File['typeFile']
  onCancel: () => void
  onCreate: (fileCreated: File) => void
  subscriptionId?: string
  invoiceId?: string
  contractId?: string
  userId?: string
  companieId?: string
}

const CreateFile = (props: Props) => {
  const client = useApolloClient()
  const [file, setFile] = React.useState(fileClass)
  const [loading, setLoading] = React.useState(false)

  const [createFile] = useMutation(CREATE_FILE_MUTATION)
  const createFileF = async () => {
    setLoading(true)
    let fileCreated
    try {
      fileCreated = await createFile({
        variables: {
          data: {
            nameFile: file.nameFile,
            type: file.type,
            description: file.description,
            typeFile: props.typeFile,

            companie: props.companieId && { connect: { id: props.companieId } },
            subscription: props.subscriptionId && { connect: { id: props.subscriptionId } },
            user: props.userId && { connect: { id: props.userId } },
            contract: props.contractId && { connect: { id: props.contractId } },
            invoice: props.invoiceId && { connect: { id: props.invoiceId } },
          },
        },
      })
    } catch (e) {
      setLoading(false)
    }
    setLoading(false)
    if (fileCreated) {
      await client.resetStore()
      props.onCreate(fileCreated.data)
    }
  }
  return (
    <>
      <FileForm file={file} onChange={(file) => setFile(file)} />
      <div style={{ height: '10px' }} />
      <ButtonLoadingAfterClick
        id={'idCreateFile'}
        icon={''}
        disabled={file?.nameFile?.length > 0 ? false : true}
        variant="outlined"
        color={'primary'}
        size={'medium'}
        buttonText={`Save`}
        buttonLoadingText={`Loading...`}
        onClick={createFileF}
        loading={loading}
      />{' '}
      <Button onClick={() => props.onCancel()}>Cancel</Button>
    </>
  )
}

export default CreateFile
