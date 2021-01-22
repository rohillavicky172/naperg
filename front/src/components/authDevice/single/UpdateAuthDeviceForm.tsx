
import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { AuthDevice } from '../AuthDevice.type'

type State = {
  loading: boolean
}

type Props = {
  authDevice: AuthDevice,
  onUpdate: (authDevice: AuthDevice) => void
}

class UpdateAuthDeviceForm extends React.Component<Props, State> {
  render() {
    return (
      <>
        <FormControlLabel
          className="tal"
          control={
            <Switch
              checked={this.props.authDevice.isVerified}
              onChange={e =>
                this.props.onUpdate({
                  ...this.props.authDevice,
                  isVerified: e.target.checked
                })
              }
              value={true}
            />
          }
          label="Is Verified"
        />
      </>
    )
  }
}

export default UpdateAuthDeviceForm
