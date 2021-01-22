
import React from 'react'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import './Style.css'
import AdminDashboardLight from '../../../nav/home/AdminDashboardLight'
import Paper from '@material-ui/core/Paper'
// import LoginPage from '../../../user/auth/login/LoginPage'

type State = {}

type Props = {
  context: Context
}

class DashboardAdminLightPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <AdminDashboardLight />
        </Paper>
      </div>
    )
  }
}

export default withContext(DashboardAdminLightPage)
