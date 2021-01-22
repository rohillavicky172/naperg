import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { DELETE_POSITION_PRODUCT_MUTATION } from './GraphQL'
import { Context } from '../Context.type'
import { Client } from '../Client.type'
import { PositionProduct } from './PositionProduct.type'
import { withContext } from '../withContext'

type State = {}
type Props = {
  deletePositionProduct: any
  positionProduct: PositionProduct
  context: Context
  client: Client
}

class DeletePositionProduct extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Button color="secondary" variant="outlined" onClick={this.deletePositionProduct}>
          {`X`}
        </Button>
      </>
    )
  }

  // createPositionProductData(productData) {
  //   console.log(productData.product)
  //   // this.createPositionProduct(product)
  //   this.setState({ product: productData.product })
  // }

  deletePositionProduct = async () => {
    try {
      await this.props.deletePositionProduct({
        variables: {
          where: {
            id: this.props.positionProduct.id
          }
          //   data: {
          //     positionProducts: {
          //       create: {
        }
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
      throw e
    }
    this.props.client.resetStore()
  }
}

export default compose(
  graphql(DELETE_POSITION_PRODUCT_MUTATION, {
    name: 'deletePositionProduct'
  }),
  withContext,
  withRouter,
  withApollo
)(DeletePositionProduct)
