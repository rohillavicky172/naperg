
import React from 'react'
import { withRouter } from 'react-router'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'

type State = {}

type Props = {
  history: any,
  goTo: string,
}

class GoBackArrow extends React.Component<Props, State> {
  goBack = () => {
    if (this.props.goTo) {
      this.props.history.push(this.props.goTo)
    } else {
      this.props.history.goBack()
    }
  }
  render() {
    return (
      <Button variant="outlined" color="secondary" onClick={this.goBack}>
        <Icon>arrow_back</Icon>
      </Button>
    )
  }
}

export default withRouter(GoBackArrow)
