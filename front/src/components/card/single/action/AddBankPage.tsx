import React from 'react'

import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Match } from '../../../Match.type'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import GoBackArrow from '../../../nav/layout/GoBackArrow'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
// import AddPlaid from '../../../plaidData/plaid/AddPlaid'

type State = {}

type Props = {
  match: Match
  context: Context
}

class AddBankPage extends React.Component<Props, State> {
  render() {
    const copmanieId = this.props.match.params.companieId
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <GoBackArrow />
            <TitlePage userId={''} type="companie" companieId={copmanieId} objectName="Add bank account" />
            <div style={{ height: '30px' }} />
            <div className="">
              <h3>{`Option 1`}</h3>

              <Link to={'/addPlaid/' + copmanieId}>
                <Button color="primary" variant="outlined">
                  {`Instant verification with bank credentials`}
                </Button>
              </Link>

              <Grid container>
                <Grid item xs={12} sm={8}>
                  <p>
                    {`
                  Log into your bank account securely and verify your bank account instantly. 
                  We use Plaid for instant verification, which is used widely by companies like Venmo for similar purposes.`}
                  </p>
                </Grid>
              </Grid>

              <div style={{ height: '30px' }} />

              <Divider />
              <div style={{ height: '30px' }} />
              <h3>{`Option 2`}</h3>
              <Link to={`/addSource/${copmanieId}?paymentMethod=bank`}>
                <Button color="primary" variant="outlined">
                  {`Delayed verification via microdeposits`}
                </Button>
              </Link>
              <Grid container>
                <Grid item xs={12} sm={8}>
                  <p>
                    {`
                  We will make 2 microdeposits in your bank account. 
                  You should receive these in the next 2-3 business days.
                  Check your account, and enter those amounts in your NachoNacho account.`}
                  </p>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </div>
      </>
    )
  }
}

export default withContext(AddBankPage)
