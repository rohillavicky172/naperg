import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import SingleProductLightAutocomplete from './SingleProductLightAutocomplete'
import { PRODUCTS_QUERY } from '../../GraphQL'
import { Product, NodeProduct } from '../../Product.type'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'

type Props = {
  variables: any
  context: Context

  productsQueryConnection: any
  onClick: (Product: Product) => void
}

type State = {}

class ProductsQueryAutocompleteLight extends React.Component<Props, State> {
  render() {
    if (this.props.productsQueryConnection.error) {
      return null
    }
    if (this.props.productsQueryConnection.loading) {
      return null
    }
    const { edges } = this.props.productsQueryConnection.productsConnection

    return (
      <>
        {edges &&
          edges.map((product: NodeProduct) => (
            <div key={product.node.id}>
              <SingleProductLightAutocomplete onClick={this.props.onClick} product={product.node} />
            </div>
          ))}
      </>
    )
  }
}

export default compose(
  graphql(PRODUCTS_QUERY, {
    name: 'productsQueryConnection',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withContext
)(ProductsQueryAutocompleteLight)
