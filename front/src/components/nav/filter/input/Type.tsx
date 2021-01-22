import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const Type = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [type, setType] = useState(parsed.type ? parsed.type : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="type">{`Type`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.type && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setType('')
                      delete parsed.type
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="type"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.type = type
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={type}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default Type
