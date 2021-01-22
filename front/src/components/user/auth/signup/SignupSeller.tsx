import React from 'react'
import { AUTH_TOKEN, COOKIE_OPTIONS, USER_TOKEN, AUTH_DEVICE, USER_ROLE_COMPANIE } from '../../../../config/config'
import { SIGNUP_SELLER_MUTATION } from '../GraphQL'
import PasswordElement from '../PasswordElement'
import { useHistory } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'
import EmailElement from '../EmailElement'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { Helmet } from 'react-helmet'
import utils from '../../../utils'

import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

const cookie = require('cookie')
const queryString = require('query-string')

const SignupSeller = () => {
  const [signupSellerMutation] = useMutation(SIGNUP_SELLER_MUTATION)
  const history = useHistory()
  const client = useApolloClient()
  const location = useLocation()

  const [loading, setLoading] = React.useState(false)
  const [lastNameValidation, setLastNameValidation] = React.useState(true)
  const [firstNameValidation, setFirstNameValidation] = React.useState(true)
  const [emailValidation, setEmailValidation] = React.useState(true)
  const [inputValidation2, setInputValidation2] = React.useState(true)
  const [productNameValidation, setProductNameValidation] = React.useState(true)
  const [password, setPassword] = React.useState('')
  // const [companieName, setCompanieName] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [productName, setProductName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [email, setEmail] = React.useState(
    queryString.parse(location.search).email ? queryString.parse(location.search).email : ''
  )

  const isFormValidation = () => {
    return (
      lastNameValidation &&
      firstNameValidation &&
      productNameValidation &&
      emailValidation &&
      email.length > 1 &&
      inputValidation2
    )
  }

  const _confirm = async () => {
    if (!isFormValidation()) {
      setMessage('Error')
      return
    }

    // const { password } = this.state
    if (!password) {
      setMessage('No password')
      return
    }
    setLoading(true)

    let result
    try {
      result = await signupSellerMutation({
        variables: {
          password: password,
          firstName: firstName,
          lastName: lastName,
          productName: productName,
          email: email,
          authDevice: utils.getAuthDevice(email),
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
    const { token, authDevice, user } = result.data.signupSeller
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
    // await this.props.context.refreshContext()
  }

  const goToWithParams = (page: string) => {
    let parsed = queryString.parse(location.search)
    let url = page + '?' + queryString.stringify(parsed)
    history.push(url)
  }

  return (
    <>
      <Helmet>
        <title>NachoNacho THE B2B SaaS Marketplace - Sign Up Seller</title>

        <meta
          name="description"
          content="NachoNacho - NachoNacho THE B2B SaaS Marketplace - Sign Up Seller to list your SAAS product"
        />
      </Helmet>

      <div className="paperOut">
        <Paper className="paperIn">
          <div className="tac">
            {queryString.parse(location.search).invitationToken && <h4>{`Approve Invitation`}</h4>}
            <h3>Sign Up</h3>

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
                  <InputLabel htmlFor="firstName">{`First Name`}</InputLabel>
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
                  <InputLabel htmlFor="lastName">{`Last name`}</InputLabel>
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
                  <InputLabel htmlFor="productName">{`Product Name`}</InputLabel>
                  <Input
                    id="productName"
                    className="inputResponsive"
                    value={productName}
                    error={!productNameValidation}
                    onChange={(e) => {
                      setProductName(e.target.value)
                      setProductNameValidation(e.target.value.length > 0)
                    }}
                    type="text"
                  />
                  {!productNameValidation && <FormHelperText error>{`Cannot be empty`}</FormHelperText>}
                </FormControl>
              </div>

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
    </>
  )
}

export default SignupSeller
