import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const TypeCompanieFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const typeCompanie =
    typeof queryString.parse(location.search).typeCompanie === 'string'
      ? [queryString.parse(location.search).typeCompanie]
      : typeof queryString.parse(location.search).typeCompanie === 'object'
      ? queryString.parse(location.search).typeCompanie
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="typeCompanie">Company Type</InputLabel>
        <Select
          id="typeCompanie"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={typeCompanie ? typeCompanie : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.typeCompanie = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'BUYER'}>
            <Checkbox checked={typeCompanie.indexOf('BUYER') > -1} />
            BUYER
          </MenuItem>
          <MenuItem value={'SELLER'}>
            <Checkbox checked={typeCompanie.indexOf('SELLER') > -1} />
            SELLER
          </MenuItem>
          <MenuItem value={'AFFILIATE'}>
            <Checkbox checked={typeCompanie.indexOf('AFFILIATE') > -1} />
            AFFILIATE
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TypeCompanieFilter
