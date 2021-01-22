import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import { AppSetting } from '../AppSetting.type'
import { Product } from '../../product/Product.type'
import CreateAppSetting from './CreateAppSetting'
import UpdateAppSetting from './UpdateAppSetting'
type State = {
  appSetting: AppSetting
}
type Props = {
  onCancel: () => void
  product: Product
  appSetting: AppSetting
}

class AppSettingForm extends React.Component<Props, State> {
  state = {
    appSetting: this.props.appSetting,
  }
  cleanFields() {}

  render() {
    return (
      <>
        <div>
          <FormControl>
            <InputLabel htmlFor="name">{`name`}</InputLabel>
            <Input
              id="name"
              type="text"
              value={this.state.appSetting.name}
              onChange={(e) =>
                this.setState({
                  appSetting: {
                    ...this.state.appSetting,
                    name: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="value">{`value`}</InputLabel>
            <Input
              id="value"
              type="text"
              value={this.state.appSetting.value}
              onChange={(e) =>
                this.setState({
                  appSetting: {
                    ...this.state.appSetting,
                    value: e.target.value,
                  },
                })
              }
            />
          </FormControl>
        </div>

        <div>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.appSetting.valueBoolean}
                onChange={(e) =>
                  this.setState({
                    appSetting: {
                      ...this.state.appSetting,
                      valueBoolean: e.target.checked,
                    },
                  })
                }
                value={true}
              />
            }
            label="valueBoolean"
          />
        </div>

        <div>
          {this.state.appSetting.id ? (
            <UpdateAppSetting appSetting={this.state.appSetting} />
          ) : (
            <CreateAppSetting onCreate={() => {}} appSetting={this.state.appSetting} />
          )}{' '}
          <Button
            onClick={() => {
              this.props.onCancel()
            }}>
            {`Cancel`}
          </Button>
        </div>
      </>
    )
  }
}

export default AppSettingForm
