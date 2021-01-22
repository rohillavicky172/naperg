import React from 'react'
import Filters from '../../nav/filter/Filters'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Companie } from '../../companie/Companie.type'
import { Location } from '../../Location.type'
// import InvoicesSumPerMonthPerProducts from './InvoicesSumPerMonthPerProducts'
// import { Match } from '../../Match.type'
const queryString = require('query-string')

type State = {}
type Props = {
  location: Location
  context: Context
  companie: Companie
}

class InvoicesSumPerMonthPerProductsPage extends React.Component<Props, State> {
  render() {
    const parsed = queryString.parse(this.props.location.search)

    let isPersonal = parsed.isPersonal
    // let side = parsed.side
    if (isPersonal === 'ALL') {
      isPersonal = undefined
    }
    if (isPersonal === 'TRUE') {
      isPersonal = true
    }
    if (isPersonal === 'FALSE') {
      isPersonal = false
    }

    let dateMin
    let dateMax
    let period = parsed.period === 'ALL' ? undefined : parsed.period ? parsed.period : undefined

    if (period) {
      const year = parseInt(period.substring(0, 4))
      const month = parseInt(period.substring(4, 6))
      dateMin = new Date(year, month - 1, 1)
      dateMax = new Date(year, month, 1)
    }
    const orderBy = parsed.orderBy ? parsed.orderBy : 'dateInvoice_DESC'
    return (
      <div className="paperOut">
        <div className="paperOut">
          <h3>{`Invoices Sum Per Month Per Products`}</h3>

          <Filters
            showSide={false}
            showOrderByCountInvoices={true}
            showOrderByCountSubscriptions={true}
            showOrderByCountCompanies={true}
            showOrderByAmountInvoices={true}
            showOrderByCreated={false}
            showEmptyColumn={true}
            showEmptyColumn2={true}
            showPeriod={true}
            showIsPersonal={true}
          />

          {/* <InvoicesSumPerMonthPerProducts
            variables={{
              // side,
              orderBy,
              where: {
                companie: {
                  isPersonal,
                },
                dateInvoice: { lt: dateMax, gte: dateMin },
              },
            }}
          /> */}
        </div>
      </div>
    )
  }
}

export default withContext(InvoicesSumPerMonthPerProductsPage)
