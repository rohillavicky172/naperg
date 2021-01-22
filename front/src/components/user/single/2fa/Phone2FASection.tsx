import React from 'react'
import { AppContext } from '../../../AppContext'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { Context } from '../../../Context.type'
import { User } from '../../user.type'
import Enabled2FAPhoneForm from './Enabled2FAPhoneForm'
import UseWindowDimensions from '../../../UseWindowDimensions'

type Props = {
  user: User
}

const AuthDevice2FAQuery = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const [isEditMode, setIsEditMode] = React.useState(false)
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      {!isEditMode ? (
        <>
          <div className="tar">
            <Button color={'primary'} variant="outlined" size="small" onClick={() => setIsEditMode(true)}>
              {`Edit`}
            </Button>
          </div>
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              {`Phone:`}
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.user.isPhoneValidated ? 'Verified' : 'Not Verified'}/{props.user.enabled2FAPhone ? 'Enabled' : 'Not Enabled'}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Enabled2FAPhoneForm user={props.user} onUpdate={() => setIsEditMode(false)} onCancel={() => setIsEditMode(false)} />
        </>
      )}
    </>
  )
}

export default AuthDevice2FAQuery
