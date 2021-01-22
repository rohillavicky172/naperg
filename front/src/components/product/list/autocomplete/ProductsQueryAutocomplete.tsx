import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../../nav/error/Error'
import SingleProductAutocomplete from './SingleProductAutocomplete'
import Loading from '../../../nav/error/Loading'
import { PRODUCTS_QUERY } from '../../GraphQL'
import { Product, NodeProduct } from '../../Product.type'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
// import Grid from '@material-ui/core/Grid'
// import Button from '@material-ui/core/Button'
// import { Link } from 'react-router-dom'

type Props = {
  onClick: (product: Product) => void
  context: Context
  variables: any
  isActionClickIsLink: boolean
  productsQueryConnection: any
  elemClicked: (Product: Product) => void
}

type State = {}

class ProductsQueryAutocomplete extends React.Component<Props, State> {
  state = {
    query: '',
    orderBy: 'name_ASC'
  }

  render() {
    if (this.props.productsQueryConnection.error) {
      return (
        <Error
          message={
            this.props.productsQueryConnection.error.graphQLErrors.length &&
            this.props.productsQueryConnection.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.productsQueryConnection.loading) {
      return <Loading />
    }
    const { edges } = this.props.productsQueryConnection.productsConnection
    if (!edges.length) {
      return (
        <div>
          <div style={{ minHeight: '50px' }} />
          <h3>{`Unfortunately we couldn't find any products matching your search criteria! We're constantly adding new products.`}</h3>

          <div style={{ minHeight: '300px' }} />
        </div>
      )
    }
    return (
      <>
        {edges &&
          edges.map((product: NodeProduct) => (
            <div key={product.node.id}>
              <SingleProductAutocomplete onClick={this.props.onClick} product={product.node} />
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
)(ProductsQueryAutocomplete)
