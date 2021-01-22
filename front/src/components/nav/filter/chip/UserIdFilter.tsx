import React from 'react'
// import { withRouter } from 'react-router'
// import { flowRight as compose } from 'lodash'
import UserIdFilterQuery from './UserIdFilterQuery'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const UserIdFilter = () => {
  const location = useLocation()
  const userId = queryString.parse(location.search).userId

  if (!userId) {
    return null
  }
  return (
    <>
      <UserIdFilterQuery
        variables={{
          where: {
            id: userId
          }
        }}
      />
    </>
  )
}

export default UserIdFilter
