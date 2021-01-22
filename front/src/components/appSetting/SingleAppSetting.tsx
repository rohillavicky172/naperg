import React from 'react'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteAppSetting from './DeleteAppSetting'
import { AppSetting } from './AppSetting.type'
import AppSettingForm from './form/AppSettingForm'
import { Product } from '../product/Product.type'

type State = {}
type Props = {
  appSetting: AppSetting
  product: Product
}

class SingleAppSetting extends React.Component<Props, State> {
  state = {
    isEditMode: false,
  }

  render() {
    return (
      <>
        <Button onClick={() => this.setState({ isEditMode: true })}>
          <Icon>border_color</Icon>
        </Button>

        {this.state.isEditMode ? (
          <AppSettingForm
            onCancel={() => this.setState({ isEditMode: false })}
            product={this.props.product}
            appSetting={this.props.appSetting}
          />
        ) : (
          <>
            <DeleteAppSetting product={this.props.product} appSettingId={this.props.appSetting.id} />
            <br />
            {`name:`} {this.props.appSetting.name}
            <br />
            {`valueBoolean:`} {this.props.appSetting.valueBoolean ? 'true' : 'false'}
            <br />
            {`value:`} {this.props.appSetting.value}
          </>
        )}

        <Divider />
      </>
    )
  }
}

export default SingleAppSetting
