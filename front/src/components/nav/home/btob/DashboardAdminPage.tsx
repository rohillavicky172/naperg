
import React from 'react'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import './Style.css'
import AdminDashboard from '../../../nav/home/AdminDashboard'
import Paper from '@material-ui/core/Paper'

type State = {}

type Props = {
  context: Context
}

class DashboardAdminPage extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <AdminDashboard />
        </Paper>
      </div>
    )
  }
}

export default withContext(DashboardAdminPage)
