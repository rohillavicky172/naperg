import React from 'react'
import ReactDOM from 'react-dom'
import { AUTH_TOKEN, USER_TOKEN, AUTH_DEVICE, TEST_MODE, SPOOFED_USER_ID, URL_SERVER_GRAPHQL } from './config/config'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, from } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import './index.css'
import App from './components/App'
// import * as serviceWorker from './serviceWorker'
const cookie = require('cookie')

const httpLink = new HttpLink({ uri: URL_SERVER_GRAPHQL })


console.log(URL_SERVER_GRAPHQL)
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = cookie.parse(document.cookie)[AUTH_TOKEN]

  // console.log(cookie.parse(document.cookie))
  const testModeHeader = localStorage.getItem(TEST_MODE)

  let deviceTokenHeader = ''

  const userTokenString = localStorage.getItem(USER_TOKEN)
  if (userTokenString) {
    const userToken = JSON.parse(userTokenString ? userTokenString : '{}')

    const email = userToken.email
    const authDeviceString = localStorage.getItem(AUTH_DEVICE + '|' + email)

    if (authDeviceString) {
      const authDevice = JSON.parse(authDeviceString ? authDeviceString : '{}')
      deviceTokenHeader = authDevice.deviceToken
    }
  }

  const spoofeduserheader = localStorage.getItem(SPOOFED_USER_ID) ? localStorage.getItem(SPOOFED_USER_ID) : ''
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
      deviceToken: deviceTokenHeader,
      testMode: testModeHeader,
      spoofeduserheader: spoofeduserheader,
    },
  })
  return forward(operation)
})

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const {
      response: { headers },
    } = context

    if (headers) {
      const refreshToken = headers.get('refreshToken')
      // console.log(refreshToken)
      if (refreshToken) {
        localStorage.setItem(AUTH_TOKEN, refreshToken)
        console.log('newTokenRefreshed')
      }
    }

    return response
  })
})

const client = new ApolloClient({
  link: from([middlewareAuthLink, afterwareLink, httpLink]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// if (process.env.REACT_APP_ENV === 'production' && false) {
//   serviceWorker.register({
//     onUpdate: async (registration) => {
//       // We want to run this code only if we detect a new service worker is
//       // waiting to be activated.
//       // Details about it: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
//       if (registration && registration.waiting) {
//         await registration.unregister()
//         // Makes Workbox call skipWaiting()
//         registration.waiting.postMessage({ type: 'SKIP_WAITING' })
//         // Once the service worker is unregistered, we can reload the page to let
//         // the browser download a fresh copy of our app (invalidating the cache)
//         window.location.reload()
//       }
//     },
//   })
// }

// const rootElement = document.getElementById('root')
// if (rootElement.hasChildNodes()) {
//   hydrate(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
//   , rootElement)
// } else {
//   render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>
//   , rootElement)
// }
