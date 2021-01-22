import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { useMutation } from '@apollo/react-hooks'
import LogsQueryLight from '../log/list/LogsQueryLight'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import utils from '../utils'

import { DateTimePicker } from '@material-ui/pickers'
import UsersQueryLight from '../user/list/light/UsersQueryLight'
import gql from 'graphql-tag'

export const MUTATION = gql`
  mutation SendBulkWelcomePersonalized($where: UserWhereInput!) {
    sendBulkWelcomePersonalized(where: $where) {
      edges {
        node {
          id
        }
      }
      aggregate {
        count
      }
    }
  }
`

const SendBulkWelcomePersonalized = () => {
  const [bulkInvitationApp] = useMutation(MUTATION)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [endDate, setEndDate] = React.useState(utils.substractDays(new Date(), 2))
  const [startDate, setStartDate] = React.useState(utils.substractDays(new Date(), 365))

  let variables = {
    where: {
      email: { contains: email },
      createdAt: { lt: endDate, gte: startDate },

      welcomePersonalizedSent: false,
      signupType: 'FORM',
      unsubscribe: false,
    },
  }

  const bulkInvitationAppF = async () => {
    setLoading(true)
    let userConnection
    try {
      userConnection = await bulkInvitationApp({
        variables,
      })
    } catch (e) {
      setLoading(false)
      if (e.graphQLErrors.length) {
        setMessage(e.graphQLErrors[0].message)
      }
    }

    if (userConnection.data) {
      setLoading(false)
      setMessage(`${userConnection.data.sendBulkWelcomePersonalized.aggregate.count} mail(s) sent`)
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>SendBulkWelcome</h2>

          <br />
          <Grid container>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  autoOk
                  className=""
                  id={'startDate'}
                  label={'User created: startDate'}
                  value={startDate}
                  onChange={(startDate: Date) => setStartDate(startDate)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  className=""
                  id={'endDate'}
                  autoOk
                  label={'User Created: endDate'}
                  value={endDate}
                  onChange={(endDate: Date) => setEndDate(endDate)}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={6} className="">
              <FormControl>
                <InputLabel htmlFor="email">{`email`}</InputLabel>
                <Input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} className=" bgGrey">
              <pre>{JSON.stringify(variables, null, 2)}</pre>
            </Grid>

            <Grid item xs={12} sm={12} className="marginAuto">
              <div style={{ height: '10px' }} />
            </Grid>
            <Grid item xs={12} sm={12} className="marginAuto">
              <ButtonLoadingAfterClick
                id={'idButton'}
                disabled={false}
                icon={''}
                size={'medium'}
                buttonText={`BulkInvitationAppPage`}
                buttonLoadingText={`Setting up...`}
                variant="outlined"
                loading={loading}
                color={'secondary'}
                onClick={() => bulkInvitationAppF()}
              />{' '}
            </Grid>
            <Grid item xs={12} sm={12} className="marginAuto">
              {message}
            </Grid>
          </Grid>
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <UsersQueryLight variables={{ ...variables, first: 10 }} />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <LogsQueryLight
            title={'Logs (admin)'}
            variables={{
              orderBy: 'date_DESC',
              first: 10,
              where: {
                event: 'sendBulkWelcomePersonalized',
              },
            }}
          />{' '}
          <Link className="link" to={'/logs?event=invitationInApp'}>
            See more
          </Link>
        </Paper>
      </div>
    </>
  )
}

export default SendBulkWelcomePersonalized
