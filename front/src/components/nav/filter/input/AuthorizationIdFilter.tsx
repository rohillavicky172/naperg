import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const AuthorizationIdFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [authorizationId, setAuthorizationId] = useState(parsed.authorizationId ? parsed.authorizationId : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="authorizationId">{`AuthorizationId`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.authorizationId && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setAuthorizationId('')
                      delete parsed.authorizationId
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="authorizationId"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthorizationId(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.authorizationId = authorizationId
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={authorizationId}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default AuthorizationIdFilter
