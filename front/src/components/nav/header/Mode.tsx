
import React from 'react'
import { TEST_MODE } from '../../../config/config'

type State = {}

type Props = {}

class Mode extends React.Component<Props, State> {
  render() {
    const testMode = localStorage.getItem(TEST_MODE) === 'true'
    return <>{testMode && <span className="red">{`You are in Test Mode`}</span>}</>
  }
}

export default Mode
