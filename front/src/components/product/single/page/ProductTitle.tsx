import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import { PRODUCT_QUERY } from '../../GraphQL'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Location } from '../../../Location.type'
import ImageTemplate from '../../../nav/ImageTemplate'
// import MerchantDatas from '../../../merchantData/MerchantDatas'
// import Promotions from '../../../promotion/Promotions'
// import ProductDetailsAdmin from './ProductDetailsAdmin'
// import UpdateProduct from '../edit/UpdateProduct'
// import ProductActivity from './ProductActivity'
// import ProductPageHeader from './ProductPageHeader'
// import ProductPageDescription from './ProductPageDescription'
// const queryString = require('query-string')

type State = {
  isEditMode: boolean
}

type Props = {
  title: string
  location: Location
  productId: string
  productQuery: any
  context: Context
}

class ProductTitle extends React.Component<Props, State> {
  render() {
    if (this.props.productQuery.error) {
      return (
        <Error
          message={this.props.productQuery.error.graphQLErrors.length && this.props.productQuery.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.productQuery.loading) {
      return <Loading />
    }
    if (!this.props.productQuery) {
      return <NotFound />
    }

    if (!this.props.productQuery.product) {
      return <NotFound />
    }

    return (
      <div className="tac">
        <ImageTemplate format={'verySmall'} nameFile={this.props.productQuery.product.nameFile} />

        <h3>
          {this.props.title} {this.props.productQuery.product.name}
        </h3>
      </div>
    )
  }
}

export default compose(
  graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.productId
        }
      }
    })
  }),
  withContext,
  withRouter,
  withApollo
)(ProductTitle)
