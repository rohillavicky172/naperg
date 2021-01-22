import React from 'react'
import Paper from '@material-ui/core/Paper'
import GetStarted from './GetStarted'
import { Grid } from '@material-ui/core'
import GetStartedHeader from './GetStartedHeader'
import GetStartedTitle from './GetStartedTitle'

const GetStartedPage = () => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={11} md={10} className="">
            <GetStartedTitle />
            <GetStartedHeader />
            <GetStarted />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default GetStartedPage
