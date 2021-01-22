export const AUTH_TOKEN = 'auth-token-nn'
export const AUTH_DEVICE = 'auth-device'
export const USER_TOKEN = 'userToken'
export const USER_ROLE_COMPANIE = 'userRoleCompanie'
export const USER_ROLE_COMPANIE_ADMIN_WHILE_SPOOFING = 'userRoleCompanieAdminWhileSpoofing'
export const TEST_MODE = 'test-mode'
export const SPOOFED_USER_ID = 'spoofed-user-id'
export const REACTGA_ID = 'UA-122955722-2'
// export const SPOOFED_USER_AS_ADMIN_ID = 'spoofed-user-as-admin-id'
// export const STRIPE_KEY_PK_TEST = 'pk_test_tM0LP7u1kZGXfItnLF2AX4Hr'
// export const STRIPE_KEY_PK_LIVE = 'pk_live_dvs371P8HQXmVeGHhA87AL3q'

let cookieOptions = {}
let fullStory = {
  ORG_ID: '',
}
let stripe = {
  STRIPE_KEY_PK_TEST: '',
  STRIPE_KEY_PK_LIVE: '',
}
let plaid = {
  PUBLIC_KEY_PLAID: '',
  WEBHOOK: '',
}
let slack = {
  client_id: '',
}

let url_server_media = ''
let url_server_endpoint = ''
let url_server_upload = ''
let url_server_graphql = ''
let url_frontEnd = ''

if (process.env.REACT_APP_ENV === 'local') {
  slack = {
    client_id: '349219186546.936765661634',
  }
  cookieOptions = {
    domain: 'localhost',
    path: '/',
    maxAge: 172800,

    // secure: true
    // httpOnly: true
  }

  stripe = {
    STRIPE_KEY_PK_TEST: 'pk_test_tM0LP7u1kZGXfItnLF2AX4Hr',
    STRIPE_KEY_PK_LIVE: 'Npk_live_dvs371P8HQXmVeGHhA87AL3qONE',
  }
  plaid = {
    PUBLIC_KEY_PLAID: 'a096e037c2e6a4d13c9a5f10fb2356',
    WEBHOOK: 'https://endpoint.nachonacho.com/plaid',
  }

  url_server_upload = 'http://localhost:5000'
  url_server_media = 'https://files.nachonacho.com'
  url_server_endpoint = 'https://endpoint.nachonacho.com'
  url_server_graphql = 'http://localhost:4000'
  url_frontEnd = 'http://localhost:3000'
}
if (process.env.REACT_APP_ENV === 'dev') {
  slack = {
    client_id: '349219186546.1367304552357',
  }
  cookieOptions = {
    domain: '.nachonacho.co',
    path: '/',
    maxAge: 172800,
    // secure: true,
    // httpOnly: true
  }

  stripe = {
    STRIPE_KEY_PK_TEST: 'pk_test_Felr1a2BJ0OaGwLe6XgjKR9T00oxym8OL3',
    STRIPE_KEY_PK_LIVE: 'pk_test_Felr1a2BJ0OaGwLe6XgjKR9T00oxym8OL3',
  }
  plaid = {
    PUBLIC_KEY_PLAID: 'c718c36f0db040aad68d8f4b865fe1',
    WEBHOOK: 'https://endpoint.nachonacho.co/plaid',
    // //sternwebagency account
    // PUBLIC_KEY_PLAID: '447f2b23a34d8fcae3e46a83acb0ff',
    // WEBHOOK: 'https://endpoint.nachonacho.co/plaid'
  }
  url_server_media = 'https://files.nachonacho.com'
  url_server_endpoint = 'https://endpoint.nachonacho.co'
  url_server_upload = 'https://media.nachonacho.co'
  url_server_graphql = 'https://api.nachonacho.co'
  url_frontEnd = 'https://app.nachonacho.co'
}
if (process.env.REACT_APP_ENV === 'production') {
  slack = {
    client_id: '349219186546.936765661634',
  }
  cookieOptions = {
    domain: '.nachonacho.com',
    path: '/',
    maxAge: 172800,
    // secure: true,
    // httpOnly: true
  }
  fullStory = {
    ORG_ID: 'R32XW',
  }

  stripe = {
    STRIPE_KEY_PK_TEST: 'pk_test_tM0LP7u1kZGXfItnLF2AX4Hr',
    STRIPE_KEY_PK_LIVE: 'pk_live_dvs371P8HQXmVeGHhA87AL3q',
  }
  plaid = {
    PUBLIC_KEY_PLAID: 'a096e037c2e6a4d13c9a5f10fb2356',
    WEBHOOK: 'https://endpoint.nachonacho.com/plaid',
  }
  url_server_media = 'https://files.nachonacho.com'
  url_server_endpoint = 'https://endpoint.nachonacho.com'
  url_server_upload = 'https://media.nachonacho.com'
  url_server_graphql = 'https://api.nachonacho.com'
  url_frontEnd = 'https://app.nachonacho.com'
}

export const COOKIE_OPTIONS = cookieOptions
export const STRIPE = stripe
export const PLAID = plaid
export const FULLSTORY = fullStory
export const SLACK = slack
// export const URL_SERVER_GRAPHQL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/api/'
export const URL_SERVER_GRAPHQL = url_server_graphql
export const URL_FRONTEND = url_frontEnd

// export const URL_SERVER_MEDIA = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '/media/'
export const URL_SERVER_MEDIA = url_server_media
export const URL_SERVER_ENDPOINT = url_server_endpoint
export const URL_SERVER_UPLOAD = url_server_upload
export const INTERCOM_APP_ID = 'a6m4e84y'
export const URL_MARKETPLACE = 'https://nachonacho.com/marketplace/'
