import React from 'react'
// import { withRouter } from 'react-router'
// import { flowRight as compose } from 'lodash'
import InviterIdFilterQuery from './InviterIdFilterQuery'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const InviterIdFilter = () => {
  const location = useLocation()
  const inviterId = queryString.parse(location.search).inviterId

  if (!inviterId) {
    return null
  }
  return (
    <>
      Inviter
      <InviterIdFilterQuery
        variables={{
          where: {
            id: inviterId
          }
        }}
      />
    </>
  )
}

export default InviterIdFilter
