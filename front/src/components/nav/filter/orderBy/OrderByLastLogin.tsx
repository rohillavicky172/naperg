import React from 'react'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')
// import Grid from '@material-ui/core/Grid'

const OrderByLastLogin = () => {
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
        <Link to={onOrderBy(orderBy === 'lastLogin_DESC' ? 'lastLogin_ASC' : 'lastLogin_DESC')}>
          <Button color="primary" variant="outlined">
            <Icon color={orderBy === 'lastLogin_DESC' || orderBy === 'lastLogin_ASC' ? 'secondary' : 'primary'}>
              {orderBy === 'lastLogin_DESC' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </Icon>
            {`Last visit`}
          </Button>
        </Link>
      </div>
    </>
  )
}

export default OrderByLastLogin
