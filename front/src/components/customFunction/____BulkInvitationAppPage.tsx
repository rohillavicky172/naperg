import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { useMutation } from '@apollo/react-hooks'
import LogsQueryLight from '../log/list/LogsQueryLight'
import Paper from '@material-ui/core/Paper'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import utils from '../utils'
import DateFnsUtils from '@date-io/date-fns'
import { DateTimePicker } from '@material-ui/pickers'
import UsersQueryLight from '../user/list/light/UsersQueryLight'
import gql from 'graphql-tag'

export const BULK_INVITATION_APP_MUTATION = gql`
  mutation BulkInvitationApp($where: UserWhereInput!) {
    bulkInvitationApp(where: $where) {
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

const BulkInvitationAppPage = () => {
  const [bulkInvitationApp] = useMutation(BULK_INVITATION_APP_MUTATION)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [endDate, setEndDate] = React.useState(utils.substractDays(new Date(), 88))
  const [startDate, setStartDate] = React.useState(utils.substractDays(new Date(), 90))
  const [lastSentXdaysAgo, setLastSentXdaysAgo] = React.useState(20)

  const resetPasswordRequestLte = new Date()
  resetPasswordRequestLte.setDate(resetPasswordRequestLte.getDate() - lastSentXdaysAgo)
  let variables = {
    where: {
      email: { contains: email },
      createdAt: { lt: endDate, gte: startDate },

      resetPasswordRequest: { lte: resetPasswordRequestLte },
      lastLogin: null,
      signupType: 'ADMINFORM',
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
      if (e.graphQLErrors.length) {
        setMessage(e.graphQLErrors[0].message)
      }
    }

    if (userConnection) {
      setLoading(false)
      setMessage(`${userConnection.data.bulkInvitationApp.aggregate.count} mail(s) sent`)
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>BulkInvitationAppPage</h2>

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

            <Grid item xs={12} sm={6} className="marginAuto">
              <FormControl>
                <InputLabel htmlFor="lastSentXdaysAgo">{`safeguard (days)`}</InputLabel>
                <Input
                  id="lastSentXdaysAgo"
                  type="number"
                  value={lastSentXdaysAgo}
                  onChange={(e) => setLastSentXdaysAgo(Number(e.target.value))}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="marginAuto">
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
                event: 'invitationInApp',
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

export default BulkInvitationAppPage
