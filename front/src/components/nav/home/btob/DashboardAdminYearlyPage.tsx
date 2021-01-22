
import React from 'react'
import AdminDashboardYearly from '../../../nav/home/AdminDashboardYearly'
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

class DashboardAdminYearlyPage extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <AdminDashboardYearly />
          </Paper>
        </div>
      </>
    )
  }
}

export default DashboardAdminYearlyPage
