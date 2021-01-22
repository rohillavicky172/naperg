
import React from 'react'
import utils from '../../../utils'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router-dom'
import CountUpFormatted from './CountUpFormatted'
const queryString = require('query-string')

type State = {}

type Props = {
  location: Location,
  number: string
}

class NumberCardFormat extends React.Component<Props, State> {
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const isNewCard = parsed.isNewCard === 'true'
    const num1 = Number(this.props.number.substring(0, 4))
    const num2 = Number(this.props.number.substring(4, 8))
    const num3 = Number(this.props.number.substring(8, 12))
    const num4 = Number(this.props.number.substring(12, 16))
    return (
      <>
        {isNewCard ? (
          <>
            <CountUpFormatted number={num1} /> <CountUpFormatted number={num2} /> <CountUpFormatted number={num3} />{' '}
            <CountUpFormatted number={num4} />
          </>
        ) : (
          <>{utils.numberCardFormat(this.props.number)} </>
        )}
      </>
    )
  }
}

export default withRouter(NumberCardFormat)
