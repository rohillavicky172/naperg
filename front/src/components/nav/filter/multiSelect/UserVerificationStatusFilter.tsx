import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'

const queryString = require('query-string')

const UserVerificationStatusFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const userVerificationStatus =
    typeof queryString.parse(location.search).userVerificationStatus === 'string'
      ? [queryString.parse(location.search).userVerificationStatus]
      : typeof queryString.parse(location.search).userVerificationStatus === 'object'
      ? queryString.parse(location.search).userVerificationStatus
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="userVerificationStatus">userVerificationStatus</InputLabel>

        <Select
          id="userVerificationStatus"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={userVerificationStatus ? userVerificationStatus : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.userVerificationStatus = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'REQUIRED'}>
            <Checkbox checked={userVerificationStatus.indexOf('REQUIRED') > -1} />
            REQUIRED
          </MenuItem>
          <MenuItem value={'SUBMITED'}>
            <Checkbox checked={userVerificationStatus.indexOf('SUBMITED') > -1} />
            SUBMITED
          </MenuItem>
          <MenuItem value={'APPROVED'}>
            <Checkbox checked={userVerificationStatus.indexOf('APPROVED') > -1} />
            APPROVED
          </MenuItem>
          <MenuItem value={'NOT_REQUIRED'}>
            <Checkbox checked={userVerificationStatus.indexOf('NOT_REQUIRED') > -1} />
            NOT_REQUIRED
          </MenuItem>
          <MenuItem value={'NOT_APPROVED'}>
            <Checkbox checked={userVerificationStatus.indexOf('NOT_APPROVED') > -1} />
            NOT_APPROVED
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default UserVerificationStatusFilter
