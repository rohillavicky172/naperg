import React from 'react'
// import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { useMutation } from '@apollo/react-hooks'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { FORGET_PASSWORD_MUTATION } from './GraphQL'
import { Link } from 'react-router-dom'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
const validator = require('email-validator')

// class RequestPasswordReset extends React.Component<Props, State> {
const RequestPasswordReset = () => {
  // const history = useHistory()

  const [forgetPasswordMutation] = useMutation(FORGET_PASSWORD_MUTATION)
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [emailValide, setEmailValide] = React.useState(true)
  // state = {
  //   email: ''
  // }

  const _confirm = async () => {
    setLoading(true)
    setMessage('')
    // const { email } = this.state
    let data
    let messageSnackBar = ''
    try {
      data = await forgetPasswordMutation({
        variables: {
          email,
        },
      })
    } catch (e) {
      setLoading(false)

      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    setLoading(false)
    if (data) {
      console.log(data && data.data)
      messageSnackBar = `A mail has been sent with a link available until
      ${new Date(data.data.forgetPassword.resetPasswordExpires).toLocaleString()}`
      setMessage(messageSnackBar)
      setEmail('')
      // history.push('/')
    }
  }
  const handleKey = (data) => {
    if (data.charCode === 13 && emailValide) {
      _confirm()
    }
  }

  return (
    <div className="paperOut responsiveMargin2">
      <div className="tac margin6">
        <Link to={'/'}>
          <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
        </Link>
      </div>
      <Paper className="paperIn">
        <div className="tac">
          <h3>{`Reset password`}</h3>

          <FormControl>
            <InputLabel htmlFor="email">{`Your email address`}</InputLabel>
            <Input
              id="email"
              className="inputResponsive"
              onKeyPress={handleKey}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailValide(e.target.value && validator.validate(e.target.value))
              }}
              type="text"
              value={email}
            />
          </FormControl>

          <br />
          <br />
          <div>
            <ButtonLoadingAfterClick
              id={'idRequestPasswordReset'}
              disabled={!emailValide}
              icon={''}
              size={'medium'}
              color={'primary'}
              variant={'outlined'}
              buttonText={'OK'}
              buttonLoadingText={`Setting up...`}
              onClick={() => _confirm()}
              loading={loading}
            />

            {/* <Button variant="outlined" onClick={() => _confirm()}>
              {`OK`}
            </Button> */}
            <div style={{ height: '10px' }} />
            <div className="secondary">{message}</div>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default RequestPasswordReset
