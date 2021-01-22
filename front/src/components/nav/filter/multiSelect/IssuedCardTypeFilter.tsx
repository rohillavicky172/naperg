import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const IssuedCardTypeFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const issuedCardType =
    typeof queryString.parse(location.search).issuedCardType === 'string'
      ? [queryString.parse(location.search).issuedCardType]
      : typeof queryString.parse(location.search).issuedCardType === 'object'
      ? queryString.parse(location.search).issuedCardType
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="issuedCardType">Card Type</InputLabel>
        <Select
          id="issuedCardType"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={issuedCardType ? issuedCardType : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.issuedCardType = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'REWARD'}>
            <Checkbox checked={issuedCardType.indexOf('REWARD') > -1} />
            RewardsCard
          </MenuItem>
          <MenuItem value={'STANDARD'}>
            <Checkbox checked={issuedCardType.indexOf('STANDARD') > -1} />
            NachoCard
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default IssuedCardTypeFilter
