import React from 'react'
import ImageTemplate from '../ImageTemplate'
import { AUTH_TOKEN, URL_SERVER_UPLOAD } from '../../../config/config'
import { useDropzone } from 'react-dropzone'
import Button from '@material-ui/core/Button'
import cookie from 'cookie'

type Props = {
  format: 'FREE' | 'SQUARE' | 'BANNER_VERTICAL' | '1200_630'
  nameFile: string
  deleteImageText: string
  onSelectFile: (file: string) => void
}

const UploadFile = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const removeImage = () => {
    props.onSelectFile('')
  }

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      const uploadFileToServer = (file) => {
        const data = new FormData()

        data.append('file', file)
        data.append('fileName', file.name)
        const authToken = String(cookie.parse(document.cookie)[AUTH_TOKEN])
        fetch(URL_SERVER_UPLOAD + '/upload', {
          method: 'POST',
          body: data,
          headers: new Headers({
            Authorization: 'Bearer ' + authToken,
          }),
        }).then((response) => {
          response.json().then((body) => {
            props.onSelectFile(body.file)
          })
        })
      }

      setMessage('')
      if (acceptedFiles.length !== 1) {
        setMessage('Only 1 file!')
        return
      }
      acceptedFiles.forEach((file) => {
        console.log(file)
        if (file.size > 5000000) {
          setMessage('File is too big. Max 5Mbs')
          return
        }
        console.log(file.type)
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml']

        if (!acceptedImageTypes.includes(file.type)) {
          setMessage('Must be an image. Format SVG, JPG or PNG')
          return
        }

        var image = new Image()
        image.addEventListener('load', () => {
          if (props.format === 'SQUARE') {
            if (image.width !== image.height) {
              setMessage(`The image "${file.name}" is ${image.width}x${image.height}. It must be a square image.`)
              return
            }
          }
          if (props.format === 'BANNER_VERTICAL') {
            if (image.width !== 600 || image.height !== 300) {
              setMessage(
                `The image "${file.name}" is ${image.width}x${image.height}. It must be a vertical banner format. 300x600px`
              )
              return
            }
          }

          uploadFileToServer(file)
        })

        image.src = window.URL.createObjectURL(file)
      })
    },
    [props]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      {props.nameFile ? (
        <>
          <ImageTemplate format={'mediumLarge'} nameFile={props.nameFile} />
          {props.nameFile && <Button onClick={() => removeImage()}>{props.deleteImageText}</Button>}
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

export default UploadFile
