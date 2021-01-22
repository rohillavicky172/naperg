import React from 'react'
import FilesQuery from './list/FilesQuery'
import Button from '@material-ui/core/Button'
import CreateFile from './form/CreateFile'
import { File } from './File.type'

type Props = {
  typeFile: File['typeFile']
  userId?: string
  companieId?: string
  subscriptionId?: string
  contractId?: string
  invoiceId?: string
  showDownload: boolean
  onCreate: () => void
}

const ManageFile = (props: Props) => {
  const [show, setShow] = React.useState(false)

  if (!show) {
    return (
      <>
        <FilesQuery
          canDelete={true}
          showDownload={props.showDownload}
          variables={{
            where: {
              isDeleted: false,
              user: props.userId && { id: props.userId },
              companie: props.companieId && { id: props.companieId },
              subscription: props.subscriptionId && { id: props.subscriptionId },
              contract: props.contractId && { id: props.contractId },
              invoice: props.invoiceId && { id: props.invoiceId },
            },
          }}
        />
        <div className="tar">
          <Button color="primary" variant="outlined" onClick={() => setShow(true)}>
            + Attachment
          </Button>
        </div>
      </>
    )
  }
  return (
    <CreateFile
      typeFile={props.typeFile}
      onCancel={() => setShow(false)}
      onCreate={() => {
        setShow(false)
        props.onCreate()
      }}
      subscriptionId={props.subscriptionId}
      contractId={props.contractId}
      invoiceId={props.invoiceId}
      companieId={props.companieId}
      userId={props.userId}
    />
  )
}

export default ManageFile
