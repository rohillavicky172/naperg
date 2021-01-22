import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'

const queryString = require('query-string')

const SLACK_OAUTH_ACCESS = gql`
  mutation SlackOauthAccess($code: String!, $companieId: String!, $redirectUri: String!) {
    slackOauthAccess(code: $code, companieId: $companieId, redirectUri: $redirectUri) {
      id
    }
  }
`

const SlackAuthCodeListener = () => {
  const history = useHistory()
  // let errorMessage = ''
  const { context }: { context: Context } = useContext(AppContext)

  const location = useLocation()

  const parsed = queryString.parse(location.search)

  const [slackOauthAccess, data] = useMutation(SLACK_OAUTH_ACCESS)

  if (data.error) {
    // errorMessage = data.error.message
    console.log(data.error)
  }

  // if (data.data && data.data.slackOauthAccess && data.client && parsed.code) {
  //   delete parsed.code
  //   history.push('?' + queryString.stringify(parsed))
  //   data.client.resetStore()
  // }
  // const redirectUri = `${window.location.origin}/settings/${context.me.id}?mode=slack`
  const redirectUri = `${window.location.origin}/signup`

  React.useEffect(() => {
    ;(async () => {
      if (!context?.userRoleCompanie?.companie?.id) return
      if (!context?.me?.id) return

      //http://localhost:3000/?code=349219186546.1505798213909.7b417675d2bd57e3459dab9fb938722a12838953e383ac5ef6e2b29fbd6cfb24&companyContext=cju0ju9xv2680074822kpq61l&state=
      if (parsed.code) {
        console.log(data)

        if (data.called === false) {
          let slackOauthAccessData
          try {
            slackOauthAccessData = await slackOauthAccess({
              variables: { code: parsed.code, companieId: context.userRoleCompanie.companie.id, redirectUri },
            })
          } catch (e) {
            console.log(e)
          }
          if (slackOauthAccessData) {
            // delete parsed.code
            // const urlLanding = ``
            console.log(context.me)
            history.push(`/settings/${context.me.id}?mode=slack`)
            // client.resetStore()
          }
        }
      }
    })()
  }, [parsed, history, context, redirectUri, data, slackOauthAccess])

  return null
}

export default SlackAuthCodeListener
