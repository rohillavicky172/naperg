import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const BuyerFinalPriceFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [buyerFinalPrice, setBuyerFinalPrice] = useState(parsed.buyerFinalPrice ? parsed.buyerFinalPrice : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="buyerFinalPrice">{`BuyerFinalPrice > ..`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>attach_money</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.buyerFinalPrice && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setBuyerFinalPrice('')
                      delete parsed.buyerFinalPrice
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="buyerFinalPrice"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBuyerFinalPrice(e.target.value)}
            type="text"
            onKeyPress={(data) => {
              if (data.charCode === 13) {
                parsed.buyerFinalPrice = buyerFinalPrice
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={buyerFinalPrice}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default BuyerFinalPriceFilter
