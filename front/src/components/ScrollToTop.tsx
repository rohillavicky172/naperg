import React from 'react'
import { withRouter } from 'react-router-dom'

type Props = {
  location: any
  children: any
}
type State = {}

class ScrollToTop extends React.Component<Props, State> {
  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return <>{this.props.children}</>
  }
}

export default withRouter(ScrollToTop)
