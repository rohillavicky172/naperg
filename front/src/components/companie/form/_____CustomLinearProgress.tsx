import React from 'react'
import { withStyles } from '@material-ui/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Companie } from '../../companie/Companie.type'

type State = {}
type Props = {
  classes: any
  companie: Companie
}

const styles = {
  barColorPrimary: {
    background: 'red'
  },
  root: {
    height: 18
  }
}

// function HigherOrderComponent(props) {

class HigherOrderComponent extends React.Component<Props, State> {
  render() {
    return (
      <LinearProgress
        classes={{
          barColorPrimary: this.props.classes.barColorPrimary,
          root: this.props.classes.root
        }}
        variant="determinate"
        value={(this.props.companie.valueSpent / this.props.companie.maxTransactionValue) * 100}
      />
    )
  }
}

export default withStyles(styles)(HigherOrderComponent)
