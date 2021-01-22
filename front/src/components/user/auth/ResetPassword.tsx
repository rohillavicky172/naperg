import React from 'react'
import { AUTH_TOKEN, COOKIE_OPTIONS, AUTH_DEVICE, USER_TOKEN, USER_ROLE_COMPANIE } from '../../../config/config'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { RESET_PASSWORD_MUTATION } from './GraphQL'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { useLocation } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PasswordElement from './PasswordElement'
// import { useMutation } from '@apollo/react-hooks'
import utils from '../../utils'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

const queryString = require('query-string')
const cookie = require('cookie')

// type State = {
//   password: string
//   loading: boolean
//   lastName: string
//   firstName: string
//   errorMessage: boolean
//   passwordValide: boolean
//   validationForm: boolean
// }

// type Props = {
//   client: Client
//   resetPasswordMutation: any
//   location: any
//   context: Context
//   history: any
// }

const ResetPassword = () => {
  const location = useLocation()
  const client = useApolloClient()
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState(queryString.parse(location.search).firstName)
  const [lastName, setLastName] = React.useState(queryString.parse(location.search).lastName)
  const [passwordValide, setPasswordValide] = React.useState(true)
  const [errorMessage, setErrorMessage] = React.useState(false)
  const [resetPasswordMutation] = useMutation(RESET_PASSWORD_MUTATION)
  const email = queryString.parse(location.search).email
  const mode = queryString.parse(location.search).mode
  const companieName = queryString.parse(location.search).companieName
  const productUrlName = queryString.parse(location.search).productUrlName

  // state = {
  //   loading: false,
  //   password: '',

  //   errorMessage: false,
  //   firstName: '',
  //   lastName: '',

  //   passwordValide: true,

  //   validationForm: false
  // }

  React.useEffect(() => {
    if (context.me.id) {
      history.push('/')
      // window.location.replace(`https://nachonacho.com/product/`)
    }
  }, [context.me, history])

  // componentDidUpdate() {
  //   if (context.me.id) {
  //     this.props.history.push('/')
  //   }
  // }

  const handleKeyPress = () => {
    confirm()
  }

  const isFormValidation = () => {
    return passwordValide && password
  }

  const confirm = async () => {
    setErrorMessage(false)
    setLoading(true)
    let resetPasswordToken = queryString.parse(location.search).resetPasswordToken
    let data
    try {
      data = await resetPasswordMutation({
        variables: {
          resetPasswordToken,
          password: password,
          firstName: firstName ? firstName : undefined,
          lastName: lastName ? lastName : undefined,
          authDevice: utils.getAuthDevice(context.me ? context.me.email : ''),
        },
      })
    } catch (e) {
      console.log(e)
      // const messageSnackBar = e.graphQLErrors[0].message
      // this.props.context.openSnackBar(true, messageSnackBar, 'message')
      setLoading(false)
      // this.setState({ errorMessage: true })
      setErrorMessage(true)
    }
    if (data) {
      setLoading(false)
      // this.setState({
      //   validationForm: true,
      //   // passwordDifferent: false
      // })

      const { token, authDevice, user } = data.data.resetPassword
      _saveUserData(token, authDevice, user)
    }
  }

  const _saveUserData = async (token, authDevice, user) => {
    // localStorage.setItem(AUTH_TOKEN, token)

    document.cookie = cookie.serialize(AUTH_TOKEN, token, COOKIE_OPTIONS)
    console.log(user.email)
    localStorage.setItem(AUTH_DEVICE + '|' + user.email, JSON.stringify(authDevice))
    localStorage.setItem(USER_TOKEN, JSON.stringify(user))
    if (user.userRoleCompanies.length) {
      localStorage.setItem(USER_ROLE_COMPANIE, JSON.stringify(user.userRoleCompanies[0]))
    }

    if (mode === 'requestUserReview') {
      window.location.replace(`https://nachonacho.com/productReview/${productUrlName}`)
      return
    }
    await client.resetStore()
    // await this.props.context.refreshContext()
  }

  if (context.me.id) return null

  // console.log(mode)
  return (
    <div className="paperOut responsiveMargin2 tac">
      <div className="tac margin6">
        <Link to={'/'}>
          <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
        </Link>
      </div>
      <Paper className="paperIn tac">
        {mode === 'invitationUser' && (
          <>
            <h3>{`Welcome to NachoNacho!`}</h3>
            <h3>{`Please set up your ${companieName} account.`}</h3>
          </>
        )}
        {mode === 'resetPassword' && <h3 className="">{`Reset password`}</h3>}
        {mode === 'invitationAdmin' && <h3 className="">{`Accept invitation to NachoNacho`}</h3>}
        {mode === 'requestUserReview' && <h3 className="">{`Accept invitation to write a review`}</h3>}
        {firstName && (
          <div className="tac">
            <FormControl className="">
              <InputLabel htmlFor="firstName">{`First name`}</InputLabel>
              <Input
                id="firstName"
                value={firstName}
                className="inputResponsive"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </div>
        )}
        {lastName && (
          <div className="tac">
            <FormControl className="">
              <InputLabel htmlFor="lastName">{`Last name`}</InputLabel>
              <Input
                id="lastName"
                value={lastName}
                className="inputResponsive"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </div>
        )}

        {email && (
          <div className="tac">
            <FormControl className="">
              <InputLabel htmlFor="email">{`Email`}</InputLabel>
              <Input id="email" value={email} className="inputResponsive" disabled type="text" />
            </FormControl>
          </div>
        )}

        <div className="tac">
          <PasswordElement
            className={'inputResponsive'}
            label={'Choose a safe password'}
            handleNext={handleKeyPress}
            onChange={(statePasword) => {
              setPassword(statePasword.password)
              setPasswordValide(statePasword.inputValidation)
            }}
            password={password}
          />
        </div>

        <br />
        {errorMessage && (
          <p className="red responsiveMargin2">
            {mode === 'resetPassword' && (
              <p>
                {`Oops! Your link has expired. Please`}{' '}
                <Link className="link" to={'/requestPasswordReset'}>
                  click here
                </Link>{' '}
                {`to reset your password again.`}
              </p>
            )}
            {mode === 'invitationAdmin' && (
              <p>
                {`Oops! Your invitation link has expired. To regenerate an invitation link, you need to use the 'Reset password' feature by clicking`}{' '}
                <Link className="link" to={'/requestPasswordReset'}>
                  here
                </Link>
                .
              </p>
            )}
            {mode === 'invitationUser' && <p>{`Oops! Your invitation link has expired. Please request a new link.`} </p>}
            {mode === 'requestUserReview' && <p>{`Link is not valide`} </p>}
          </p>
        )}
        <div className="">
          <ButtonLoadingAfterClick
            id={'idResetPassword'}
            icon={''}
            color={'primary'}
            disabled={!isFormValidation()}
            variant={'outlined'}
            size={'medium'}
            buttonText={`OK`}
            buttonLoadingText={`Setting up...`}
            onClick={confirm}
            loading={loading}
          />
        </div>
      </Paper>
    </div>
  )
}

export default ResetPassword
