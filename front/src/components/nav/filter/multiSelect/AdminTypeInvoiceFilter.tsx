import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
import utils from '../../../utils'
// import { AppContext } from '../../../AppContext'
// import { Context } from '../../../Context.type'
const queryString = require('query-string')

const AdminTypeInvoiceFilter = () => {
  // const { context }: { context: Context } = React.useContext(AppContext)
  const location = useLocation()
  const history = useHistory()

  const typeInvoices =
    typeof queryString.parse(location.search).typeInvoices === 'string'
      ? [queryString.parse(location.search).typeInvoices]
      : typeof queryString.parse(location.search).typeInvoices === 'object'
      ? queryString.parse(location.search).typeInvoices
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="typeInvoices">Type</InputLabel>
        <Select
          id="typeInvoices"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={typeInvoices ? typeInvoices : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.typeInvoices = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'TOP_UP'}>
            <Checkbox checked={typeInvoices.indexOf('TOP_UP') > -1} />
            {utils.mappingTypeInvoice('TOP_UP')}
          </MenuItem>
          <MenuItem value={'AUTO_TOP_UP'}>
            <Checkbox checked={typeInvoices.indexOf('AUTO_TOP_UP') > -1} />
            {utils.mappingTypeInvoice('AUTO_TOP_UP')}
          </MenuItem>
          <MenuItem value={'VIRTUAL_CARD'}>
            <Checkbox checked={typeInvoices.indexOf('VIRTUAL_CARD') > -1} />
            {utils.mappingTypeInvoice('VIRTUAL_CARD')}
          </MenuItem>

          <MenuItem value={'PLATFORM_FEES'}>
            <Checkbox checked={typeInvoices.indexOf('PLATFORM_FEES') > -1} />
            {utils.mappingTypeInvoice('PLATFORM_FEES')}
          </MenuItem>

          <MenuItem value={'PHYSICAL_CARD_FEES'}>
            <Checkbox checked={typeInvoices.indexOf('PHYSICAL_CARD_FEES') > -1} />
            {utils.mappingTypeInvoice('PHYSICAL_CARD_FEES')}
          </MenuItem>
          <MenuItem value={'REFUND'}>
            <Checkbox checked={typeInvoices.indexOf('REFUND') > -1} />
            {utils.mappingTypeInvoice('REFUND')}
          </MenuItem>
          <MenuItem value={'REFUND_CASH_OUT'}>
            <Checkbox checked={typeInvoices.indexOf('REFUND_CASH_OUT') > -1} />
            {utils.mappingTypeInvoice('REFUND_CASH_OUT')}
          </MenuItem>

          <MenuItem value={'RECURING_PLATFORM_FEES'}>
            <Checkbox checked={typeInvoices.indexOf('RECURING_PLATFORM_FEES') > -1} />
            {utils.mappingTypeInvoice('RECURING_PLATFORM_FEES')}
          </MenuItem>

          <MenuItem value={'RECURING_PLATFORM_FEES_TRIAL'}>
            <Checkbox checked={typeInvoices.indexOf('RECURING_PLATFORM_FEES_TRIAL') > -1} />
            {utils.mappingTypeInvoice('RECURING_PLATFORM_FEES_TRIAL')}
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default AdminTypeInvoiceFilter
