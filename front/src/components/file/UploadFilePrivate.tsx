import React from 'react'
import ViewFilePrivate from './ViewFilePrivate'
import { AUTH_TOKEN, URL_SERVER_UPLOAD } from '../../config/config'
import { useDropzone } from 'react-dropzone'
// import Button from '@material-ui/core/Button'
import cookie from 'cookie'
import { FileContainer } from './File.type'

type Props = {
  nameFile: string
  // deleteImageText: string
  // onSelectFile: (file: string) => void
  // onSelectFileType: (type: string) => void
  onSelectFileContainer: (fileContainer: FileContainer) => void
}

const UploadFilePrivate = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [type, setType] = React.useState('')
  // const removeImage = () => {
  //   // props.onSelectFile('')
  //   props.onSelectFileContainer({ type: '', nameFile: '' })
  // }

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      setMessage('')
      if (acceptedFiles.length !== 1) {
        setMessage('Only 1 file!')
        return
      }
      acceptedFiles.forEach((file) => {
        if (file.size > 5000000) {
          setMessage('File is too big. Max 5Mbs')
        }

        const acceptedImageTypes = ['image/jpeg', 'image/png', 'application/pdf']

        if (!acceptedImageTypes.includes(file.type)) {
          setMessage('Only PDF, JPG or PNG formats are permitted.')
        }

        const data = new FormData()

        data.append('file', file)
        data.append('fileName', file.name)
        const authToken = String(cookie.parse(document.cookie)[AUTH_TOKEN])
        fetch(URL_SERVER_UPLOAD + '/uploadPrivate', {
          method: 'POST',
          body: data,
          headers: new Headers({
            Authorization: 'Bearer ' + authToken,
          }),
        }).then((response) => {
          response.json().then((body) => {
            // props.onSelectFile(body.file)
            // console.log(body)
            // props.onSelectFileType(file.type)
            props.onSelectFileContainer({ type: file.type, nameFile: body.file })

            setType(file.type)
          })
        })
      })
    },
    [props]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {props.nameFile ? (
        <>
          <ViewFilePrivate type={type} nameFile={props.nameFile} />
          {/* {props.nameFile && <Button onClick={() => removeImage()}>{props.deleteImageText}</Button>} */}
        </>
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div style={{ borderStyle: 'dashed', padding: '20px' }} className={isDragActive ? 'primaryBG' : ''}>
            {isDragActive ? (
              <div style={{}}>Drop the files here ...</div>
            ) : (
              <div>Drag 'n' drop some files here, or click to select files</div>
            )}
          </div>
        </div>
      )}
      <p className="secondary">{message}</p>
    </>
  )
}

export default UploadFilePrivate
