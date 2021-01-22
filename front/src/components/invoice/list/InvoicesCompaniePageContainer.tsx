import React from 'react'
import InvoicesListQuery from './InvoicesListQuery'
import Filters from '../../nav/filter/Filters'
import { AppContext } from '../../AppContext'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'
import { Context } from '../../Context.type'
import TitlePage from '../../nav/layout/titlePage/TitlePage'
import UseWindowDimensions from '../../UseWindowDimensions'
import { ParamTypes } from '../../ParamTypes.type'
const queryString = require('query-string')

const InvoicesCompaniePageContainer = () => {
  const params: ParamTypes = useParams<ParamTypes>()
  const location = useLocation()
  const { context }: { context: Context } = React.useContext(AppContext)
  const first = 10

  const parsed = queryString.parse(location.search)
  const last4 = parsed.last4 ? parsed.last4 : undefined

  const page = parsed.page ? parsed.page : 1
  const issuedCardId = parsed.issuedCardId
  const subscriptionId = parsed.subscriptionId
  const productId = parsed.productId
  const productName = parsed.productName ? parsed.productName : undefined

  const search = parsed.search ? parsed.search : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'dateInvoice_DESC'
  const companieId = params.companieId
  const userName = parsed.userName ? parsed.userName : undefined
  const typeInvoices = typeof parsed.typeInvoices === 'string' ? [parsed.typeInvoices] : parsed.typeInvoices
  const statusInvoices = typeof parsed.statusInvoices === 'string' ? [parsed.statusInvoices] : parsed.statusInvoices
  const hasCashback = parsed.hasCashback ? parsed.hasCashback : undefined
  const issuedCardType = typeof parsed.issuedCardType === 'string' ? [parsed.issuedCardType] : parsed.issuedCardType

  const currencies = typeof parsed.currencies === 'string' ? [parsed.currencies] : parsed.currencies

  let dateMin
  let dateMax
  let period = parsed.period === 'ALL' ? undefined : parsed.period ? parsed.period : undefined

  if (period) {
    const year = parseInt(period.substring(0, 4))
    const month = parseInt(period.substring(4, 6))
    dateMin = new Date(year, month - 1, 1)
    dateMax = new Date(year, month, 1)
  }
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <div className="paperOut">
      <TitlePage userId={''} type="companie" companieId={companieId} objectName="Transactions" />

      <Filters
        showOrderByDateInvoice
        showIssuedCardType
        companieId={companieId}
        showEmptyColumn
        showCurrency
        showIssuedCardId
        showHasCashback
        showProductId
        showSubscriptionId
        showUserId
        showTypeInvoices
        showOrderByBuyerFinalPrice={context.me.role === 'ADMIN'}
        // showFirst
        // showLast4
        showPeriod
        showStatusInvoices
        // showUserName={context.userRoleCompanie.companie.isPersonal ? false : true}
        // showProductName
        searchPlaceholder={
          isMobile
            ? context.userRoleCompanie.companie.isPersonal
              ? 'Vendor, Invoice or NachoCard'
              : 'Vendor, Invoice, Member or NachoCard'
            : context.userRoleCompanie.companie.isPersonal
            ? 'Search by Vendor, Invoice or NachoCard (last 4 digits)'
            : 'Search by Vendor, Invoice, Member or NachoCard (last 4 digits)'
        }
      />

      <InvoicesListQuery
        page={page}
        variables={{
          where: {
            OR: search && [
              { user: { name: { contains: search } } },
              { product: { name: { contains: search } } },
              { smallId: Number(search.toString().split('-').join('')) ? Number(search.toString().split('-').join('')) : 0 },
              { subscription: { issuedCard: { last4: { contains: search } } } },
              // { subscription: { issuedCard: { name: { contains: search } } } },
            ],
            product: (productId || productName) && {
              id: { equals: productId },
              name: { contains: productName },
            },
            testMode: context.testMode,

            cashback:
              hasCashback !== undefined
                ? {
                    gt: hasCashback === 'TRUE' ? 0 : undefined,
                    equals: hasCashback === 'FALSE' ? 0 : undefined,
                  }
                : undefined,

            currency_in: currencies,
            type_in: typeInvoices,
            status_in: statusInvoices,

            dateInvoice: { lt: dateMax, gte: dateMin },

            companie: companieId && {
              id: companieId,
            },
            user: userName && {
              OR: [{ firstName: { contains: userName } }, { lastName: { contains: userName } }],
            },
            subscription: (subscriptionId || issuedCardId || productId || productName || last4 || issuedCardType) && {
              id: subscriptionId,
              issuedCard: (issuedCardId || last4 || issuedCardType) && {
                id: issuedCardId,
                last4_contains: last4,
                issuedCardType_in: issuedCardType,
              },
            },
          },
          first: first,
          orderBy,
          skip: (page - 1) * first,
        }}
      />
    </div>
  )
}

export default InvoicesCompaniePageContainer
