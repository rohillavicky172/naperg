import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import htmlToDraft from 'html-to-draftjs'
import { EditorState, ContentState } from 'draft-js'

type State = {
  editorState: any
}
type Props = {
  text: string
}

class ViewField extends React.Component<Props, State> {
  constructor(props: Props) {
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

  render() {
    return (
      <>
        <Editor toolbarHidden={true} readOnly={true} editorState={this.state.editorState} />
      </>
    )
  }
}

export default ViewField
