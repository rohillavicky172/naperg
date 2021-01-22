import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const TypeProductFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const typeProduct =
    typeof queryString.parse(location.search).typeProduct === 'string'
      ? [queryString.parse(location.search).typeProduct]
      : typeof queryString.parse(location.search).typeProduct === 'object'
      ? queryString.parse(location.search).typeProduct
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="typeProduct">Type Product</InputLabel>
        <Select
          id="typeProduct"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={typeProduct ? typeProduct : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.typeProduct = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'BTOB'}>
            <Checkbox checked={typeProduct.indexOf('BTOB') > -1} />
            BTOB
          </MenuItem>
          <MenuItem value={'CONSUMER'}>
            <Checkbox checked={typeProduct.indexOf('CONSUMER') > -1} />
            CONSUMER
          </MenuItem>
          <MenuItem value={'BTOB_AND_CONSUMER'}>
            <Checkbox checked={typeProduct.indexOf('BTOB_AND_CONSUMER') > -1} />
            BTOB_AND_CONSUMER
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TypeProductFilter
