import React from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import UserVerificationQuery from './UserVerificationQuery'
import { Grid, Icon, IconButton, Paper } from '@material-ui/core'

const UserVerificationPageOffsite = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  return (
    <div className="responsiveMargin2">
      <div className="paperOut">
        <Paper className="paperIn">
          <>
            <Grid container>
              <Grid item xs={12} className="tar">
                <IconButton onClick={() => context.logout()}>
                  <Icon>clear</Icon>
                </IconButton>
              </Grid>
            </Grid>

            <div className="tac margin6">
              <Link to={'/'}>
                <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoLogo.png" />
              </Link>
            </div>
            <div className="tac responsiveMargin2">
              <h3>Account Verification</h3>

              <UserVerificationQuery />
            </div>
          </>
        </Paper>
      </div>
    </div>
  )
}

export default UserVerificationPageOffsite
