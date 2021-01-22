
import React from 'react'
import Fab from '@material-ui/core/Fab'
import { Product } from '../../Product.type'
import { Link } from 'react-router-dom'

type State = {}

type Props = {
  product: Product
}

class ProductChipsCategories extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.product.positionProducts.map(positionProduct => (
          <span key={positionProduct.categorieProduct.id}>
            {!(
              positionProduct.categorieProduct.urlName === 'feature' || positionProduct.categorieProduct.urlName === 'sandbox'
            ) && (
              <>
                {positionProduct.categorieProduct.visibility !== 'TAG' && (
                  <Link to={'/category/' + positionProduct.categorieProduct.urlName}>
                    <Fab variant="extended" color="default">
                      {positionProduct.categorieProduct.name}
                    </Fab>
                  </Link>
                )}
              </>
            )}
          </span>
        ))}
      </>
    )
  }
}

export default ProductChipsCategories
