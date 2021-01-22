import React from 'react'
import { UPDATE_PASSWORD_MUTATION } from './GraphQL'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import PasswordElement from '../../user/auth/PasswordElement'
import { useMutation } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

type Props = {
  onCancel: () => void
  onUpdate: () => void
}

const UpdatePasswordForm = (props: Props) => {
  const [updatePassword] = useMutation(UPDATE_PASSWORD_MUTATION)

  const [loading, setLoading] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [newPasswordValide, setNewPasswordValide] = React.useState('')
  const [newPassword2, setNewPassword2] = React.useState('')

  const _confirm = async () => {
    setLoading(true)
    if (!newPassword || !newPassword2 || !oldPassword) {
      setErrorMessage(`Password cannot be null`)
      setLoading(false)
      return
    }
    if (newPassword !== newPassword2) {
      setErrorMessage(`Error: Password doesn't match`)
      setLoading(false)
      return
    }
    let data

    try {
      data = await updatePassword({
        variables: {
          oldPassword,
          newPassword,
        },
      })
    } catch (e) {
      setErrorMessage(e.graphQLErrors[0].message)
      setLoading(false)
    }
    setLoading(false)
    if (data) {
      props.onUpdate()
      setOldPassword('')
      setNewPassword('')
      setNewPassword2('')
      setErrorMessage(`Your password has been changed successfully!`)
    }
  }

  const handleKey = (data) => {
    if (data.charCode === 13) {
      _confirm()
    }
  }

  return (
    <>
      <div>
        <br />
        <div className="tac">
          <FormControl className="width100per">
            <InputLabel htmlFor="oldPassword">{`Your current password`}</InputLabel>
            <Input
              id="oldPassword"
              className=""
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type={'password'}
            />
          </FormControl>
          <PasswordElement
            className={'width100per'}
            label={'New password'}
            handleNext={() => {}}
            onChange={(statePasword) => {
              setNewPassword(statePasword.password)
              setNewPasswordValide(statePasword.inputValidation)
            }}
            password={newPassword}
          />
          <FormControl className="width100per">
            <InputLabel htmlFor="newPassword2">{`Reenter`}</InputLabel>
            <Input
              id="newPassword2"
              className=""
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              type={'password'}
              onKeyPress={handleKey}
            />
          </FormControl>
          <div style={{ height: '25px' }} />
          <ButtonLoadingAfterClick
            id={'uppdatePasswordButton'}
            icon={''}
            color={'primary'}
            variant={'outlined'}
            size={'medium'}
            buttonText={`OK`}
            buttonLoadingText={`Loading...`}
            disabled={!(oldPassword.length && newPassword.length && newPassword2.length && newPasswordValide)}
            onClick={() => _confirm()}
            loading={loading}
          />{' '}
          <Button onClick={() => props.onCancel()}>Cancel</Button>
          <div className="secondary">{errorMessage}</div>
        </div>
      </div>
    </>
  )
}

export default UpdatePasswordForm
