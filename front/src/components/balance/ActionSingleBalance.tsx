import React from 'react'
import { Balance } from './Balance.type'
import CreateTopUp from './CreateTopUp'
import AutoTopUp from './AutoTopUp'
import CashOut from './CashOut'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import { AppContext } from '../AppContext'
import { Context } from '../Context.type'

type Props = {
  // showActionsBalance: boolean

  balance: Balance
  canAddTopUp: boolean
}

// class SingleBalance extends React.Component<Props, State> {
const ActionSingleBalance = (props: Props) => {
  const [mode, setMode] = React.useState('')
  const { context }: { context: Context } = React.useContext(AppContext)

  // toggleEditMode = () => this.setState({ editMode: !this.state.editMode })

  return (
    <>
      {props.balance.isEnabled && !props.balance.companie.isTrustedPayment && mode === '' && (
        <Grid container>
          <Grid item xs={12} sm={6} className="">
            {`NachoNacho will automatically draw funds from your primary payment source to maintain a balance of at least $${props.balance.minimumBalance}.  
      The minimum funds drawn will be $50 to minimize transaction costs.`}
          </Grid>
        </Grid>
      )}

      {mode === '' && (
        <div className="">
          <div style={{ height: '30px' }} />
          <Button
            disabled={!props.canAddTopUp}
            color="primary"
            variant="outlined"
            onClick={() => setMode('topUp')}>{`Top up now`}</Button>{' '}
          {context.userRoleCompanie.permissions.includes('canAutoTopUp') && (
            <>
              {!props.balance.companie.isTrustedPayment && (
                <>
                  <Button disabled={!props.canAddTopUp} color="primary" variant="outlined" onClick={() => setMode('autoTopUp')}>
                    {!props.balance.isEnabled ? <span> {`Enable auto topup`}</span> : <span>{'Edit auto topup'}</span>}
                  </Button>{' '}
                </>
              )}
            </>
          )}
          {context.userRoleCompanie.permissions.includes('canCashOut') && (
            <>
              {!props.balance.companie.hideCashOut && (
                <Button
                  disabled={props.balance.valueBalance < 1}
                  color="primary"
                  variant="outlined"
                  onClick={() => setMode('cashOut')}>{`Cash out`}</Button>
              )}
            </>
          )}{' '}
        </div>
      )}
      {mode === 'topUp' && (
        <>
          <h3>Top up</h3>
          <CreateTopUp
            showCancelButton={true}
            companieId={props.balance.companie.id}
            onCancel={() => setMode('')}
            onCreateTopUpDone={() => setMode('')}
          />
        </>
      )}
      {mode === 'cashOut' && (
        <>
          <h3>Cash out</h3>
          <CashOut
            companieId={props.balance.companie.id}
            balance={props.balance}
            onCancel={() => setMode('')}
            onUpdate={() => setMode('')}
          />
        </>
      )}
      {mode === 'autoTopUp' && (
        <>
          <AutoTopUp
            balance={props.balance}
            companieId={props.balance.companie.id}
            onCancel={() => setMode('')}
            onCreateAutoTopUpDone={() => setMode('')}
          />
        </>
      )}
    </>
  )
}

export default ActionSingleBalance
