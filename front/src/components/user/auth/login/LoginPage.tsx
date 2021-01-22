import React from 'react'
import Login from './Login'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const LoginPage = () => {
  const history = useHistory()
  const goTo = (page: string) => {
    history.push(page)
  }
  const location = useLocation()
  let parsed = queryString.parse(location.search)

  return (
    <>
      <Helmet>
        <title>{`NachoNacho - Login${parsed.redirect ? ` - Redirect to ${parsed.redirect}` : ''}`}</title>
        <meta
          name="description"
          content={`Login to NachoNacho – The payment card that organizes all your subscriptions.${
            parsed.redirect ? ` Redirect to ${parsed.redirect}` : ''
          }`}></meta>
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
      <div className="responsiveMargin2">
        <Login title={`Log In`} goTo={(page: string) => goTo(page)} />
      </div>
    </>
  )
}

export default LoginPage
