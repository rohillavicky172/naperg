import React from 'react'

import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const RedirectPage = () => {
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  if (!parsed.redirect) {
    return null
  }
  window.location = parsed.redirect
  return (
    <div
      className="tac"
      style={{
        position: 'absolute',

        left: 0,
        background: 'white',
        width: '100%',
        height: '100%',
        zIndex: 1000
      }}>
      <img src="/logo/NachoNachoLogo.png" style={{ width: '40%', marginTop: '20%' }} alt="logo" />
      <br />
      Loading..
    </div>
  )
}

export default RedirectPage
