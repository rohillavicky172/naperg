import React from 'react'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Product } from '../../Product.type'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

type State = {}

type Props = {
  product: Product
  context: Context
  elemClicked: (elem: any) => void
}

class ProductCardContainer extends React.Component<Props, State> {
  render() {
    return (
      <div itemScope itemType="http://schema.org/Product">
        <Link className="width100per" to={'/product/' + this.props.product.id}>
          <ProductCard product={this.props.product} />
        </Link>
      </div>
    )
  }
}

export default withContext(ProductCardContainer)
