
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Product } from '../../Product.type'
import { Client } from '../../../Client.type'
import { DELETE_SELLER_MUTATION } from '../../GraphQL'
// import { CATEGORIES_PRODUCTS_QUERY } from '../../../categorieProduct/GraphQL'

import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'

type State = {}
type Props = {
  context: Context,
  redirectAfter: boolean,
  deleteProduct: any,
  client: Client,
  product: Product,
  history: any
}

class DeleteProduct extends React.Component<Props, State> {
  render() {
    return (
      <ButtonSecondValidation
        color={'primary'}
        size={'small'}
        variant={'text'}
        buttonText={`Delete`}
        onClick={() => {
          this.deleteProduct(this.props.product.id)
        }}
      />
    )
  }

  deleteProduct = async id => {
    let product
    try {
      product = await this.props.deleteProduct({
        variables: {
          where: {
            id: id
          }
        }
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (product) {
      this.props.client.resetStore()
      if (this.props.redirectAfter) {
        this.props.history.push('/')
      }
    }
  }
}

export default compose(
  graphql(DELETE_SELLER_MUTATION, {
    name: 'deleteProduct'
  }),
  withRouter,
  withApollo,
  withContext
)(DeleteProduct)
