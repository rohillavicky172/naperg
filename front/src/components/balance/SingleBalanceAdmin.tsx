import React from 'react'
import { Link } from 'react-router-dom'
import { Balance } from './Balance.type'
// import InvoicesSum from '../invoice/list/InvoicesSum'
import BalanceSum from '../invoice/list/BalanceSum'
import UpdateBalance from './UpdateBalance'
import DeleteBalance from './DeleteBalance'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import utils from '../utils'
// import Error from '../nav/error/Error'
// import NotFound from '../nav/error/NotFound'
// import Loading from '../nav/error/Loading'
// import { BALANCES_QUERY } from './GraphQL'

type Props = {
  balance: Balance
}

// class SingleBalance extends React.Component<Props, State> {
const SingleBalanceAdmin = (props: Props) => {
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Admin</h3>
          <DeleteBalance balanceId={props.balance.id} />

          <p>
            <Link to={'/logs/?companieId=' + props.balance.companie.id}>
              <Button color="primary" variant="outlined">
                Logs company (admin)
              </Button>
            </Link>
          </p>
          <div>
            maxAvailableAmountToRefund: {utils.priceFormated(props.balance.maxAvailableAmountToRefund, props.balance.currency)}
          </div>
          <div>availableAmountToRefund: {utils.priceFormated(props.balance.availableAmountToRefund, props.balance.currency)}</div>
          <div>
            valueBalance (admin): {utils.priceFormated(props.balance.valueBalance, props.balance.currency)}
            <br />
            {'Dynamic computing valueBalance: '}
            <BalanceSum variables={{ companieId: props.balance.companie.id, type: 'valueBalance' }} />
          </div>
          <div>
            pendingBalance (admin): {utils.priceFormated(props.balance.pendingBalance, props.balance.currency)}
            <br />
            {`Dynamic computing pendingBalance: `}
            <BalanceSum variables={{ companieId: props.balance.companie.id, type: 'pendingBalance' }} />
          </div>
          <div>
            pendingCharge (admin): {utils.priceFormated(props.balance.pendingCharge, props.balance.currency)}
            <br />
            {`Dynamic computing pendingCharge: `}
            <BalanceSum variables={{ companieId: props.balance.companie.id, type: 'pendingCharge' }} />
            {/* <InvoicesSum
                  text={`Dynamic computing pendingCharge`}
                  variables={{
                    where: {
                      testMode: this.props.context.testMode,
                      status: 'PENDING',
                      currency: 'usd',
                      type: 'VIRTUAL_CARD',

                      companie: {
                        id: props.balance.companie.id
                      }
                    }
                  }}
                /> */}
          </div>
          <div>
            pendingSmallAmount (admin): {utils.priceFormated(props.balance.pendingSmallAmount, props.balance.currency)}
            <br />
            {`Dynamic computing pendingSmallAmount: `}
            <BalanceSum variables={{ companieId: props.balance.companie.id, type: 'pendingSmallAmount' }} />
          </div>
          <div>
            unpaidCharge (admin): {utils.priceFormated(props.balance.unpaidCharge, props.balance.currency)}
            <br />
            {`Dynamic computing unpaidCharge: `}
            <BalanceSum variables={{ companieId: props.balance.companie.id, type: 'unpaidCharge' }} />
          </div>

          <div>cashbackPending: {utils.priceFormated(props.balance.cashbackPending, props.balance.currency)}</div>
          <div>cashbackAvailable: {utils.priceFormated(props.balance.cashbackAvailable, props.balance.currency)}</div>
          <h3>Seller</h3>
          <div>revshareSellerTotal: {utils.priceFormated(props.balance.revshareSellerTotal, props.balance.currency)}</div>
          <div>revshareSellerTotalPaid: {utils.priceFormated(props.balance.revshareSellerTotalPaid, props.balance.currency)}</div>
          <UpdateBalance balance={props.balance} />
        </Paper>
      </div>
    </>
  )
}

export default SingleBalanceAdmin
