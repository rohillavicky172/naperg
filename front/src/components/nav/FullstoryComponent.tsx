import React from 'react'
import { SPOOFED_USER_ID } from '../../config/config'
import { withContext } from '../withContext'
import FullstoryChild from './FullstoryChild'

type State = {}

type Props = {}

class FullstoryComponent extends React.Component<Props, State> {
  render() {
    const spoofedUserId = localStorage.getItem(SPOOFED_USER_ID)
    return <>{!spoofedUserId && <FullstoryChild />}</>
  }
}

export default withContext(FullstoryComponent)
