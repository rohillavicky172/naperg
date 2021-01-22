import React from 'react'
import Filters from '../../../nav/filter/Filters'
import UsersQuery from './UsersQuery'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const UsersPageAdmin = () => {
  const first = 10
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const search = parsed.search ? parsed.search : undefined
  const userId = parsed.userId ? parsed.userId : undefined
  const inviterId = parsed.inviterId ? parsed.inviterId : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  // const userName = parsed.userName ? parsed.userName.trim() : undefined
  const privateData = parsed.privateData
  const signupType = parsed.signupType === 'ALL' ? undefined : parsed.signupType
  const page = parsed.page ? parsed.page : 1
  let dateMin
  let dateMax
  let period = parsed.period === 'ALL' ? undefined : parsed.period ? parsed.period : undefined

  if (period) {
    const year = parseInt(period.substring(0, 4))
    const month = parseInt(period.substring(4, 6))
    dateMin = new Date(year, month - 1, 1)
    dateMax = new Date(year, month, 1)
  }
  const isEmailValidated = parsed.isEmailValidated === 'TRUE' ? true : parsed.isEmailValidated === 'FALSE' ? false : undefined

  const isSuspended = parsed.isSuspended === 'TRUE' ? true : parsed.isSuspended === 'FALSE' ? false : undefined
  const unsubscribe = parsed.unsubscribe === 'TRUE' ? true : parsed.unsubscribe === 'FALSE' ? false : undefined
  const enabled2FATotp = parsed.enabled2FATotp === 'TRUE' ? true : parsed.enabled2FATotp === 'FALSE' ? false : undefined
  const enabled2FAPhone = parsed.enabled2FAPhone === 'TRUE' ? true : parsed.enabled2FAPhone === 'FALSE' ? false : undefined
  const enabled2FAEmail = parsed.enabled2FAEmail === 'TRUE' ? true : parsed.enabled2FAEmail === 'FALSE' ? false : undefined
  const showInviteSeller = parsed.showInviteSeller === 'TRUE' ? true : parsed.showInviteSeller === 'FALSE' ? false : undefined
  const showInviteBuyer = parsed.showInviteBuyer === 'TRUE' ? true : parsed.showInviteBuyer === 'FALSE' ? false : undefined
  const userVerificationStatus =
    typeof parsed.issuedCardType === 'string' ? [parsed.userVerificationStatus] : parsed.userVerificationStatus

  return (
    <>
      <div className="paperOut">
        <h1>{`Users (admin)`}</h1>

        <Filters
          showOrderByCreated
          showUnsubscribe
          // showUserName
          showUserVerificationStatus
          showEmailValidated
          showPeriod
          showPrivateData
          showEnabled2FATotp
          showEnabled2FAPhone
          showEnabled2FAEmail
          showShowInviteBuyer
          showShowInviteSeller
          showSignupType
          showIsSuspended
          showEmptyColumn
          showOrderByLastLogin
          searchPlaceholder={'User'}
        />
        <br />
        <UsersQuery
          page={page}
          variables={{
            first: first,
            skip: (page - 1) * first,
            orderBy: orderBy,

            where: {
              id: userId,
              isSuspended,
              verificationStatus: {
                in: userVerificationStatus,
              },
              unsubscribe,
              invitedBy: inviterId && { id: inviterId },
              enabled2FATotp,
              enabled2FAPhone,
              enabled2FAEmail,
              showInviteSeller,
              showInviteBuyer,
              privateData: { contains: privateData },
              isEmailValidated: isEmailValidated,
              signupType,
              createdAt: { lt: dateMax, gte: dateMin },
              OR: search ? [{ name: { contains: search } }, { email: { contains: search } }] : undefined,
            },
          }}
        />
      </div>
    </>
  )
}

export default UsersPageAdmin
