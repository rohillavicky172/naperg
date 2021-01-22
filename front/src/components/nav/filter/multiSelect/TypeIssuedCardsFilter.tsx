import React from 'react'
import { useHistory } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const TypeIssuedCardsFilter = () => {
  const location = useLocation()
  const history = useHistory()

  const typeIssuedCards =
    typeof queryString.parse(location.search).typeIssuedCards === 'string'
      ? [queryString.parse(location.search).typeIssuedCards]
      : typeof queryString.parse(location.search).typeIssuedCards === 'object'
      ? queryString.parse(location.search).typeIssuedCards
      : []

  return (
    <div>
      <FormControl className="inputWidth">
        <InputLabel htmlFor="typeIssuedCards">Virtual/Physical</InputLabel>
        <Select
          id="typeIssuedCards"
          multiple
          renderValue={(selected: any) => selected.length + ' Selected'}
          value={typeIssuedCards ? typeIssuedCards : []}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const parsed = queryString.parse(location.search)
            parsed.typeIssuedCards = e.target.value
            delete parsed.page
            history.push('?' + queryString.stringify(parsed))
          }}>
          <MenuItem value={'virtual'}>
            <Checkbox checked={typeIssuedCards.indexOf('virtual') > -1} />
            Virtual
          </MenuItem>
          <MenuItem value={'physical'}>
            <Checkbox checked={typeIssuedCards.indexOf('physical') > -1} />
            Physical
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default TypeIssuedCardsFilter
