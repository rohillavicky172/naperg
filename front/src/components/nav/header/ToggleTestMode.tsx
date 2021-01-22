import React from 'react'
import { withContext } from '../../withContext'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Context } from '../../Context.type'
import { TEST_MODE } from '../../../config/config'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import UseWindowDimensions from '../../UseWindowDimensions'

type State = {
  testMode: boolean
}

type Props = {
  context: Context
  client: any
  onClick: () => void
}

class ToggleTestMode extends React.Component<Props, State> {
  state = {
    testMode: false,
  }

  componentDidMount() {
    const testMode = localStorage.getItem(TEST_MODE) === 'true'
    this.setState({ testMode: testMode })
  }

  handleChange = () => {
    const newMode = !this.state.testMode
    this.props.onClick()
    localStorage.setItem(TEST_MODE, newMode.toString())
    this.setState({ testMode: newMode })
    this.props.client.resetStore()
    this.props.context.refreshContext()
    // window.location.reload()
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <FormControlLabel
          classes={{ label: this.state.testMode ? 'red' : '' }}
          control={<Switch checked={this.state.testMode} onChange={() => this.handleChange()} />}
          label={isMobile ? '' : 'Test mode'}
        />
      </>
    )
  }
}

export default compose(withApollo, withContext)(ToggleTestMode)
