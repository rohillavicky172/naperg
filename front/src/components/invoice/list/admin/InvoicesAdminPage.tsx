import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import InvoicesAdminQuery from './InvoicesAdminQuery'
import Filters from '../../../nav/filter/Filters'
import { Context } from '../../../Context.type'
import { useLocation } from 'react-router-dom'
import UseWindowDimensions from '../../../UseWindowDimensions'
import queryString from 'query-string'

const InvoicesAdminPage = () => {
  const isMobile = UseWindowDimensions.isMobile()
  const { context }: { context: Context } = useContext(AppContext)
  const location = useLocation()
  const first = 10
  const parsed = queryString.parse(location.search)
  let page: number = parsed.page ? Number(parsed.page) : 1
  let issuedCardId = parsed.issuedCardId
  let promotionId = parsed.promotionId
  let merchantDataId = parsed.merchantDataId
  let subscriptionId = parsed.subscriptionId
  let productId = parsed.productId
  let userId = parsed.userId
  let productName = parsed.productName ? parsed.productName : undefined
  let buyerFinalPrice = parsed.buyerFinalPrice ? Number(parsed.buyerFinalPrice) : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'dateInvoice_DESC'
  const search = parsed.search ? parsed.search : undefined
  const companieId = parsed.companieId ? parsed.companieId : undefined
  const ruleMerchantDataId = parsed.ruleMerchantDataId ? parsed.ruleMerchantDataId : undefined
  let authorizationId = parsed.authorizationId ? parsed.authorizationId : undefined
  let companieName = parsed.companieName ? parsed.companieName : undefined
  const userName = parsed.userName ? parsed.userName : undefined
  const message = parsed.message ? parsed.message : undefined
  const hasCashback = parsed.hasCashback ? parsed.hasCashback : undefined
  const hasRevshare = parsed.hasRevshare ? parsed.hasRevshare : undefined
  const typeInvoices = typeof parsed.typeInvoices === 'string' ? [parsed.typeInvoices] : parsed.typeInvoices
  const statusInvoices = typeof parsed.statusInvoices === 'string' ? [parsed.statusInvoices] : parsed.statusInvoices
  const statusIssuings = typeof parsed.statusIssuings === 'string' ? [parsed.statusIssuings] : parsed.statusIssuings
  const currencies = typeof parsed.currencies === 'string' ? [parsed.currencies] : parsed.currencies
  const typePayments = typeof parsed.typePayments === 'string' ? [parsed.typePayments] : parsed.typePayments
  const typeIssuedCards = typeof parsed.typeIssuedCards === 'string' ? [parsed.typeIssuedCards] : parsed.typeIssuedCards
  const issuedCardType = typeof parsed.issuedCardType === 'string' ? [parsed.issuedCardType] : parsed.issuedCardType

  let dateMin
  let dateMax
  let period = parsed.period === 'ALL' ? undefined : parsed.period ? parsed.period : undefined

  if (period) {
    const year = parseInt(period.toString().substring(0, 4))
    const month = parseInt(period.toString().substring(4, 6))
    dateMin = new Date(year, month - 1, 1)
    dateMax = new Date(year, month, 1)
  }

  return (
    <div className="paperOut">
      <h1>{`Transactions (admin)`}</h1>

      <Filters
        // showOrderByCreated
        showOrderByDateInvoice
        showIssuedCardType
        showEmptyColumn
        showAuthorizationId
        showPromotionId
        showCurrency
        showTypeIssuedCards
        showAdminTypeInvoices
        showTypePayments
        showProductId
        showUserId
        showOrderByBuyerFinalPrice
        showPeriod
        showHasCashback
        showHasRevshare
        showBuyerFinalPrice
        showMessage
        showStatusInvoices
        showStatusIssuing
        showUserName
        showCompanieName
        showProductName
        showRuleMerchantDataId
        searchPlaceholder={
          isMobile ? 'Vendor, Invoice, Member or NachoCard' : 'Search by Vendor, Invoice, Member or NachoCard (last 4 digits)'
        }
      />

      <InvoicesAdminQuery
        page={page}
        variables={{
          where: {
            OR: search && [
              { description: { contains: search } },
              {
                smallId: Number(search.toString().split('-').join('')) ? Number(search.toString().split('-').join('')) : 0,
              },
              { user: { name: { contains: search } } },
              { product: { name: { contains: search } } },
              { subscription: { issuedCard: { last4: { contains: search } } } },
            ],
            buyerFinalPrice: buyerFinalPrice && {
              gt: buyerFinalPrice,
            },
            testMode: context.testMode,
            authorization_stripe_id: authorizationId,

            cashback:
              hasCashback !== undefined
                ? {
                    gt: hasCashback === 'TRUE' ? 0 : undefined,

                    equals: hasCashback === 'FALSE' ? 0 : undefined,
                  }
                : undefined,
            revshare:
              hasRevshare !== undefined
                ? {
                    gt: hasRevshare === 'TRUE' ? 0 : undefined,

                    equals: hasRevshare === 'FALSE' ? 0 : undefined,
                  }
                : undefined,

            // cashback: hasCashback === 'FALSE' ?: undefined,
            dateInvoice: { lt: dateMax, gte: dateMin },

            ruleMerchantData: ruleMerchantDataId && {
              id: ruleMerchantDataId,
            },
            merchantData_some: merchantDataId && {
              id: merchantDataId,
            },
            description: message && { contains: message },
            status_in: statusInvoices,
            statusIssuing_in: statusIssuings,
            currency_in: currencies,

            product: (productId || productName) && {
              id: { equals: productId },
              name: { contains: productName },
            },

            typePayment_in: typePayments,
            type_in: typeInvoices,
            companie: (companieId || companieName) && {
              id: companieId,
              name: { contains: companieName },
            },
            user: (userName || userId) && {
              AND: [
                { id: userId },
                {
                  OR: userName && [
                    { firstName: { contains: userName } },
                    { lastName: { contains: userName } },
                    { name: { contains: userName } },
                    { email: { contains: userName } },
                  ],
                },
              ],
            },
            promotion: promotionId && {
              id: promotionId,
            },

            subscription: (subscriptionId || issuedCardId || productId || productName || typeIssuedCards || issuedCardType) && {
              id: subscriptionId,
              issuedCard: (issuedCardId || typeIssuedCards || issuedCardType) && {
                id: issuedCardId,
                type_in: typeIssuedCards,
                issuedCardType_in: issuedCardType,
              },
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

export default InvoicesAdminPage
