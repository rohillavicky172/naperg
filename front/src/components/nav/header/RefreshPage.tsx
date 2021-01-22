import React from 'react'
import { withContext } from '../../withContext'
import { Icon, ListItem, IconButton, ListItemText } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Context } from '../../Context.type'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import UseWindowDimensions from '../../UseWindowDimensions'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import { TEST_MODE } from '../../../config/config'

type State = {
  loading: boolean
}

type Props = {
  context: Context
  client: any
}

class RefreshPage extends React.Component<Props, State> {
  state = {
    loading: false,
  }
  refreshPage = () => {
    this.setState({ loading: true })
    this.props.client.resetStore()
    setTimeout(() => this.setState({ loading: false }), 1000)

    // window.location.reload()
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
    if (!isMobile) {
      return null
    }

    return (
      <ListItem onClick={() => this.refreshPage()} button>
        <IconButton>{this.state.loading ? <CircularProgress size={20} /> : <Icon>refresh</Icon>}</IconButton>
        <ListItemText classes={{ primary: 'menuDrawerLeft' }} className="hideMobile__" primary="Refresh" />
      </ListItem>
    )
  }
}

export default compose(withApollo, withContext)(RefreshPage)
