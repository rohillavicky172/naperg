
import React from 'react'
import AdminDashboardMonthly from '../../../nav/home/AdminDashboardMonthly'
import Paper from '@material-ui/core/Paper'
import { Context } from '../../../Context.type'
import './Style.css'
// import LoginPage from '../../../user/auth/login/LoginPage'
// import Loading from '../../nav/error/Loading'
// import { COMPANIE_QUERY } from '../GraphQL'
// import { withContext } from '../../../withContext'
// import AdminDashboardDaily from '../../../nav/home/AdminDashboardDaily'

type State = {}

type Props = {
  context: Context
}

class DashboardAdminMonthlyPage extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <AdminDashboardMonthly />
          </Paper>
        </div>
      </>
    )
  }
}

export default DashboardAdminMonthlyPage
