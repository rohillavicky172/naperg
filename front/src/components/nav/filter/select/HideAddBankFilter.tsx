import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const HideAddBankFilter = () => {
  const queryString = require('query-string')
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const hideAddBank = parsed.hideAddBank ? parsed.hideAddBank : ''
  const history = useHistory()

  return (
    <>
      <Grid item xs={12} md={3} className="tal">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="hideAddBank">HideAddBank</InputLabel>
          <Select
            id="hideAddBank"
            value={hideAddBank}
            onChange={(e) => {
              const parsed = queryString.parse(location.search)
              delete parsed.page
              parsed.hideAddBank = e.target.value
              history.push('?' + queryString.stringify(parsed))
            }}>
            <MenuItem value={''}>{`All`}</MenuItem>
            <MenuItem value={'TRUE'}>{`True`}</MenuItem>
            <MenuItem value={'FALSE'}>{`False`}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}

export default HideAddBankFilter
