import React from 'react'
import CategorieProductsQuery from '../../categorieProduct/list/CategorieProductsQuery'
import { withContext } from '../../withContext'
import Filters from '../../nav/filter/Filters'
import { Context } from '../../Context.type'
import { Match } from '../../Match.type'
import { Location } from '../../Location.type'
const queryString = require('query-string')

type State = {}

type Props = {
  context: Context
  match: Match
  location: Location
}

class HomeCategoriesAll extends React.Component<Props, State> {
  state = {
    first: 40,
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)

    const page = parsed.page ? parsed.page : 1

    const search = parsed.search ? parsed.search : undefined

    return (
      <>
        <div className="paperOut">
          <h3>Categories</h3>
          <Filters
            // showEmptyColumn={true}
            // showCurrency={true}
            // showIssuedCardId={true}
            // showProductId={true}
            // showSubscriptionId={true}
            // showUserId={true}
            // showTypeInvoices={true}
            // // showFirst={true}
            // // showLast4={true}
            // showPeriod={true}
            // showStatusInvoices={true}
            // // showUserName={this.props.context.userRoleCompanie.companie.isPersonal ? false : true}
            // // showProductName={true}
            searchPlaceholder={'Categorie'}
          />
          <CategorieProductsQuery
            page={page}
            variables={{
              where: {
                OR: search && [
                  { urlName: { contains: search } },
                  { name: { contains: search } },
                  { description: { contains: search } },
                ],
              },
              first: this.state.first,
              orderBy: 'orderByInt_ASC',
              skip: (page - 1) * this.state.first,
            }}
          />
        </div>
      </>
    )
  }
}

export default withContext(HomeCategoriesAll)
