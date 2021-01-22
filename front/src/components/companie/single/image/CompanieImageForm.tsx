import React from 'react'
import UpdateCompanie from '../../form/UpdateCompanie'
import UploadFile from '../../../nav/file/UploadFile'
import { Companie } from '../../Companie.type'

type Props = {
  companie: Companie
  onUpdate: () => void
  onCancel: () => void
}

const CompanieImageForm = (props: Props) => {
  const [companie, setCompanie] = React.useState(props.companie)
  return (
    <>
      <div>
        <UploadFile
          format="FREE"
          deleteImageText={`Delete profile photo`}
          nameFile={companie.nameFile}
          onSelectFile={(nameFile) => setCompanie({ ...companie, nameFile: nameFile })}
        />
      </div>
      <UpdateCompanie
        disabled={false}
        showCancelButton={true}
        textButton={'Upload'}
        textCancelButton={'Cancel'}
        onUpdate={() => props.onUpdate()}
        onCancel={() => props.onCancel()}
        companie={{ ...companie, typeUploadNameFile: 'UPLOAD' }}
      />
    </>
  )
}

export default CompanieImageForm
