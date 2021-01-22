import React from 'react'

import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Match } from '../../../Match.type'
import AddPlaid from '../../../plaidData/plaid/AddPlaid'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
import Grid from '@material-ui/core/Grid'
// import LogsQueryLight from '../../../log/list/LogsQueryLight'
// import Divider from '@material-ui/core/Divider'
// import Grid from '@material-ui/core/Grid'
// import GoBackArrow from '../../../nav/layout/GoBackArrow'
// import TitlePage from '../../../nav/layout/titlePage/TitlePage'

type State = {}

type Props = {
  match: Match
  context: Context
}

class AddPlaidPage extends React.Component<Props, State> {
  render() {
    const copmanieId = this.props.match.params.companieId
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <TitlePage
              userId={''}
              type="companie"
              companieId={copmanieId}
              objectName="Instant verification with bank credentials"
            />
            <Grid container>
              <Grid item xs={12} sm={6}>
                {/* <span>
                  Please have your bank login credentials (user name, password, etc.), routing number and account number ready.
                </span>
                <div style={{ height: '20px' }} /> */}
                <div className="">
                  <AddPlaid companieId={copmanieId} />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </div>
        {this.props.context.me.role === 'ADMIN' && (
          <div className="paperOut">
            <Paper className="paperIn">
              {/* <LogsQueryLight
                title={'Logs (admin)'}
                variables={{
                  orderBy: 'date_DESC',
                  first: 10,
                  where: {
                    message_contains: 'Plaid',
                    companie: {
                      id: copmanieId
                    }
                  }
                }}
              /> */}
              <h3>Admin</h3>
              <Link to={'/logs/?copmanieId=' + copmanieId}>
                <Button variant="outlined">{'Logs'}</Button>
              </Link>
            </Paper>
          </div>
        )}
      </>
    )
  }
}

export default withContext(AddPlaidPage)
