import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Companie } from '../Companie.type'
import { LinearProgress } from '@material-ui/core'
import HelpNotice from '../../issuedCard/single/notice/HelpNotice'
import utils from '../../utils'
import CompanieName from './CompanieName'

type Props = {
  companie: Companie
}

const TrustedCompanie = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={6} className="">
            <h3>
              Limits for <CompanieName companieId={props.companie.id} />{' '}
              <HelpNotice
                text={`This is an account-wide limit, determined by NachoNacho. Please contact us if you would like to increase this limit.`}
              />
            </h3>
          </Grid>
        </Grid>
        <div>
          <Grid container>
            <Grid item xs={12} sm={6} className="">
              <Grid container>
                <Grid item xs={6} sm={6} className="">
                  {`Transaction limit:`}
                </Grid>
                <Grid item xs={6} sm={6} className="">
                  {`${utils.priceFormated(props.companie.maxTransactionValue, 'usd')}/week`}
                </Grid>
                <Grid item xs={12} sm={12} className="">
                  <LinearProgress
                    variant="determinate"
                    value={(props.companie.valueSpent / props.companie.maxTransactionValue) * 100}
                  />
                </Grid>

                <Grid item xs={6} sm={6} className="">
                  {`Total transactions in last 7 days:`}
                </Grid>
                <Grid item xs={6} sm={6} className="">
                  {`${utils.priceFormated(props.companie.valueSpent, 'usd')}`}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </div>
  )
}

export default TrustedCompanie
