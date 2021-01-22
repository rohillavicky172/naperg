import React from 'react'
import Signup from './Signup'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
const queryString = require('query-string')

const SignupPage = () => {
  const location = useLocation()
  let parsed = queryString.parse(location.search)

  const history = useHistory()

  const { context }: { context: Context } = React.useContext(AppContext)

  React.useEffect(() => {
    if (context.me.id) {
      const parsed = queryString.parse(location.search)

      history.replace('/?' + queryString.stringify(parsed))
    }
  }, [context.me, history, location.search])

  return (
    <>
      <Helmet>
        <title>{`NachoNacho - Sign Up${parsed.redirect ? ` - Redirect to ${parsed.redirect}` : ''}`}</title>
        <meta
          name="description"
          content={`NachoNacho - NachoNacho THE B2B SaaS Marketplace - Sign Up to manage your subscriptions${
            parsed.redirect ? ` Redirect to ${parsed.redirect}` : ''
          }`}
        />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
      <div className="responsiveMargin2">
        <div className="tac margin6">
          <Link to={'/'}>
            <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
          </Link>
        </div>
        <Signup />
      </div>
    </>
  )
}

export default SignupPage
