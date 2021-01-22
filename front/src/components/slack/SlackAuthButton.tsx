import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { URL_SERVER_ENDPOINT } from '../../config/config'
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

const SlackAuthButton = () => {
  const history = useHistory()
  let errorMessage = ''
  const { context }: { context: Context } = useContext(AppContext)

  const location = useLocation()

  const parsed = queryString.parse(location.search)

  const [slackOauthAccess, data] = useMutation(SLACK_OAUTH_ACCESS)

  if (data.error) {
    errorMessage = data.error.message
  }

  if (data.data && data.data.slackOauthAccess && data.client && parsed.code) {
    delete parsed.code
    history.push('?' + queryString.stringify(parsed))
    data.client.resetStore()
  }
  // const redirectUri = `${window.location.origin}/settings/${context.me.id}?mode=slack`
  const redirectUri = `${window.location.origin}/signup`

  if (parsed.code) {
    if (data.called === false) {
      slackOauthAccess({
        variables: { code: parsed.code, companieId: context.userRoleCompanie.companie.id, redirectUri },
      })
    }
  }

  return (
    <>
      <a
        // href={`https://slack.com/oauth/v2/authorize?scope=chat:write,im:history&client_id=${SLACK.client_id}&redirect_uri=${redirectUri}`}>
        href={`${URL_SERVER_ENDPOINT}/slack/directInstallURL`}>
        <Button color="primary" variant="outlined">
          <img alt="imageSlack" src="/logo/slack/Slack_Mark_Web.png" width="20px" />
          <span className="white">__</span>Connect Slack
        </Button>
      </a>

      <div className="secondary">{errorMessage}</div>
    </>
  )
}

export default SlackAuthButton
