
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { CREATE_CATEGORY_SELLER_MUTATION, CATEGORIES_PRODUCTS_QUERY } from '../GraphQL'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { CategorieProduct } from '../CategorieProduct.type'

type State = {
  duplicateCategorieCreated: boolean,
  prefix: string
}

type Props = {
  categorieProduct: CategorieProduct,
  createCategorieProduct: any,
  openSnackBar: (message: string) => void,
  context: Context
}

class CategorieProductDuplicate extends React.Component<Props, State> {
  state = {
    prefix: 'v2_',
    duplicateCategorieCreated: false
  }
  render() {
    return (
      <>
        {this.state.duplicateCategorieCreated ? (
          <Link to={'/category/' + this.state.prefix + this.props.categorieProduct.urlName}>
            <Button>{`Go to this new Category`}</Button>
          </Link>
        ) : (
          <Button onClick={this.duplicateCategorieProduct}>{`Duplicate Category`}</Button>
        )}
      </>
    )
  }

  duplicateCategorieProduct = async () => {
    const {
      name,
      nameFile,
      urlName,
      nameFileMobile,
      orderByInt,
      visibility,
      description,
      nameFileIcon
    } = this.props.categorieProduct
    let updatedCategorie
    try {
      updatedCategorie = await this.props.createCategorieProduct({
        variables: {
          data: {
            name,
            nameFile,
            nameFileIcon,
            description,
            nameFileMobile,
            urlName: this.state.prefix + urlName,
            visibility,
            orderByInt: orderByInt * 1
          }
        }
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (updatedCategorie) {
      this.setState({ duplicateCategorieCreated: true })
    }
  }
}

export default compose(
  graphql(CREATE_CATEGORY_SELLER_MUTATION, {
    name: 'createCategorieProduct',
    options: {
      refetchQueries: [
        {
          query: CATEGORIES_PRODUCTS_QUERY
        }
      ]
    }
  }),
  withContext,
  withApollo
)(CategorieProductDuplicate)
