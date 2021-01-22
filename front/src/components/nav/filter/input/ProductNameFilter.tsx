import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const ProductNameFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [productName, setProductName] = useState(parsed.productName ? parsed.productName : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="productName">{`Search by Vendor`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.productName && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setProductName('')
                      delete parsed.productName
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="productName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.productName = productName
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={productName}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default ProductNameFilter
