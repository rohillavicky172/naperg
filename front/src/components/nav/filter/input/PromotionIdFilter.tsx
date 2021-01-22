import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const PromotionIdFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [promotionId, setPromotionId] = useState(parsed.promotionId ? parsed.promotionId : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="promotionId">{`PromotionId`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.promotionId && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setPromotionId('')
                      delete parsed.promotionId
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="promotionId"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPromotionId(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.promotionId = promotionId
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={promotionId}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default PromotionIdFilter
