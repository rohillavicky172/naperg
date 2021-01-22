import React from 'react'
import Paper from '@material-ui/core/Paper'
import { AppContext } from '../../../AppContext'
import { User } from '../../User.type'
import { USER_QUERY } from '../../GraphQL'
import { useHistory } from 'react-router-dom'
import { Context } from '../../../Context.type'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import TotpLoginVerify from '../../single/phone/totp/TotpLoginVerify'
import Check2FAPhone from './Check2FAPhone'
import NotFound from '../../../nav/error/NotFound'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
// import { withContext } from '../../../withContext'
// import { graphql,/'// withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { Query } from '../../../Query.type'
// import { withRouter } from 'react-router-dom'
// import SendEmailValidateAuthDevice from '../../../authDevice/single/SendEmailValidateAuthDevice'
// import { History } from '../../../History.type'
// import VerifyAuthDevice from '../../../authDevice/single/VerifyAuthDevice'
// import RequestVerifyAuthDevicePhone from '../../../authDevice/single/RequestVerifyAuthDevicePhone'

// type State = {
//   mode: string
// }

type Props = {
  userId: string
  // history: History
  // userQuery: Query
  // context: Context
  // redirectAfter: string
  // title: string
  // goTo: (page: string) => void
}
export interface IQuery {
  loading: any
  error?: any
  data?: {
    user: User
  }
}

// class Check2FAPage extends React.Component<Props, State> {
const Check2FAPage = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const history = useHistory()
  // state = {
  //   mode: ''
  // }
  // render() {

  const [mode, setMode] = React.useState('')

  const { loading, error, data }: IQuery = useQuery(USER_QUERY, {
    variables: {
      where: {
        id: props.userId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data) return <NotFound />
  if (!data.user) return <NotFound />

  return (
    <div className="responsiveMargin2">
      <div className="paperOut">
        <div className="tac margin6">
          <Link to={'/'}>
            <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
          </Link>
        </div>

        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={6} className="tal">
              <h3>{'2-Factor Authentication'}</h3>
              <p>This extra step shows it’s really you trying to sign in</p>
            </Grid>
            <Grid item xs={6} className="tar">
              <IconButton
                onClick={() => {
                  context.logout()
                  history.push('/?mode=LOGOUT')
                }}>
                <Icon>clear</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <div>
            <span className="white">
              -------------------- -------------------- -------------------- -------------------- --------------------
              -------------------- -------------------- -------------------- -------------------- --------------------
            </span>
          </div>
          {mode === '' && (
            <>
              {data.user.isPhoneValidated && data.user.enabled2FAPhone && (
                <div className="paperOut">
                  <Button color="primary" variant="outlined" onClick={() => setMode('phone')}>
                    {`Via SMS`}
                  </Button>
                </div>
              )}

              {data.user.isEmailValidated && data.user.enabled2FAEmail && (
                <div className="paperOut">
                  <Button color="primary" variant="outlined" onClick={() => setMode('email')}>
                    {`Via Email`}
                  </Button>
                </div>
              )}
              {data.user.isTwoFactorTotpVerified && data.user.enabled2FATotp && (
                <div className="paperOut">
                  <Button color="primary" variant="outlined" onClick={() => setMode('totp')}>
                    {`Via Authenticator App`}
                  </Button>
                </div>
              )}
            </>
          )}
          {mode === 'phone' && (
            <Check2FAPhone method={'phone'} onCancel={() => setMode('')} user={data.user} authDevice={context.authDevice} />
          )}
          {mode === 'totp' && <TotpLoginVerify onUpdate={() => setMode('')} onCancel={() => setMode('')} />}
          {mode === 'email' && (
            <Check2FAPhone method={'email'} onCancel={() => setMode('')} user={data.user} authDevice={context.authDevice} />
          )}
        </Paper>
      </div>
    </div>
  )
}

export default Check2FAPage
