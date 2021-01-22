
import React from 'react'
import PaymentMethodFormatSource from '../../card/single/PaymentMethodFormatSource'
import { Source } from '../Source.type'
// import Grid from '@material-ui/core/Grid'
// // import Paper from '@material-ui/core/Paper'
// import DateComponent from '../../nav/DateComponent'
// import { Link } from 'react-router-dom'
// // import { Link } from 'react-router-dom'
// // import DeleteSource from '../DeleteSource'

type State = {
  showUserAgent: boolean
}

type Props = {
  source: Source
}

class SingleSourceAdmin extends React.Component<Props, State> {
  render() {
    return (
      <>
        <PaymentMethodFormatSource showIcon={true} source={this.props.source} />
      </>
    )
  }
}

export default SingleSourceAdmin
