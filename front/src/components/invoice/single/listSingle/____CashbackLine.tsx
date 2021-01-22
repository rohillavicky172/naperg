import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Divider from '@material-ui/core/Divider'
import { Invoice } from '../../Invoice.type'
import '../Style.css'
import utils from '../../../utils'

type Props = {
  invoice: Invoice
}

const CashbackLine = (props: Props) => {
  return (
    <>
      {props.invoice.cashback > 0 && (
        // <Paper className="paperIn">
        <Grid container className="reward textSize6">
          <Grid item xs={12} sm={12} className="marginAuto">
            <Divider />
            <div style={{ height: '10px' }} />
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto"></Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            <Icon className="reward textSize12">card_giftcard</Icon>
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            <div>Cashback</div>
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            {utils.mappingCashbackStatus(props.invoice.cashbackStatus)}
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto">
            {utils.priceFormated(props.invoice.cashback, props.invoice.currency)}
          </Grid>
          <Grid item xs={12} sm={2} className="marginAuto"></Grid>
        </Grid>
        // </Paper>
      )}
    </>
  )
}

export default CashbackLine
