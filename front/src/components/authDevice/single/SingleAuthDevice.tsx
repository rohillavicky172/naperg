import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AuthDeviceAdmin from './AuthDeviceAdmin'
import DeleteAuthDeviceLogically from './DeleteAuthDeviceLogically'
import NameDevice from './NameDevice'
import { AuthDevice } from '../AuthDevice.type'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'

type State = {}

type Props = {
  context: Context
  authDevice: AuthDevice
}

class SingleAuthDevice extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} sm={10} className="marginAuto">
              <NameDevice authDevice={this.props.authDevice} />
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              <DeleteAuthDeviceLogically authDevice={this.props.authDevice} />
            </Grid>
          </Grid>
          {this.props.context.me.role === 'ADMIN' && <AuthDeviceAdmin authDevice={this.props.authDevice} />}
        </Paper>
      </div>
    )
  }
}

export default withContext(SingleAuthDevice)
