import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import BalanceSum from '../../invoice/list/BalanceSum'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DatePicker } from '@material-ui/pickers'
import { startOfMonth } from 'date-fns'
import subMonths from 'date-fns/subMonths'
import format from 'date-fns/format'
import startOfDay from 'date-fns/startOfDay'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

const BalanceAdmin = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const [dateSnapshot, setDateSnapshot] = React.useState(new Date())

  if (!(context.userRoleCompanie.companie.typeCompanie === 'NN_ANALYST' || context.me.role === 'ADMIN')) {
    return null
  }
  let arrayPeriod: any = []
  let datStartOfMonth = startOfMonth(new Date())
  for (let i = 0; i < 6; i++) {
    const date = subMonths(datStartOfMonth, i)
    arrayPeriod.push({
      time: format(date, 'MM/dd/yyyy'),
      date,
    })
  }
  return (
    <>
      <div className="paperOut">
        <h2>Balance NachoNacho</h2>
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={6}>
              <h3>Period</h3>
            </Grid>
            <Grid item xs={6}>
              <h3>Balance NachoNacho</h3>
            </Grid>
          </Grid>
          {arrayPeriod.map((period) => (
            <Grid key={period.time} container>
              <Grid item xs={6}>
                {period.time}
              </Grid>
              <Grid item xs={6}>
                <BalanceSum
                  variables={{
                    type: 'valueBalance',
                    dateSnapshot: period.date,
                  }}
                />
              </Grid>
            </Grid>
          ))}
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  autoOk
                  className=""
                  format="MMMM dd, yyyy"
                  id={'dateSnapshot'}
                  label={'dateSnapshot'}
                  value={dateSnapshot}
                  onChange={(dateSnapshot: Date) => setDateSnapshot(startOfDay(dateSnapshot))}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <h3>
                <BalanceSum variables={{ type: 'valueBalance', dateSnapshot }} />
              </h3>
            </Grid>
          </Grid>
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`pendingBalance NachoNacho:`}</h3>
          <h2>
            <BalanceSum variables={{ type: 'pendingBalance' }} />
          </h2>
        </Paper>
      </div>
    </>
  )
}

export default BalanceAdmin
