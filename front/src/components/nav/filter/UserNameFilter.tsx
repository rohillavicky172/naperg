import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const UserNameFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [userName, setUserName] = useState(parsed.userName ? parsed.userName : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="userName">{`Search by user`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.userName && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setUserName('')
                      delete parsed.userName
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="userName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.userName = userName
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={userName}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default UserNameFilter
