import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const StatusApplicationsFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const statusApplication =
    typeof queryString.parse(location.search).statusApplication === 'string'
      ? [queryString.parse(location.search).statusApplication]
      : typeof queryString.parse(location.search).statusApplication === 'object'
      ? queryString.parse(location.search).statusApplication
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="statusApplication">Status Application PAYG</InputLabel>
        <Select
          id="statusApplication"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={statusApplication ? statusApplication : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.statusApplication = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'SUBMITED'}>
            <Checkbox checked={statusApplication.indexOf('SUBMITED') > -1} />
            SUBMITED
          </MenuItem>
          <MenuItem value={'APPROVED'}>
            <Checkbox checked={statusApplication.indexOf('APPROVED') > -1} />
            APPROVED
          </MenuItem>
          <MenuItem value={'NOT_APPROVED'}>
            <Checkbox checked={statusApplication.indexOf('NOT_APPROVED') > -1} />
            NOT_APPROVED
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default StatusApplicationsFilter
