import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import subMonths from 'date-fns/subMonths'
import format from 'date-fns/format'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { useHistory, useLocation } from 'react-router-dom'

const UserNameFilter = () => {
  const history = useHistory()
  const location = useLocation()

  let arrayPeriod: any[] = []

  let dateMonth
  let dateMonthFormated
  let i = 0
  const firstPeriod = format(new Date('2019-04-01'), 'yyyyMM')
  while (firstPeriod !== dateMonth) {
    dateMonth = format(subMonths(new Date(), i), 'yyyyMM')
    dateMonthFormated = format(subMonths(new Date(), i), 'yyyy MM')
    arrayPeriod.push({ dateMonth, dateMonthFormated })
    i++
  }
  const queryString = require('query-string')
  const parsed = queryString.parse(location.search)
  const period = parsed.period ? parsed.period : ''

  return (
    <>
      <Grid item xs={12} md={3} className="tal">
        <FormControl className="inputWidth">
          <InputLabel htmlFor="Period">Period</InputLabel>

          <Select
            id="period"
            value={period}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const parsed = queryString.parse(location.search)
              parsed.period = e.target.value
              delete parsed.page
              history.push('?' + queryString.stringify(parsed))
            }}>
            <MenuItem value={''}>{`All`}</MenuItem>
            {arrayPeriod.map((couple) => (
              <MenuItem key={couple.dateMonth} value={couple.dateMonth}>
                {couple.dateMonthFormated}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </>
  )
}

export default UserNameFilter
