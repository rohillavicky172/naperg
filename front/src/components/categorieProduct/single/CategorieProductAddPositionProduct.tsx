
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_CATEGORY_SELLER_MUTATION, CATEGORIES_SINGLE_PRODUCTS_QUERY } from '../GraphQL'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import AutocompleteProducts from '../../product/list/autocomplete/AutocompleteProducts'
import { CategorieProduct } from '../CategorieProduct.type'
import { Product } from '../../product/Product.type'

type State = {}

type Props = {
  updateCategorieProduct: any
  categorieProduct: CategorieProduct
}

class CategorieProductAddPositionProduct extends React.Component<Props, State> {
  onElemSelected(product: Product) {
    this.updateCategorieProduct(product)
  }

  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>{`Add Product to Category`}</h2>
          <AutocompleteProducts onElemSelected={this.onElemSelected.bind(this)} />
        </Paper>
      </div>
    )
  }

  updateCategorieProduct = async product => {
    await this.props.updateCategorieProduct({
      variables: {
        where: { id: this.props.categorieProduct.id },
        data: {
          name: this.props.categorieProduct.name,
          nameFile: this.props.categorieProduct.nameFile,
          positionProducts: {
            create: {
              product: { connect: { id: product.id } },
              orderByInt: 50,
              orderByHomeInt: 50,
              isFeatured: true
            }
          }
        }
      }
    })
  }
}

export default compose(
  graphql(UPDATE_CATEGORY_SELLER_MUTATION, {
    name: 'updateCategorieProduct',
    options: (props: Props) => ({
      refetchQueries: [
        {
          query: CATEGORIES_SINGLE_PRODUCTS_QUERY,
          variables: { urlName: props.categorieProduct.urlName }
        }
      ]
    })
  }),
  withRouter,
  withApollo
)(CategorieProductAddPositionProduct)
