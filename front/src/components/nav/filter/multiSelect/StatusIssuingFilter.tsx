import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const StatusIssuingsFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const statusIssuings =
    typeof queryString.parse(location.search).statusIssuings === 'string'
      ? [queryString.parse(location.search).statusIssuings]
      : typeof queryString.parse(location.search).statusIssuings === 'object'
      ? queryString.parse(location.search).statusIssuings
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="statusIssuings">Status Issuing</InputLabel>
        <Select
          id="statusIssuings"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={statusIssuings ? statusIssuings : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.statusIssuings = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'pending'}>
            <Checkbox checked={statusIssuings.indexOf('pending') > -1} />
            pending
          </MenuItem>
          <MenuItem value={'closed'}>
            <Checkbox checked={statusIssuings.indexOf('closed') > -1} />
            closed
          </MenuItem>
          <MenuItem value={'reversed'}>
            <Checkbox checked={statusIssuings.indexOf('reversed') > -1} />
            reversed
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default StatusIssuingsFilter
