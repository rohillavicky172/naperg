import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const Last4 = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [last4, setLast4] = useState(parsed.last4 ? parsed.last4 : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="last4">{`Last 4 digits`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.last4 && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setLast4('')
                      delete parsed.last4
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="last4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLast4(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.last4 = last4
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={last4}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default Last4
