import React from 'react'
import { AUTH_TOKEN, COOKIE_OPTIONS, AUTH_DEVICE, TEST_MODE, USER_TOKEN, USER_ROLE_COMPANIE } from '../../../../config/config'
import { useLocation } from 'react-router-dom'
import { LOGIN_MUTATION } from '../GraphQL'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { Link } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import utils from '../../../utils'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'

const queryString = require('query-string')
const cookie = require('cookie')

type Props = {
  title: string

  goTo: (path: string) => void
}

const LoginDetails = (props: Props) => {
  const location = useLocation()
  const [email, setEmail] = React.useState('')
  const [errorLogin, setErrorLogin] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [loginMutation] = useMutation(LOGIN_MUTATION)
  const client = useApolloClient()
  const { context }: { context: Context } = React.useContext(AppContext)

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      _confirm()
    }
  }
  const goToWithParams = React.useCallback(
    (page: string) => {
      let parsed = queryString.parse(location.search)
      let url = page + '?' + queryString.stringify(parsed)
      props.goTo(url)
    },
    [location, props]
  )

  React.useEffect(() => {
    if (context.me.id) {
      goToWithParams('/')
    }
  }, [context, goToWithParams])

  const _confirm = async () => {
    setLoading(true)

    try {
      let result = await loginMutation({
        variables: {
          email,
          password,
          authDevice: utils.getAuthDevice(email),
        },
      })
      const { token, authDevice, user } = result.data.login
      _saveUserData(token, authDevice, user)

      setLoading(false)
    } catch (e) {
      console.log(e)

      setLoading(false)
      setErrorLogin(e.graphQLErrors[0].message)
    }
  }

  const _saveUserData = async (token, authDevice, user) => {
    document.cookie = cookie.serialize(AUTH_TOKEN, token, COOKIE_OPTIONS)

    localStorage.setItem(AUTH_DEVICE + '|' + user.email, JSON.stringify(authDevice))

    localStorage.setItem(USER_TOKEN, JSON.stringify(user))
    localStorage.setItem(TEST_MODE, 'false')

    if (user.userRoleCompanies.length) {
      localStorage.setItem(USER_ROLE_COMPANIE, JSON.stringify(user.userRoleCompanies[0]))
    }

    await client.resetStore()
    await context.refreshContext()
  }

  return (
    <div className="tac">
      {queryString.parse(location.search).invitationToken ? (
        <h4>{`Please log in to accept your invitation!`}</h4>
      ) : (
        <h1 className="textSize10 fontWeight19">{props.title}</h1>
      )}
      <div>
        {`New to NachoNacho?`}{' '}
        <span className="link cursor" onClick={() => goToWithParams('/signup')}>
          {`Sign Up`}
        </span>
      </div>
      <br />
      <div>
        <FormControl>
          <InputLabel htmlFor="email">{`Your email address`}</InputLabel>
          <Input id="email" className="inputResponsive" onChange={(e) => setEmail(e.target.value)} type="text" value={email} />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel htmlFor="password">{`Password`}</InputLabel>
          <Input
            id="password"
            className="inputResponsive"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            onKeyPress={handleKeyPress}
            value={password}
          />
        </FormControl>
      </div>
      <br />
      <div className="red">{errorLogin}</div>
      <div>
        <ButtonLoadingAfterClick
          id={'idButton'}
          color={'secondary'}
          icon={''}
          variant={'outlined'}
          disabled={false}
          size={'medium'}
          buttonText={`OK`}
          buttonLoadingText={`Loading...`}
          onClick={() => _confirm()}
          loading={loading}
        />
      </div>
      <div>
        <Link to="/requestPasswordReset">
          <Button>{`Forgot your password?`}</Button>
        </Link>
      </div>
    </div>
  )
}

export default LoginDetails
