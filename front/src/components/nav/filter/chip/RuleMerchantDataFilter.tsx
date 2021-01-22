import React from 'react'
import { useHistory } from 'react-router-dom'
// import { withRouter } from 'react-router'
import Chip from '@material-ui/core/Chip'
// import { flowRight as compose } from 'lodash'
// import InviterIdFilterQuery from './InviterIdFilterQuery'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const RuleMerchantDataFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const ruleMerchantDataId = queryString.parse(location.search).ruleMerchantDataId
  const onDelete = () => {
    let parsed = queryString.parse(location.search)
    delete parsed.ruleMerchantDataId
    delete parsed.page

    history.push('?' + queryString.stringify(parsed))
  }

  return (
    <>
      <div className="margin2">
        <Chip label={'ruleMerchantDataId: ' + ruleMerchantDataId} onDelete={onDelete} variant="outlined" />
      </div>
    </>
  )
}

export default RuleMerchantDataFilter
