import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import './Style.css'
// import { AUTH_TOKEN, URL_SERVER_MEDIA } from '../../../../../config/config'
// import { withStyles } from '@material-ui/core/styles'
// import utils from '../../../../utils'
// const cookie = require('cookie')

type State = {
  editorState: any
}
type Props = {
  text: string
  // classes: any
  // product: Product,
  onChange: (data: any) => void
}

class EditField extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const html = props.text
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.state = {
        editorState,
      }
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    })

    this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }
  // uploadFile = data => {
  //   console.log(data)
  // }

  // uploadFile(file) {
  //   // e.preventDefault()
  //   return new Promise((resolve, reject) => {
  //     const authToken = String(cookie.parse(document.cookie)[AUTH_TOKEN])
  //     const data = new FormData()
  //     data.append('file', file)

  //     fetch(URL_SERVER_MEDIA + '/upload', {
  //       method: 'POST',
  //       body: data,
  //       headers: new Headers({
  //         Authorization: 'Bearer ' + authToken
  //       })
  //     })
  //       .then(response => {
  //         // console.log(response)
  //         response.json().then(body => {
  //           console.log(body)
  //           console.log(typeof body.file)
  //           const urlFile = utils.getUrlFileMedia(body.file)
  //           console.log(urlFile)
  //           const returnData = { data: { link: urlFile } }
  //           resolve(returnData)

  //           // this.setState({ imageURL: body.file })
  //           // this.props.onSelectFile(body.file)
  //         })
  //         // })
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // }

  render() {
    return (
      <>
        <Editor
          onEditorStateChange={this.onEditorStateChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          stripPastedStyles={true}
          editorState={this.state.editorState}
          toolbar={{
            options: [
              'inline',
              'blockType',
              // 'fontSize',
              // 'fontFamily',
              // 'list',
              // 'textAlign',
              // 'colorPicker',
              'link',
              // 'embedded',
              // 'emoji',
              // 'image'
              // 'remove',
              // 'history'
            ],
            // embedded: { className: this.props.classes.embeddedClass },
            // fontFamily: { className: this.props.classes.fontFamilyClass },
            // blockType: { className: this.props.classes.blockTypeClass },
            // image: {
            //   urlEnabled: true,
            //   uploadEnabled: true,
            //   previewImage: true,
            //   uploadCallback: this.uploadFile
            // },
            inline: {
              inDropdown: false,
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
              options: ['bold', 'italic', 'underline'],
            },
            fontSize: {
              options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 48, 60, 72, 96],
            },

            blockType: {
              inDropdown: true,
              options: ['Normal', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
              className: undefined,
              component: undefined,
              dropdownClassName: undefined,
            },

            colorPicker: {
              colors: [
                'rgb(0,0,0)',
                'rgb(255,255,255)',
                'rgb(97,189,109)',
                'rgb(26,188,156)',
                'rgb(84,172,210)',
                'rgb(44,130,201)',
                'rgb(147,101,184)',
                'rgb(71,85,119)',
                'rgb(204,204,204)',
                'rgb(65,168,95)',
                'rgb(0,168,133)',
                'rgb(61,142,185)',
                'rgb(41,105,176)',
                'rgb(85,57,130)',
                'rgb(40,50,78)',
                'rgb(247,218,100)',
                'rgb(251,160,38)',
                'rgb(235,107,86)',
                'rgb(226,80,65)',
                'rgb(163,143,132)',
                'rgb(239,239,239)',
                'rgb(250,197,28)',
                'rgb(243,121,52)',
                'rgb(209,72,65)',
                'rgb(184,49,47)',
                'rgb(124,112,107)',
                'rgb(209,213,216)',
              ],
            },
          }}
        />
      </>
    )
  }
}

export default EditField
