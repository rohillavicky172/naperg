import React from 'react'
import { History } from '../../../History.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import ProductIdFilterQuery from './ProductIdFilterQuery'
const queryString = require('query-string')

type State = {
  currency: string
}

type Props = {
  showCurrency: boolean
  history: History
  location: Location
  currenciesQuery: any
}

class ProductIdFilter extends React.Component<Props, State> {
  render() {
    const productId = queryString.parse(this.props.location.search).productId

    if (!productId) {
      return null
    }
    return (
      <>
        <ProductIdFilterQuery
          variables={{
            where: {
              id: productId
            }
          }}
        />
      </>
    )
  }
}

export default compose(withRouter)(ProductIdFilter)
