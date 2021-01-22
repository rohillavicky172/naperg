import React from 'react'
import { Paper } from '@material-ui/core/'
import StripeBalanceRetrieve from '../../stripeData/StripeBalanceRetrieve'

const StripeBalancePage = () => {
  return (
    <div className="paperOut">
      <Paper className="paperIn bgGrey">
        <h2>Stripe Balance</h2>
        <StripeBalanceRetrieve alwaysShow={true} />
      </Paper>
    </div>
  )
}

export default StripeBalancePage
