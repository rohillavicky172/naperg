import React from 'react'
import CountUp from 'react-countup'
// import CountUp from 'react-countup'
// import utils from '../../../utils'
// import { Location } from '../../../Location.type'
// import { withRouter } from 'react-router-dom'

// const queryString = require('query-string')

type State = {}

type Props = {
  number: number
}

class CountUpFormatted extends React.Component<Props, State> {
  render() {
    if (99 < this.props.number && this.props.number < 1000) {
      return (
        <>
          0<CountUp duration={1} end={this.props.number} />
        </>
      )
    }
    if (9 < this.props.number && this.props.number < 100) {
      return (
        <>
          00
          <CountUp duration={1} end={this.props.number} />
        </>
      )
    }
    if (0 < this.props.number && this.props.number < 10) {
      return (
        <>
          000
          <CountUp duration={1} end={this.props.number} />
        </>
      )
    }
    return <CountUp duration={1} end={this.props.number} />
  }
}

export default CountUpFormatted
