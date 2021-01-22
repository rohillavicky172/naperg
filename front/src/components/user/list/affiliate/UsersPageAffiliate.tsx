import React from 'react'
import Filters from '../../../nav/filter/Filters'
import UsersQuery from './UsersQueryAffiliate'
import { Location } from '../../../Location.type'
import { useLocation } from 'react-router-dom'
import { Match } from '../../../Match.type'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
const queryString = require('query-string')

type Props = {
  history: any
  location: Location
  match: Match
}

const UsersPageAdmin = (props: Props) => {
  const params = useParams<ParamTypes>()
  let invitedById = params.userId

  const first = 10
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const search = parsed.search ? parsed.search : undefined
  const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
  const privateData = parsed.privateData
  // const userName = parsed.userName ? parsed.userName.trim() : undefined
  // const signupType = parsed.signupType === 'ALL' ? undefined : parsed.signupType
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
  const enabled2FA = parsed.enabled2FA === 'TRUE' ? true : parsed.enabled2FA === 'FALSE' ? false : undefined

  return (
    <>
      <div className="paperOut">
        <h1>{`Users`}</h1>

        <Filters
          showOrderByCreated={true}
          // showUserName={true}
          // showEmailValidated={true}
          showPeriod={true}
          showPrivateData={true}
          // showEnabled2FA={true}
          // showSignupType={true}
          // showEmptyColumn={true}
          // showEmptyColumn2={false}
          // showOrderByLastLogin={true}
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
              invitedBy: { id: invitedById },
              enabled2FA,

              privateData_contains: privateData,
              isEmailValidated: isEmailValidated,
              signupType: 'AFFILIATEFORM',
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
