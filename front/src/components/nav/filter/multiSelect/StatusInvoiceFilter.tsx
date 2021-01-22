import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import utils from '../../../utils'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const StatusInvoiceFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const statusInvoices =
    typeof queryString.parse(location.search).statusInvoices === 'string'
      ? [queryString.parse(location.search).statusInvoices]
      : typeof queryString.parse(location.search).statusInvoices === 'object'
      ? queryString.parse(location.search).statusInvoices
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="statusInvoices">Status</InputLabel>
        <Select
          id="statusInvoices"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={statusInvoices ? statusInvoices : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.statusInvoices = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'SUCCESSFUL'}>
            <Checkbox checked={statusInvoices.indexOf('SUCCESSFUL') > -1} />
            {utils.mappingStatusInvoice('SUCCESSFUL')}
          </MenuItem>
          <MenuItem value={'PENDING'}>
            <Checkbox checked={statusInvoices.indexOf('PENDING') > -1} />
            {utils.mappingStatusInvoice('PENDING')}
          </MenuItem>
          <MenuItem value={'ERROR'}>
            <Checkbox checked={statusInvoices.indexOf('ERROR') > -1} />
            {utils.mappingStatusInvoice('ERROR')}
          </MenuItem>
          <MenuItem value={'ERROR_PAYMENT'}>
            <Checkbox checked={statusInvoices.indexOf('ERROR_PAYMENT') > -1} />
            {utils.mappingStatusInvoice('ERROR_PAYMENT')}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default StatusInvoiceFilter
