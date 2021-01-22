import React from 'react'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import { User } from '../../User.type'
import UpdateUser from '../action/UpdateUser'

type Props = {
  user: User

  onUpdate: () => void
  onCancel: () => void
}

const Enabled2FAPhoneForm = (props: Props) => {
  const [user, setUser] = React.useState(props.user)

  return (
    <>
      <div>
        <FormControlLabel
          control={
            <Switch
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
          label={`Phone (${user.enabled2FAEmail ? 'ON' : 'OFF'})`}
        />
      </div>

      <div style={{ height: '10px' }} />

      <div className="">
        <Button onClick={() => props.onCancel()}>Cancel</Button>{' '}
        <UpdateUser disabled={false} user={user} updateTextButton={'Save'} onUpdate={() => props.onUpdate()} />
      </div>
    </>
  )
}

export default Enabled2FAPhoneForm
