import React from 'react'
import DataProductsAdminPageQuery from './DataProductsAdminPageQuery'
import Filters from '../../../nav/filter/Filters'
import { Location } from '../../../Location.type'
const queryString = require('query-string')

type State = {
  first: number
}
type Props = {
  userId: string
  companieId: string
  productId: string
  location: Location
}

class DataProductAdminPage extends React.Component<Props, State> {
  state = {
    first: 10,
  }

  render() {
    const parsed = queryString.parse(this.props.location.search)
    let page = parsed.page ? parsed.page : 1
    const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
    let companieName = parsed.companieName ? parsed.companieName : undefined
    let productName = parsed.productName ? parsed.productName : undefined

    return (
      <>
        <h1>Notes (ADMIN)</h1>
        <Filters
          showOrderByCreated={true}
          showEmptyColumn={true}
          // showEmptyColumn2={true}

          showCompanieName={true}
          showProductName={true}
        />
        <DataProductsAdminPageQuery
          page={page}
          variables={{
            where: {
              companie: companieName && {
                name: { contains: companieName },
              },
              product: productName && {
                name: { contains: productName },
              },
            },
            first: this.state.first,
            orderBy: orderBy ? orderBy : 'createdAt_DESC',
            skip: (page - 1) * this.state.first,
          }}
        />
      </>
    )
  }
}

export default DataProductAdminPage
