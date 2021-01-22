import React from 'react'
import { History } from '../../../History.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
import NotFound from '../../error/NotFound'
import Chip from '@material-ui/core/Chip'
import Error from '../../error/Error'
import Loading from '../../error/Loading'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import ImageTemplate from '../../ImageTemplate'
import { PRODUCT_SIMPLE_QUERY } from '../../../product/GraphQL'

const queryString = require('query-string')

type State = {}

type Props = {
  variables: any
  history: History
  location: Location
  productQuery: any
}

class ProductIdFilterQuery extends React.Component<Props, State> {
  onDelete = () => {
    let parsed = queryString.parse(this.props.location.search)
    delete parsed.productId
    delete parsed.page

    this.props.history.push('?' + queryString.stringify(parsed))
  }

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
      <>
        <Chip
          avatar={<ImageTemplate format={'avatar'} nameFile={this.props.productQuery.product.nameFile} />}
          label={this.props.productQuery.product.name}
          onDelete={this.onDelete}
          variant="outlined"
        />
      </>
    )
  }
}

export default compose(
  graphql(PRODUCT_SIMPLE_QUERY, {
    name: 'productQuery',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter
)(ProductIdFilterQuery)
