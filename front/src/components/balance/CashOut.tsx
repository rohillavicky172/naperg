import React from 'react'
import { withApollo, graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Button from '@material-ui/core/Button'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Balance } from '../balance/Balance.type'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { CASH_OUT } from './GraphQL'
import utils from '../utils'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'

type State = {
  loading: boolean
}

type Props = {
  context: Context
  cashOut: any
  client: any
  companieId: string
  onCancel: () => void
  onUpdate: () => void
  balance: Balance
}

class CashOut extends React.Component<Props, State> {
  state = {
    loading: false
  }
  cashOut = async () => {
    this.setState({ loading: true })
    let charge
    try {
      charge = await this.props.cashOut({
        variables: {
          companieId: this.props.companieId
        }
      })
    } catch (e) {
      this.setState({ loading: false })
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
      throw e
    }
    this.setState({ loading: false })
    if (charge) {
      this.props.onUpdate()
      // this.props.context.openSnackBar(true, 'Charge Created. ID: ' + charge.data.cashOut.id, 'message')
      this.props.client.resetStore()
    }
  }

  render() {
    return (
      <>
        <div>
          <Grid container>
            <Grid item xs={12} sm={6} className="red">
              {`We will transfer ${utils.priceFormated(
                this.props.balance.valueBalance,
                this.props.balance.currency
              )} to the payment source you used to topup your balance.`}
            </Grid>
          </Grid>
        </div>
        <br />
        {/* <Button color="primary" variant="outlined" onClick={() => this.cashOut()}>
          {``}
        </Button> */}
        <ButtonLoadingAfterClick
          id={'idButton'}
          icon={''}
          disabled={false}
          color={'primary'}
          variant={'outlined'}
          size={'medium'}
          buttonText={`Yes, go ahead`}
          buttonLoadingText={`Setting up...`}
          onClick={() => {
            this.cashOut()
          }}
          loading={this.state.loading}
        />{' '}
        <Button onClick={this.props.onCancel}>{`Cancel`}</Button>
      </>
    )
  }
}

export default compose(
  graphql(CASH_OUT, {
    name: 'cashOut'
  }),
  withApollo,
  withContext,
  withRouter
)(CashOut)
