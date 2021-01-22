import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Link } from 'react-router-dom'
import './Style.css'

type State = {}
type Props = {
  context: Context
  // companie: Companie
}

class IconAdminDashboard extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.context.me.role === 'ADMIN' && (
          <>
            <Link to="/dashboardAdmin">
              <Tooltip title="Dashboard Admin">
                <Icon className="iconAlignTextBottom">web</Icon>
              </Tooltip>
            </Link>{' '}
            <Link to="/dashboardAdminDaily">
              <Tooltip title="Dashboard Admin Daily">
                <Icon className="iconAlignTextBottom">today</Icon>
              </Tooltip>
            </Link>{' '}
            <Link to="/dashboardAdminMonthly">
              <Tooltip title="Dashboard Admin Monthly">
                <Icon className="iconAlignTextBottom">date_range</Icon>
              </Tooltip>
            </Link>{' '}
            <Link to="/dashboardAdminYearly">
              <Tooltip title="Dashboard Admin Yearly">
                <Icon className="iconAlignTextBottom">calendar_today</Icon>
              </Tooltip>
            </Link>{' '}
            <Link to="/dashboardAdminLight">
              <Tooltip title="Dashboard Admin light">
                <Icon className="iconAlignTextBottom">web_asset</Icon>
              </Tooltip>
            </Link>
          </>
        )}
      </>
    )
  }
}

export default withContext(IconAdminDashboard)
