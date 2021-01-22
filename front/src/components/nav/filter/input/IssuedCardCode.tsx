import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const IssuedCardCode = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [issuedCardCode, setIssuedCardCode] = useState(parsed.issuedCardCode ? parsed.issuedCardCode : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="issuedCardCode">{`Search by Ref. Code`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.issuedCardCode && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setIssuedCardCode('')
                      delete parsed.issuedCardCode
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="issuedCardCode"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIssuedCardCode(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.issuedCardCode = issuedCardCode
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={issuedCardCode}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default IssuedCardCode
