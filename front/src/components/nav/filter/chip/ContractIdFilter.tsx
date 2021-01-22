import React from 'react'
import { useHistory } from 'react-router-dom'
// import { withRouter } from 'react-router'
import Chip from '@material-ui/core/Chip'
// import { flowRight as compose } from 'lodash'
// import InviterIdFilterQuery from './InviterIdFilterQuery'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const ContractIdFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const contractId = queryString.parse(location.search).contractId
  const onDelete = () => {
    let parsed = queryString.parse(location.search)
    delete parsed.contractId
    delete parsed.page

    history.push('?' + queryString.stringify(parsed))
  }

  return (
    <>
      <div className="margin2">
        <Chip label={'contractId: ' + contractId} onDelete={onDelete} variant="outlined" />
      </div>
    </>
  )
}

export default ContractIdFilter
