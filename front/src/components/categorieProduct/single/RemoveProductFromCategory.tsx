
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_CATEGORY_SELLER_MUTATION, CATEGORIES_SINGLE_PRODUCTS_QUERY } from '../GraphQL'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { CategorieProduct } from '../CategorieProduct.type'

type State = {}

type Props = {
  updateCategorieProduct: any
  categorieProduct: CategorieProduct
  positionProductId: string
}

class RemoveProductFromCategory extends React.Component<Props, State> {
  render() {
    return <Button onClick={this.removeProductFromCategory}>{`Remove Product from category`}</Button>
  }

  removeProductFromCategory = async () => {
    await this.props.updateCategorieProduct({
      variables: {
        where: { id: this.props.categorieProduct.id },
        data: {
          // name: this.props.categorieProduct.name,
          // nameFile: this.props.categorieProduct.nameFile,
          // urlName: this.props.categorieProduct.urlName,
          positionProducts: {
            delete: {
              id: this.props.positionProductId
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
)(RemoveProductFromCategory)
