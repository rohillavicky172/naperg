import React from 'react'
import CompaniesQuery from './CompaniesQuery'
import Filters from '../../nav/filter/Filters'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
const queryString = require('query-string')

const CompaniesAdminPage = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const search = parsed.search ? parsed.search : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  const companieName = parsed.companieName
  const privateData = parsed.privateData
  const page = parsed.page ? parsed.page : 1

  const canCreatePhysicalIssuedCard =
    parsed.canCreatePhysicalIssuedCard === 'TRUE' ? true : parsed.canCreatePhysicalIssuedCard === 'FALSE' ? false : undefined
  const isPersonal = parsed.isPersonal === 'TRUE' ? true : parsed.isPersonal === 'FALSE' ? false : undefined
  const isVerified = parsed.isVerified === 'TRUE' ? true : parsed.isVerified === 'FALSE' ? false : undefined
  const deletedLogically = parsed.deletedLogically === 'TRUE' ? true : parsed.deletedLogically === 'FALSE' ? false : undefined
  const isTrustedPayment = parsed.isTrustedPayment === 'TRUE' ? true : parsed.isTrustedPayment === 'FALSE' ? false : undefined
  const hideDebitCredit = parsed.hideDebitCredit === 'TRUE' ? true : parsed.hideDebitCredit === 'FALSE' ? false : undefined
  const hideAddBank = parsed.hideAddBank === 'TRUE' ? true : parsed.hideAddBank === 'FALSE' ? false : undefined
  const addStripeBank = parsed.addStripeBank === 'TRUE' ? true : parsed.addStripeBank === 'FALSE' ? false : undefined
  const addPaypal = parsed.addPaypal === 'TRUE' ? true : parsed.addPaypal === 'FALSE' ? false : undefined
  const isAutoTopUpEnabled =
    parsed.isAutoTopUpEnabled === 'TRUE' ? true : parsed.isAutoTopUpEnabled === 'FALSE' ? false : undefined
  const disableCrossBorderFee =
    parsed.disableCrossBorderFee === 'TRUE' ? true : parsed.disableCrossBorderFee === 'FALSE' ? false : undefined
  const disableForeignExchangeFee =
    parsed.disableForeignExchangeFee === 'TRUE' ? true : parsed.disableForeignExchangeFee === 'FALSE' ? false : undefined

  const typeCompanie = typeof parsed.typeCompanie === 'string' ? [parsed.typeCompanie] : parsed.typeCompanie
  const typeCreation = typeof parsed.typeCreation === 'string' ? [parsed.typeCreation] : parsed.typeCreation
  const statusApplication = typeof parsed.statusApplication === 'string' ? [parsed.statusApplication] : parsed.statusApplication

  return (
    <div className="paperOut">
      <h1>{`Companies (admin)`}</h1>

      <Filters
        showOrderByCreated
        showDeletedLogically
        showDisableCrossBorderFee
        showDisableForeignExchangeFee
        showIsVerified
        showPrivateData
        showTypeCompanie
        showStatusApplication
        showIsTrustedPayment
        showIsAutoTopUpEnabled
        showCanCreatePhysicalIssuedCard
        showTypeCreation
        showCompanieName
        showHideDebitCredit
        showAddStripeBank
        showAddPaypal
        showHideAddBank
        showIsPersonal
        searchPlaceholder={'Company'}
      />

      <CompaniesQuery
        page={page}
        variables={{
          where: {
            OR: search && [{ privateData: { contains: search } }, { name: { contains: search } }],
            isPersonal,
            deletedLogically,
            disableCrossBorderFee,
            disableForeignExchangeFee,
            canCreatePhysicalIssuedCard,
            hideDebitCredit,
            typeCompanie_in: typeCompanie,
            typeCreation_in: typeCreation,
            statusApplication: statusApplication && {
              in: statusApplication,
            },
            isVerified,
            privateData: privateData && { contains: privateData },
            hideAddBank,
            addStripeBank,
            addPaypal,
            balances_some:
              isAutoTopUpEnabled !== undefined
                ? {
                    testMode: context.testMode,
                    isEnabled: isAutoTopUpEnabled,
                  }
                : undefined,

            name: companieName && { contains: companieName },
            isTrustedPayment: isTrustedPayment,
          },
          first: first,
          orderBy,
          skip: (page - 1) * first,
        }}
      />
    </div>
  )
}

export default CompaniesAdminPage
