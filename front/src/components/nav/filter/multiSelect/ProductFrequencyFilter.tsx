import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const ProductFrequencyFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const productFrequency =
    typeof queryString.parse(location.search).productFrequency === 'string'
      ? [queryString.parse(location.search).productFrequency]
      : typeof queryString.parse(location.search).productFrequency === 'object'
      ? queryString.parse(location.search).productFrequency
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="productFrequency">Purchase Type</InputLabel>
        <Select
          id="productFrequency"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={productFrequency ? productFrequency : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.productFrequency = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'SUBSCRIPTION'}>
            <Checkbox checked={productFrequency.indexOf('SUBSCRIPTION') > -1} />
            Subscription
          </MenuItem>
          <MenuItem value={'ONE_OFF'}>
            <Checkbox checked={productFrequency.indexOf('ONE_OFF') > -1} />
            One Off
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default ProductFrequencyFilter
