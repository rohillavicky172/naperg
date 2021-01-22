import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const OrderByLastInvoiceDate = () => {
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const orderBy = parsed.orderBy ? parsed.orderBy : 'lastInvoiceDate_DESC'

  const onOrderBy = (oderBy: string) => {
    let url = ''
    const parsed = queryString.parse(location.search)
    parsed.orderBy = oderBy
    url = location.pathname + '?' + queryString.stringify(parsed)
    return url
  }

  return (
    <Link to={onOrderBy(orderBy === 'lastInvoiceDate_DESC' ? 'lastInvoiceDate_ASC' : 'lastInvoiceDate_DESC')}>
      <Button color="primary" variant="outlined">
        <Icon color={'primary'}>{orderBy === 'lastInvoiceDate_DESC' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</Icon>
        {`Date`}
      </Button>
    </Link>
  )
}

export default OrderByLastInvoiceDate
