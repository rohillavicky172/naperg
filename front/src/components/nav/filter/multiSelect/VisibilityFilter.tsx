import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const VisibilityFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const visibility =
    typeof queryString.parse(location.search).visibility === 'string'
      ? [queryString.parse(location.search).visibility]
      : typeof queryString.parse(location.search).visibility === 'object'
      ? queryString.parse(location.search).visibility
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="visibility">Type Product</InputLabel>
        <Select
          id="visibility"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={visibility ? visibility : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.visibility = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'PUBLIC'}>
            <Checkbox checked={visibility.indexOf('PUBLIC') > -1} />
            PUBLIC
          </MenuItem>
          <MenuItem value={'HIDDEN'}>
            <Checkbox checked={visibility.indexOf('HIDDEN') > -1} />
            HIDDEN
          </MenuItem>
          <MenuItem value={'ORPHAN'}>
            <Checkbox checked={visibility.indexOf('ORPHAN') > -1} />
            ORPHAN
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default VisibilityFilter
