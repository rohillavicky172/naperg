import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import { User } from '../../User.type'
import { Link } from 'react-router-dom'
import UpdateUser from '../action/UpdateUser'

type Props = {
  user: User
  onUpdate: () => void
  onCancel: () => void
}

const User2FAForm = (props: Props) => {
  const [user, setUser] = React.useState(props.user)

  return (
    <>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={user.enabled2FATotp}
              disabled={!user.isTwoFactorTotpVerified}
              onChange={(e) =>
                setUser({
                  ...user,
                  enabled2FATotp: e.target.checked,
                })
              }
              value={true}
            />
          }
          label={`Authenticator App`}
        />

        <Link className="link" to={`/settings/${user.id}?mode=totp`}>
          {!user.isTwoFactorTotpVerified && <>Set Up</>}
        </Link>
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={user.enabled2FAPhone}
              disabled={!user.isPhoneValidated}
              onChange={(e) =>
                setUser({
                  ...user,
                  enabled2FAPhone: e.target.checked,
                })
              }
              value={true}
            />
          }
          label={`Phone (${user.phone && user.isPhoneValidated ? user.phoneCode + ' ' + user.phone : ''} )`}
        />
        <Link className="link" to={`/settings/${user.id}?mode=updatePhone`}>
          {!user.isPhoneValidated && <>Set Up</>}
        </Link>
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={user.enabled2FAEmail}
              onChange={(e) =>
                setUser({
                  ...user,
                  enabled2FAEmail: e.target.checked,
                })
              }
              value={true}
            />
          }
          label={`Email (${user.email})`}
        />
      </div>

      <div style={{ height: '10px' }} />

      <div className="">
        <Button onClick={() => props.onCancel()}>{'Cancel'}</Button>{' '}
        <UpdateUser disabled={false} user={user} updateTextButton={'Save'} onUpdate={() => props.onUpdate()} />
      </div>
    </>
  )
}

export default User2FAForm
