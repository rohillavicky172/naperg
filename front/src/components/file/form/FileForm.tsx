import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { File, FileContainer } from '../File.type'
import UploadFilePrivate from '../UploadFilePrivate'
// import {  } from './File.type'

type Props = {
  onChange: (file: File) => void
  file: File
}

const FileForm = (props: Props) => {
  return (
    <>
      <div>
        <UploadFilePrivate
          // deleteImageText={`Delete file`}
          nameFile={props.file.nameFile}
          onSelectFileContainer={(fileContainer: FileContainer) => {
            props.onChange({
              ...props.file,
              nameFile: fileContainer.nameFile,
              type: fileContainer.type,
            })
          }}
          // onSelectFile={(nameFile: string) =>
          //   props.onChange({
          //     ...props.file,
          //     nameFile,
          //   })
          // }
          // onSelectFileType={(type: string) =>
          //   props.onChange({
          //     ...props.file,
          //     type,
          //   })
          // }
        />
      </div>
      <div>
        <FormControl className="width100per">
          <InputLabel htmlFor="description">{`Description`}</InputLabel>
          <Input
            id="description"
            type="text"
            value={props.file.description}
            onChange={(e) =>
              props.onChange({
                ...props.file,
                description: e.target.value,
              })
            }
          />
        </FormControl>
      </div>
    </>
  )
}

export default FileForm
