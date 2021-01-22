import React from 'react'
import Button from '@material-ui/core/Button'
import { Product } from '../product/Product.type'
import PromotionForm from './form/PromotionForm'
import { promotionClass } from './Promotion.type'

type State = {
  isEditMode: boolean
}
type Props = {
  product: Product
}

class AddPromotionContainer extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    return (
      <>
        <Button color="primary" variant="contained" onClick={() => this.setState({ isEditMode: true })}>{`New Promotion`}</Button>
        {this.state.isEditMode && (
          <PromotionForm
            onUpdate={() => this.setState({ isEditMode: false })}
            onCancel={() => this.setState({ isEditMode: false })}
            product={this.props.product}
            promotion={promotionClass}
          />
        )}
      </>
    )
  }
}

export default AddPromotionContainer
