import React from 'react'
import { useHistory } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const InvoiceIdFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const invoiceId = queryString.parse(location.search).invoiceId
  const onDelete = () => {
    let parsed = queryString.parse(location.search)
    delete parsed.invoiceId
    delete parsed.page

    history.push('?' + queryString.stringify(parsed))
  }

  return (
    <>
      <div className="margin2">
        <Chip label={'invoiceId: ' + invoiceId} onDelete={onDelete} variant="outlined" />
      </div>
    </>
  )
}

export default InvoiceIdFilter
