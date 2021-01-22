import React from 'react'
import { Link } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { useParams } from 'react-router'
import { ParamTypes } from '../ParamTypes.type'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'

const MUTATION = gql`
  mutation UnsubscribeUser($userId: String!, $campaignId: String) {
    unsubscribeUser(userId: $userId, campaignId: $campaignId)
  }
`

const UnsubscribePage = () => {
  const history = useHistory()
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const action = parsed.action
  const firstName = parsed.firstName
  const campaignId = parsed.campaignId
  const email = parsed.email
  const params: ParamTypes = useParams<ParamTypes>()
  const [unsubscribeUser] = useMutation(MUTATION)

  const [message, setMessage] = React.useState('')
  const userId = params.userId

  const unsubscribeF = async () => {
    if (action === 'do' && userId && campaignId) {
      let user
      setMessage('loading..')
      try {
        user = await unsubscribeUser({
          variables: {
            userId,
            campaignId,
          },
        })
      } catch (e) {
        setMessage('Error')
        // throw e
      }
      if (user) {
        setMessage('')
        parsed.action = 'done'
        history.replace('?' + queryString.stringify(parsed))
      }
    }
  }

  return (
    <div className="responsiveMargin2">
      <div className="paperOut">
        <div className="tac margin6">
          <Link to={'/'}>
            <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
          </Link>
        </div>

        <Paper className="paperIn">
          {action === 'do' && (
            <div>
              <p>
                {firstName}, you are currently subscribed to our helpful emails messaging for {email}
              </p>
              <p>Do you want remove yourself from helpful emails messaging?</p>
              <div>
                <Button variant="outlined" color="secondary" onClick={() => unsubscribeF()}>
                  Yes, Unsubscribe me
                </Button>
              </div>
            </div>
          )}
          {action === 'done' && (
            <div>
              <p>{firstName}, </p>
              <p>
                You’ve now been unsubscribed from Helpful Emails. These emails help you get the most out of your NachoNacho
                account.
              </p>
              If you clicked Unsubscribe in error, you can re-subscribe here:
              <br />
              <br />
              <div>
                <Link to={`/settings/${userId}?mode=notifications&isEditModeProfile=true`}>
                  <Button color="primary" variant="outlined">
                    Resubscribe to Helpful Emails
                  </Button>
                </Link>
              </div>
              <p>Re-subscribe to Helpful Emails at any time by changing the notification settings in your account.</p>
              <p>Thank you!</p>
              <p>The NachoNacho Team</p>
            </div>
          )}

          <br />
          <div className="secondary">{message}</div>
        </Paper>
      </div>
    </div>
  )
}

export default UnsubscribePage
