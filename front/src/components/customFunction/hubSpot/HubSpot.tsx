import React from 'react'
import { Button, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
// import HubSpotAuhtorize from './HubSpotAuhtorize'
import HubSpotContacts from './HubSpotContacts'
// import HubSpotCompanies from './HubSpotCompanies'

const HubSpot = () => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h2>Hubspot</h2>

        <Link className="link" to={`/logs?event=refreshContactsHubspot`}>
          <Button variant="outlined" color="primary">
            Logs
          </Button>
        </Link>

        {/* <HubSpotAuhtorize /> */}
        <br />
        <br />
        <Grid container>
          <Grid item xs={12} sm={12} className="">
            <HubSpotContacts />
          </Grid>
          {/* <Grid item xs={12} sm={6} className="">
            <HubSpotCompanies />
          </Grid> */}
        </Grid>
      </Paper>
    </div>
  )
}

export default HubSpot
