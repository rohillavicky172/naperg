import React from 'react'
import InvoicesListQuerySellerPayment from './InvoicesListQuerySellerPayment'
import Filters from '../../../nav/filter/Filters'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Context } from '../../../Context.type'
import { AppContext } from '../../../AppContext'
import ProductTitle from '../../../product/single/page/ProductTitle'
import { ParamTypes } from '../../../ParamTypes.type'
const queryString = require('query-string')

const InvoicesSellerPayment = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const first = 10
  const { productId }: ParamTypes = useParams<ParamTypes>()
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  let page = parsed.page ? parsed.page : 1
  // const search = parsed.search ? parsed.search : undefined
  // const subscriptionId = parsed.subscriptionId
  const orderBy = parsed.orderBy ? parsed.orderBy : 'dateInvoice_DESC'
  // let productId = this.props.match.params.productId
  // let userName = parsed.userName ? parsed.userName : undefined
  let dateMin
  let dateMax
  let period = parsed.period === 'ALL' ? undefined : parsed.period ? parsed.period : undefined

  if (period) {
    const year = parseInt(period.substring(0, 4))
    const month = parseInt(period.substring(4, 6))
    dateMin = new Date(year, month - 1, 1)
    dateMax = new Date(year, month, 1)
  }

  return (
    <div className="paperOut">
      <div className="paperIn">
        <ProductTitle title={'Transactions for '} productId={productId} />
      </div>
      <Filters
        showOrderByCreated={true}
        showEmptyColumn={true}
        showIssuedCardId={true}
        showProductId={true}
        showSubscriptionId={true}
        showUserId={true}
        showOrderByBuyerFinalPrice={context.me.role === 'ADMIN'}
        showPeriod={true}
        showUserName={true}
        searchPlaceholder={'Search by Member or last 4 digits of NachoCard'}
      />

      <InvoicesListQuerySellerPayment
        page={page}
        variables={{
          where: {
            testMode: context.testMode,

            type: 'SELLER_REVSHARE',

            dateInvoice: { lt: dateMax, gte: dateMin },

            product: {
              id: productId,
            },
          },
          first,
          orderBy,
          skip: (page - 1) * first,
        }}
      />
    </div>
  )
}

export default InvoicesSellerPayment
