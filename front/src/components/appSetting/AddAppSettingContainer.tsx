import React from 'react'
import Button from '@material-ui/core/Button'
import { Product } from '../product/Product.type'
import AppSettingForm from './form/AppSettingForm'
import { appSettingClass } from './AppSetting.type'

type State = {
  isEditMode: boolean
}
type Props = {
  product: Product
}

class AddAppSettingContainer extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.setState({ isEditMode: true })}>{`New AppSetting`}</Button>
        {this.state.isEditMode && (
          <AppSettingForm
            onCancel={() => this.setState({ isEditMode: false })}
            product={this.props.product}
            appSetting={appSettingClass}
          />
        )}
      </>
    )
  }
}

export default AddAppSettingContainer
