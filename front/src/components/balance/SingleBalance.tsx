import React from 'react'
import { Balance } from './Balance.type'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import utils from '../utils'
import SingleBalanceAdmin from './SingleBalanceAdmin'
import ActionSingleBalance from './ActionSingleBalance'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { Link } from 'react-router-dom'

type Props = {
  showActionsBalance: boolean
  balance: Balance
  canAddTopUp: boolean
}

const SingleBalance = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={6} className="tal marginAuto">
              <h3>
                {`Available balance for `}
                {props.balance.companie.name}
                {context.me && context.me.role === 'ADMIN' && (
                  <Link className="link" to={'/company/' + props.balance.companie.id}>
                    <Icon className="textSize7">link</Icon>
                  </Link>
                )}
              </h3>
            </Grid>
            <Grid item xs={6} className="tar">
              <h2>{utils.priceFormated(props.balance.valueBalance, props.balance.currency)}</h2>
            </Grid>
          </Grid>
          {props.balance.pendingBalance !== 0 && (
            <>
              <Grid container>
                <Grid item xs={6} className="tal marginAuto">
                  <h3>{`Topup pending `}</h3>
                </Grid>
                <Grid item xs={6} className="tar">
                  <h2>{utils.priceFormated(props.balance.pendingBalance, props.balance.currency)}</h2>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} className="tal marginAuto">
                  <h3>{`Balance after pending topup clears`}</h3>
                </Grid>
                <Grid item xs={6} className="tar">
                  <h2>
                    {utils.priceFormated(props.balance.valueBalance + props.balance.pendingBalance, props.balance.currency)}
                  </h2>
                </Grid>
              </Grid>
            </>
          )}

          {props.showActionsBalance && <ActionSingleBalance balance={props.balance} canAddTopUp={props.canAddTopUp} />}
        </Paper>
      </div>
      {context.me && context.me.role === 'ADMIN' && <SingleBalanceAdmin balance={props.balance} />}
    </>
  )
}

export default SingleBalance
