import React from 'react'
import { AppContext } from '../../../AppContext'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
// import { Context } from '../../../Context.type'
import { User } from '../../user.type'
import Enabled2FAEmailForm from './Enabled2FAEmailForm'
import UseWindowDimensions from '../../../UseWindowDimensions'

type Props = {
  user: User
}

const Email2FASection = (props: Props) => {
  // const { context }: { context: Context } = React.useContext(AppContext)
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
              {`Email:`}
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.user.isEmailValidated ? 'Verified' : 'Not Verified'}/{props.user.enabled2FAEmail ? 'Enabled' : 'Not Enabled'}
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Enabled2FAEmailForm user={props.user} onUpdate={() => setIsEditMode(false)} onCancel={() => setIsEditMode(false)} />
        </>
      )}
    </>
  )
}

export default Email2FASection
