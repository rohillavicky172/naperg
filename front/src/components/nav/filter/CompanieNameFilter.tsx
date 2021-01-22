import React, { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Icon from '@material-ui/core/Icon'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const CompanieNameFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const [companieName, setCompanieName] = useState(parsed.companieName ? parsed.companieName : '')

  return (
    <>
      <Grid item xs={12} md={3} className="">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="companieName">{`Search by Company`}</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <Icon>search</Icon>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {parsed.companieName && (
                  <Icon
                    className="cursor"
                    onClick={() => {
                      setCompanieName('')
                      delete parsed.companieName
                      delete parsed.page
                      history.push('?' + queryString.stringify(parsed))
                    }}>
                    clear
                  </Icon>
                )}
              </InputAdornment>
            }
            id="companieName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanieName(e.target.value)}
            type="text"
            onKeyPress={data => {
              if (data.charCode === 13) {
                parsed.companieName = companieName
                delete parsed.page
                history.push('?' + queryString.stringify(parsed))
              }
            }}
            value={companieName}
          />
        </FormControl>
      </Grid>
    </>
  )
}

export default CompanieNameFilter
