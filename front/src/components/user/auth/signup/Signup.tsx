import React from 'react'
import { AUTH_TOKEN, COOKIE_OPTIONS, USER_TOKEN, AUTH_DEVICE, USER_ROLE_COMPANIE } from '../../../../config/config'
import { useHistory } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'
import ToggleTestMode from '../../../nav/header/ToggleTestMode'
import gql from 'graphql-tag'
import PasswordElement from '../PasswordElement'
import EmailElement from '../EmailElement'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import utils from '../../../utils'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

export const MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $codeSlack: String
    $companieName: String
    $invitedById: String
    $authDevice: AuthDeviceUpdateInput!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      codeSlack: $codeSlack
      companieName: $companieName
      invitedById: $invitedById
      authDevice: $authDevice
    ) {
      token
      authDevice {
        id
        deviceToken
        isVerified
      }
      user {
        id
        lastName
        firstName
        email
        userRoleCompanies {
          id
          companieRole
          permissions
          companie {
            id
            name
            typeCompanie
            isPersonal
          }
        }
      }
    }
  }
`

const cookie = require('cookie')
const queryString = require('query-string')

const Signup = () => {
  const history = useHistory()
  const client = useApolloClient()
  const location = useLocation()
  const [signupMutation] = useMutation(MUTATION)

  const [loading, setLoading] = React.useState(false)
  const [lastNameValidation, setLastNameValidation] = React.useState(true)
  const [firstNameValidation, setFirstNameValidation] = React.useState(true)
  const [emailValidation, setEmailValidation] = React.useState(true)
  const [inputValidation2, setInputValidation2] = React.useState(true)
  const [password, setPassword] = React.useState('')
  const [companieName, setCompanieName] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [message, setMessage] = React.useState('')

  const [email, setEmail] = React.useState(
    queryString.parse(location.search).email ? queryString.parse(location.search).email : ''
  )

  const codeSlack = queryString.parse(location.search).code

  let nnCode
  let invitedById = ''
  let invitedByFirstName = ''
  let invitedByLastName = ''
  const nnCodeString = queryString.parse(location.search).nnCode
  if (nnCodeString) {
    nnCode = JSON.parse(window.atob(nnCodeString))
    invitedById = nnCode.invitedById
    invitedByFirstName = nnCode.invitedByFirstName
    invitedByLastName = nnCode.invitedByLastName
  }

  const isFormValidation = () => {
    return lastNameValidation && firstNameValidation && emailValidation && email.length > 1 && inputValidation2
  }

  const _confirm = async () => {
    if (!isFormValidation()) {
      setMessage('Error')
      return
    }

    if (!password) {
      setMessage('No password')
      return
    }
    setLoading(true)

    let result
    try {
      result = await signupMutation({
        variables: {
          signupType: 'FORM',
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
          authDevice: utils.getAuthDevice(email),
          invitedById,
          codeSlack,
          companieName,
        },
      })
    } catch (e) {
      setLoading(false)
      if (e.graphQLErrors.length) {
        setMessage(e.graphQLErrors[0].message)
      } else {
        setMessage(`An unexpected error has occurred. Please try again or contact us.`)
      }

      throw e
    }
    const { token, authDevice, user } = result.data.signup

    setLoading(false)

    _saveUserData(token, authDevice, user)
  }

  const _saveUserData = async (token, authDevice, user) => {
    document.cookie = cookie.serialize(AUTH_TOKEN, token, COOKIE_OPTIONS)
    localStorage.setItem(AUTH_DEVICE + '|' + user.email, JSON.stringify(authDevice))
    localStorage.setItem(USER_TOKEN, JSON.stringify(user))
    if (user.userRoleCompanies.length) {
      localStorage.setItem(USER_ROLE_COMPANIE, JSON.stringify(user.userRoleCompanies[0]))
    }

    await client.resetStore()
  }

  const handleKey = (data) => {
    if (data.charCode === 13) {
      _confirm()
    }
  }

  const goToWithParams = (page: string) => {
    let parsed = queryString.parse(location.search)
    let url = page + '?' + queryString.stringify(parsed)
    history.push(url)
  }

  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <div className="tac">
          {queryString.parse(location.search).invitationToken && <h4>{`Approve Invitation`}</h4>}

          {invitedById && invitedByFirstName && invitedByLastName && (
            <>
              <h2>
                Welcome to {invitedByFirstName} {invitedByLastName}'s invitation page!
              </h2>
              <div style={{ height: '10px' }} />
            </>
          )}
          {queryString.parse(location.search).code && (
            <>
              <img src="/logo/slack/slack-full.png" style={{ maxWidth: '220px' }} alt="slack Logo" />
              <h2>{`Welcome to your NachoNacho account signup via Slack!`}</h2>
              <div style={{ height: '10px' }} />
            </>
          )}
          <h1 className="textSize10 fontWeight19">Sign Up</h1>

          <div>
            {`Already have an account?`}{' '}
            <span className="link cursor" onClick={() => goToWithParams('/login')}>
              {`Log In`}
            </span>
          </div>
          <div className="">
            <br />
            <div>
              <FormControl>
                <InputLabel htmlFor="firstName">{`Legal First Name`}</InputLabel>
                <Input
                  id="firstName"
                  className="inputResponsive"
                  error={!firstNameValidation}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value)
                    setFirstNameValidation(e.target.value.length > 0)
                  }}
                  type="text"
                />
                {!firstNameValidation && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
              </FormControl>
            </div>
            <div>
              <FormControl>
                <InputLabel htmlFor="lastName">{`Legal Last Name`}</InputLabel>
                <Input
                  id="lastName"
                  className="inputResponsive"
                  value={lastName}
                  error={!lastNameValidation}
                  onChange={(e) => {
                    setLastName(e.target.value)
                    setLastNameValidation(e.target.value.length > 0)
                  }}
                  type="text"
                />
                {!lastNameValidation && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
              </FormControl>
            </div>

            <div>
              <EmailElement
                // goToLogin={() => this.props.goTo('/login')}
                className="inputResponsive"
                handleNext={() => {}}
                email={email}
                onChange2={(stateEmail) => {
                  setEmail(stateEmail.email)
                  setEmailValidation(stateEmail.inputValidation2)
                }}
              />
            </div>

            <div>
              <PasswordElement
                className={'inputResponsive'}
                label={'Choose a safe password'}
                handleNext={() => {}}
                onChange={(statePasword) => {
                  setPassword(statePasword.password)
                  setInputValidation2(statePasword.inputValidation)
                }}
                password={password}
              />
            </div>

            <div>
              <FormControl>
                <InputLabel htmlFor="name">{`Company/Group name`}</InputLabel>
                <Input
                  className="inputResponsive"
                  value={companieName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanieName(e.target.value)}
                  type="text"
                  onKeyPress={handleKey}
                />
              </FormControl>
            </div>

            {process.env.REACT_APP_ENV !== 'production' && <ToggleTestMode onClick={() => {}} />}
            <br />

            <p className="italic">{`By signing up, you agree to NachoNacho's Terms of Use and Privacy Policy`}</p>

            <div>
              <ButtonLoadingAfterClick
                id={'idButton'}
                icon={''}
                color={'secondary'}
                disabled={!isFormValidation()}
                variant={'outlined'}
                size={'medium'}
                buttonText={`Submit`}
                buttonLoadingText={`Setting up...`}
                onClick={() => _confirm()}
                loading={loading}
              />
            </div>

            <div className="secondary">{message}</div>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Signup
