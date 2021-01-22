import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const OrderByCountCompanies = () => {
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
      <Grid item xs={12} md={3} className="tar" style={{ marginTop: '10px' }}>
        <Link to={onOrderBy(orderBy === 'countCompanies_DESC' ? 'countCompanies_ASC' : 'countCompanies_DESC')}>
          <Button color="primary" variant="outlined">
            <Icon color={orderBy === 'countCompanies_DESC' || orderBy === 'countCompanies_ASC' ? 'secondary' : 'primary'}>
              {orderBy === 'countCompanies_DESC' ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
            </Icon>
            {`Count Companies`}
          </Button>
        </Link>
      </Grid>
    </>
  )
}

export default OrderByCountCompanies
