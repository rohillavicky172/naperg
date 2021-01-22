import React from 'react'
import Grid from '@material-ui/core/Grid'
import utils from '../../utils'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

import { PlaidBalanceHistorical } from '../PlaidBalanceHistorical.type'
import DateComponent from '../../nav/DateComponent'

type Props = {
  plaidBalanceHistorical: PlaidBalanceHistorical
}

const SinglePlaidBalanceHistorical = (props: Props) => {
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} sm={12}>
              <DateComponent date={props.plaidBalanceHistorical.createdAt} />
            </Grid>

            <Grid item xs={12} sm={12}>
              available:{' '}
              {utils.priceFormated(
                props.plaidBalanceHistorical.available,
                props.plaidBalanceHistorical.iso_currency_code.toLowerCase()
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              Current: {utils.priceFormated(props.plaidBalanceHistorical.current, 'usd')}
            </Grid>
            <Grid item xs={12} sm={12}>
              maxTransaction per week: {utils.priceFormated(props.plaidBalanceHistorical.companie.maxTransactionValue, 'usd')}
            </Grid>
            <Grid item xs={12} sm={12}>
              limitPerTransactionForCardSource:{' '}
              {utils.priceFormated(props.plaidBalanceHistorical.companie.limitPerTransactionForCardSource, 'usd')}
            </Grid>
            <Grid item xs={12} sm={12}>
              Company:{' '}
              <Link className="link" to={'/company/' + props.plaidBalanceHistorical.companie.id}>
                {props.plaidBalanceHistorical.companie.name}
              </Link>
            </Grid>
            <Grid item xs={12} sm={12}>
              name: {props.plaidBalanceHistorical.name}
            </Grid>

            <Grid item xs={12} sm={6}>
              official_name: {props.plaidBalanceHistorical.official_name}
            </Grid>

            <Grid item xs={12} sm={12}>
              last4: {props.plaidBalanceHistorical.mask}
            </Grid>
            <Grid item xs={12} sm={12}>
              type: {props.plaidBalanceHistorical.type} ({props.plaidBalanceHistorical.subtype})
            </Grid>
            <Grid item xs={12} sm={12}></Grid>

            <Grid item xs={12} sm={12}>
              <Link className="link" to={'/plaids/?id=' + props.plaidBalanceHistorical.plaidData.id}>
                PlaidData
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default SinglePlaidBalanceHistorical
