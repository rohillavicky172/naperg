import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const StatusIssuedCardFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const statusIssuedCard =
    typeof queryString.parse(location.search).statusIssuedCard === 'string'
      ? [queryString.parse(location.search).statusIssuedCard]
      : typeof queryString.parse(location.search).statusIssuedCard === 'object'
      ? queryString.parse(location.search).statusIssuedCard
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="statusIssuedCard">Status</InputLabel>
        <Select
          id="statusIssuedCard"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={statusIssuedCard ? statusIssuedCard : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.statusIssuedCard = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'active'}>
            <Checkbox checked={statusIssuedCard.indexOf('active') > -1} />
            Active
          </MenuItem>
          <MenuItem value={'canceled'}>
            <Checkbox checked={statusIssuedCard.indexOf('canceled') > -1} />
            Canceled
          </MenuItem>
          <MenuItem value={'inactive'}>
            <Checkbox checked={statusIssuedCard.indexOf('inactive') > -1} />
            Suspended
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default StatusIssuedCardFilter
