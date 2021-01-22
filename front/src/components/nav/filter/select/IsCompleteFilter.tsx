import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory, useLocation } from 'react-router-dom'

const IsCompleteFilter = () => {
  const queryString = require('query-string')
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const isComplete = parsed.isComplete ? parsed.isComplete : ''
  const history = useHistory()

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="isComplete">isReadyToSign</InputLabel>
        <Select
          id="isComplete"
          value={isComplete}
          onChange={(e) => {
            const parsed = queryString.parse(location.search)
            delete parsed.page
            parsed.isComplete = e.target.value
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

export default IsCompleteFilter
