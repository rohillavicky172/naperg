import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const OrderByAmountInvoices = () => {
  const location = useLocation()

  const orderBy = queryString.parse(location.search).orderBy

  const onOrderBy = (oderBy: string) => {
    let url = ''
    const parsed = queryString.parse(location.search)
    parsed.orderBy = oderBy
    url = location.pathname + '?' + queryString.stringify(parsed)
    return url
  }

  return (
    <>
      <div>
        <Link to={onOrderBy(orderBy === 'amountInvoices_DESC' ? 'amountInvoices_ASC' : 'amountInvoices_DESC')}>
          <Button color="primary" variant="outlined">
            <Icon color={orderBy === 'amountInvoices_DESC' || orderBy === 'amountInvoices_ASC' ? 'secondary' : 'primary'}>
              {orderBy === 'amountInvoices_DESC' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </Icon>
            {`Amount Invoices`}
          </Button>
        </Link>
      </div>
    </>
  )
}

export default OrderByAmountInvoices
