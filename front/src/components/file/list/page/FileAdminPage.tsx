import React from 'react'
import FilesAdminPageQuery from './FilesAdminPageQuery'
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

class FileAdminPage extends React.Component<Props, State> {
  state = {
    first: 10,
  }

  render() {
    const parsed = queryString.parse(this.props.location.search)
    let page = parsed.page ? parsed.page : 1
    const userId = parsed.userId
    const companieId = parsed.companieId
    const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
    let companieName = parsed.companieName ? parsed.companieName : undefined
    // let productName = parsed.productName ? parsed.productName : undefined

    return (
      <>
        <h1>Files (ADMIN)</h1>
        <Filters
          showOrderByCreated={true}
          showEmptyColumn={true}
          showUserId={true}
          showCompanieId={true}
          // showEmptyColumn2={true}

          showCompanieName={true}
          showProductName={true}
        />
        <FilesAdminPageQuery
          page={page}
          variables={{
            where: {
              user: userId && {
                id: userId,
              },
              companie: (companieName || companieId) && {
                id: companieId,
                name: companieName && { contains: companieName },
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

export default FileAdminPage
