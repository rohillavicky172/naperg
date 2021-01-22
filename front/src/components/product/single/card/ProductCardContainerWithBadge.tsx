import React from 'react'

import { Product } from '../../Product.type'
import ProductCard from './ProductCard'
// import { Promotion } from '../../../promotion/Promotion.type'
import { Link } from 'react-router-dom'

type State = {}

type Props = {
  link: string
  product: Product
}

class ProductCardContainerWithBadge extends React.Component<Props, State> {
  render() {
    // console.log(this.props.product.promotions)
    return (
      <>
        {/* {this.props.product.promotions.length === 0 ? ( */}
        <Link className="width100per" to={this.props.link}>
          <ProductCard product={this.props.product} />
        </Link>
        {/* ) : (
          <>
            {this.props.product.promotions.map((promotion: Promotion) => (
              <Badge
                key={promotion.id}
                className="width100per"
                classes={{ badge: 'badgeNN' }}
                color="secondary"
                badgeContent={`-${promotion.discount ? promotion.discount : 0}%`}>
                <Link className="width100per" to={this.props.link}>
                  <ProductCard product={this.props.product} />
                </Link>
              </Badge>
            ))}
          </>
        )} */}
      </>
    )
  }
}

export default ProductCardContainerWithBadge
