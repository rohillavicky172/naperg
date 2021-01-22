import React from 'react'

import { AUTH_TOKEN, URL_SERVER_UPLOAD } from '../../../config/config'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'

import { File } from '../../file/File.type'

import axios from 'axios'
const cookie = require('cookie')

type Props = {
  file: File
}

const DownloadFile = (props: Props) => {
  // https://sscrypts.com/send-pdf-from-node-to-react-for-viewing-and-downloading/
  // const [url, setUrl] = React.useState('')
  const handleDownloadFile = () => {
    const authToken = String(cookie.parse(document.cookie)[AUTH_TOKEN])

    axios(URL_SERVER_UPLOAD + '/downlaod/' + props.file.id, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + authToken
      },
      responseType: 'blob'
      //Force to receive data in a Blob Format
    })
      .then(response => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], {
          // type: 'image/png'
          type: props.file.type
        })
        console.log(file)
        //Build a URL from the file
        const fileURL = window.URL.createObjectURL(file)
        // console.log(fileURL)
        // setUrl(fileURL)
        //Open the URL on new Window

        window.open(fileURL)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Button onClick={() => handleDownloadFile()}>
      <Icon color="primary">cloud_download</Icon>
    </Button>
  )
}

export default DownloadFile
