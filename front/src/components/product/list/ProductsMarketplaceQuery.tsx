import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'

import Loading from '../../nav/error/Loading'
import Grid from '@material-ui/core/Grid'
import { PRODUCTS_QUERY } from '../GraphQL'
import Pagination from '../../nav/Pagination'
import { Product, NodeProduct } from '../Product.type'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import ProductCardContainerWithBadge from '../single/card/ProductCardContainerWithBadge'

type Props = {
  context: Context
  page: number
  variables: any
  isActionClickIsLink: boolean
  productsQueryConnection: any
  elemClicked: (Product: Product) => void
}

type State = {}

class ProductsMarketplaceQuery extends React.Component<Props, State> {
  state = {
    query: '',
    orderBy: 'name_ASC',
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
        <div className="paperIn">
          <div className="paperIn">
            <div className="paperOut">
              <div className="tac">
                <Grid container spacing={10}>
                  {edges &&
                    edges.map((nodeProduct: NodeProduct) => (
                      <Grid xs={12} sm={6} md={3} lg={3} xl={3} key={nodeProduct.node.id} item>
                        <ProductCardContainerWithBadge link={`/product/${nodeProduct.node.id}`} product={nodeProduct.node} />
                      </Grid>
                    ))}
                </Grid>
              </div>
            </div>
            <Pagination
              page={this.props.page}
              first={this.props.variables.first}
              count={this.props.productsQueryConnection.productsConnection.aggregate.count}
            />
          </div>
        </div>
      </>
    )
  }
}

export default compose(
  graphql(PRODUCTS_QUERY, {
    name: 'productsQueryConnection', // name of the injected prop: this.props.feedQuery...
    // fetchPolicy: 'network-only',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withContext
)(ProductsMarketplaceQuery)
