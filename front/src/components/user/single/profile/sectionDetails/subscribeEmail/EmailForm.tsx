import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { User } from '../../../../User.type'
import UpdateUser from '../../../action/UpdateUser'

import { FormControlLabel, Switch } from '@material-ui/core'
// import utils from '../../../../utils'

type Props = {
  user: User

  onUpdate: () => void
  onCancel: () => void
}

const EmailForm = (props: Props) => {
  const [user, setUser] = React.useState(props.user)
  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={!user.unsubscribe}
                onChange={(e) =>
                  setUser({
                    ...user,
                    unsubscribe: !e.target.checked,
                  })
                }
                value={true}
              />
            }
            label="Subscribe"
          />
        </div>
      </Grid>

      <Grid item xs={12} sm={12}>
        <br />
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className="">
          <Button onClick={() => props.onCancel()}>{'Cancel'}</Button>
          <UpdateUser disabled={false} user={user} updateTextButton={'Save'} onUpdate={() => props.onUpdate()} />
        </div>
      </Grid>
    </Grid>
  )
}

export default EmailForm
