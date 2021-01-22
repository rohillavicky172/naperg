import React from 'react'

import Pagination from '../../nav/Pagination'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router'
import CategorieProductCreate from '../single/CategorieProductCreate'
import { CATEGORIES_PRODUCTS_QUERY } from '../GraphQL'

import { withContext } from '../../withContext'

import SingleProductCategorie from './SingleProductCategorie'

type State = {}

type Props = {
  variables: any
  page: number
  categorieProducts: any
}

class CategorieProductsQuery extends React.Component<Props, State> {
  render() {
    if (this.props.categorieProducts.error) {
      return (
        <Error
          message={
            this.props.categorieProducts.error.graphQLErrors.length && this.props.categorieProducts.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.categorieProducts.loading) {
      return <Loading />
    }
    if (!this.props.categorieProducts) {
      return <NotFound />
    }
    console.log(this.props.categorieProducts)
    return (
      <div className="">
        <div>
          {this.props.categorieProducts.categorieProductsConnection.edges.map((categorieNode) => (
            <SingleProductCategorie key={categorieNode.node.id} categorieProduct={categorieNode.node} />
          ))}
        </div>

        <Pagination
          page={this.props.page}
          first={this.props.variables.first}
          count={this.props.categorieProducts.categorieProductsConnection.aggregate.count}
        />
        <div style={{ height: '50px' }} />
        <CategorieProductCreate />
      </div>
    )
  }
}

export default compose(
  graphql(CATEGORIES_PRODUCTS_QUERY, {
    name: 'categorieProducts',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withRouter,
  withApollo,
  withContext
)(CategorieProductsQuery)
