import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const IssuedCardName = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [issuedCardName, setIssuedCardName] = useState(parsed.issuedCardName ? parsed.issuedCardName : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="issuedCardName">{`Search by Ref. Code`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.issuedCardName && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setIssuedCardName('')
                      delete parsed.issuedCardName
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="issuedCardName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIssuedCardName(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.issuedCardName = issuedCardName
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={issuedCardName}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default IssuedCardName
