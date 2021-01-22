
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Product } from '../product/Product.type'
// import { DATAPRODUCTS_QUERY } from './GraphQL'
import { DELETE_DATAPRODUCT_MUTATION } from './GraphQL'

type State = {}
type Props = {
  product: Product,
  dataProductId: string,
  deleteDataProduct: any
}

class DeleteDataProduct extends React.Component<Props, State> {
  render() {
    return <Button onClick={() => this.deleteDataProduct()}>X</Button>
  }

  deleteDataProduct = async () => {
    await this.props.deleteDataProduct({
      variables: {
        where: {
          id: this.props.dataProductId
        }
      }
    })
  }
}

export default compose(
  graphql(DELETE_DATAPRODUCT_MUTATION, {
    name: 'deleteDataProduct'
  }),
  withRouter
)(DeleteDataProduct)
