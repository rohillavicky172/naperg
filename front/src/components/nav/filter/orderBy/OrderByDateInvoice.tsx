import React from 'react'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const OrderByDateInvoice = () => {
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const orderBy = parsed.orderBy ? parsed.orderBy : 'dateInvoice_DESC'

  const onOrderBy = (oderBy: string) => {
    let url = ''
    const parsed = queryString.parse(location.search)
    parsed.orderBy = oderBy
    url = location.pathname + '?' + queryString.stringify(parsed)
    return url
  }

  return (
    <Link to={onOrderBy(orderBy === 'dateInvoice_DESC' ? 'dateInvoice_ASC' : 'dateInvoice_DESC')}>
      <Button color="primary" variant="outlined">
        <Icon color={'primary'}>{orderBy === 'dateInvoice_DESC' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}</Icon>
        {`Date`}
      </Button>
    </Link>
  )
}

export default OrderByDateInvoice
