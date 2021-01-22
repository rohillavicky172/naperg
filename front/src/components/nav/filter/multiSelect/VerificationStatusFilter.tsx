import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
import utils from '../../../utils'
const queryString = require('query-string')

const VerificationStatusFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const verificationStatus =
    typeof queryString.parse(location.search).verificationStatus === 'string'
      ? [queryString.parse(location.search).verificationStatus]
      : typeof queryString.parse(location.search).verificationStatus === 'object'
      ? queryString.parse(location.search).verificationStatus
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="verificationStatus">VerificationStatus</InputLabel>
        <Select
          id="verificationStatus"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={verificationStatus ? verificationStatus : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.verificationStatus = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={''}>
            <Checkbox checked={verificationStatus.indexOf('') > -1} />
            {utils.getPlaidVerificationStatus('')}
          </MenuItem>
          <MenuItem value={'pending_automatic_verification'}>
            <Checkbox checked={verificationStatus.indexOf('pending_automatic_verification') > -1} />
            {utils.getPlaidVerificationStatus('pending_automatic_verification')}
          </MenuItem>
          <MenuItem value={'automatic_verification'}>
            <Checkbox checked={verificationStatus.indexOf('automatic_verification') > -1} />
            {utils.getPlaidVerificationStatus('automatic_verification')}
          </MenuItem>
          <MenuItem value={'pending_manual_verification'}>
            <Checkbox checked={verificationStatus.indexOf('pending_manual_verification') > -1} />
            {utils.getPlaidVerificationStatus('pending_manual_verification')}
          </MenuItem>
          <MenuItem value={'manually_verified'}>
            <Checkbox checked={verificationStatus.indexOf('manually_verified') > -1} />
            {utils.getPlaidVerificationStatus('manually_verified')}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default VerificationStatusFilter
