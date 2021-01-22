import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory, useLocation } from 'react-router-dom'

const Enabled2FAEmailFilter = () => {
  const queryString = require('query-string')
  const history = useHistory()
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const enabled2FAEmail = parsed.enabled2FAEmail ? parsed.enabled2FAEmail : ''

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="enabled2FAEmail">enabled2FAEmail</InputLabel>
        <Select
          id="enabled2FAEmail"
          value={enabled2FAEmail}
          onChange={e => {
            const parsed = queryString.parse(location.search)
            delete parsed.page
            parsed.enabled2FAEmail = e.target.value
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={''}>{`All`}</MenuItem>
          <MenuItem value={'TRUE'}>{`True`}</MenuItem>
          <MenuItem value={'FALSE'}>{`False`}</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default Enabled2FAEmailFilter
