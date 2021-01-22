import React from 'react'
import CreateNewUser from './CreateNewUser'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { Icon, Paper } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const SignupUserPage = () => {
  const [message, setMessage] = React.useState('')
  const { context }: { context: Context } = React.useContext(AppContext)

  const nnCodeJson = {
    invitedById: context.me.id,
    invitedByFirstName: context.me.firstName,
    invitedByLastName: context.me.lastName,
  }
  const nnCode = window.btoa(JSON.stringify(nnCodeJson))

  const link = `https://app.nachonacho.com/signup?nnCode=${nnCode}`
  return (
    <div className="responsiveMargin2">
      <div className="paperOut">
        <Paper className="paperIn">
          <CreateNewUser
            showPrivateMessageInviter={true}
            title={`Invite your contacts`}
            subTitle={`NachoNacho makes it really easy for businesses to manage their subscriptions. Your contacts would appreciate the invite - and so will we at NachoNacho!`}
            signupType={'USERFORM'}
          />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Invitation link</h3>
          <div>
            <CopyToClipboard text={link} onCopy={() => setMessage('Copied!')} className="cursor">
              <Icon className="textSize12" color="primary">
                file_copy
              </Icon>
            </CopyToClipboard>
            <span className="white">_</span>
            Copy to clipboard
          </div>
          <div onClick={() => setMessage('')}>
            <pre>{link}</pre>
            <div className="secondary">{message}</div>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default SignupUserPage
