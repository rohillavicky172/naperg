import React from 'react'
import Button from '@material-ui/core/Button'
import { Product } from '../product/Product.type'
import MerchantDataForm from './form/MerchantDataForm'
import { merchantDataClass } from './MerchantData.type'

type State = {
  isEditMode: boolean
}
type Props = {
  product: Product
}

class AddMerchantDataContainer extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    return (
      <>
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.setState({ isEditMode: true })}>{`New MerchantData`}</Button>
        {this.state.isEditMode && (
          <MerchantDataForm
            onCancel={() => this.setState({ isEditMode: false })}
            product={this.props.product}
            merchantData={merchantDataClass}
          />
        )}
      </>
    )
  }
}

export default AddMerchantDataContainer
