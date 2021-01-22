import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const CompanieRoleFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const companieRole =
    typeof queryString.parse(location.search).companieRole === 'string'
      ? [queryString.parse(location.search).companieRole]
      : typeof queryString.parse(location.search).companieRole === 'object'
      ? queryString.parse(location.search).companieRole
      : []

  return (
    <div>
      <Grid item xs={12} md={3} className="tal">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="companieRole">Role</InputLabel>
          <Select
            id="companieRole"
            multiple
            renderValue={(selected: any) => selected.length + ' Selected'}
            value={companieRole ? companieRole : []}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const parsed = queryString.parse(location.search)
              parsed.companieRole = e.target.value
              delete parsed.page
              history.push('?' + queryString.stringify(parsed))
            }}>
            <MenuItem value={'OWNER'}>
              <Checkbox checked={companieRole.indexOf('OWNER') > -1} />
              OWNER
            </MenuItem>
            <MenuItem value={'ADMIN'}>
              <Checkbox checked={companieRole.indexOf('ADMIN') > -1} />
              ADMIN
            </MenuItem>
            <MenuItem value={'PURCHASER'}>
              <Checkbox checked={companieRole.indexOf('PURCHASER') > -1} />
              PURCHASER
            </MenuItem>
            <MenuItem value={'ANALYST'}>
              <Checkbox checked={companieRole.indexOf('ANALYST') > -1} />
              ANALYST
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </div>
  )
}

export default CompanieRoleFilter
