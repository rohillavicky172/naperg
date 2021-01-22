
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
// import { USER_STRIPE_QUERY } from '../../GraphQL'
import Button from '@material-ui/core/Button'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Balance } from '../balance/Balance.type'
import { CREATE_AUTO_TOP_UP } from './GraphQL'
import FormControl from '@material-ui/core/FormControl'
// import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import FormHelperText from '@material-ui/core/FormHelperText'

type State = {
  isEnabled: boolean,
  minimumBalance: number,
  minimumBalanceValidation: boolean
}

type Props = {
  balance: Balance,
  amount: number,
  context: Context,
  createTopUp: any,
  client: any,
  onCancel: () => void,
  onCreateAutoTopUpDone: () => void,
  createAutoTopUp: any
  // setDefaultSource: any
}

class AutoTopUp extends React.Component<Props, State> {
  state = {
    minimumBalance: this.props.balance.minimumBalance,
    minimumBalanceValidation: true,

    isEnabled: this.props.balance.isEnabled
  }

  handleChange = () => {
    this.setState({ isEnabled: !this.state.isEnabled })
  }

  createAutoTopUp = async () => {
    let charge
    try {
      charge = await this.props.createAutoTopUp({
        variables: {
          minimumBalance: this.state.minimumBalance * 1,
          isEnabled: this.state.isEnabled,
          where: {
            id: this.props.balance.id
          }
        }
      })
    } catch (e) {
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
      throw e
    }
    if (charge) {
      this.props.context.openSnackBar(true, 'Auto topup changed', 'message')
      this.props.onCreateAutoTopUpDone()
      // this.props.context.openSnackBar(true, 'Charge Created. ID: ' + charge.data.createTopUp.id, 'message')
      this.props.client.resetStore()
    }
  }

  onChange = e => {
    let value = e.target.value
    // amount = Math.round(amount)

    // if (typeof e.target.value !== 'string') {
    // value = parseInt(value)
    if (value < 0) {
      value = value * -1
    }

    const minimumBalanceValidation = value < 50 ? false : true
    // }
    this.setState({
      isEnabled: true,
      minimumBalance: value,
      minimumBalanceValidation
    })
  }

  render() {
    return (
      <>
        <h3>{`Auto top up`}</h3>
        <div>
          <FormControlLabel
            classes={{ label: this.state.isEnabled ? 'red' : '' }}
            control={<Switch checked={this.state.isEnabled} onChange={() => this.handleChange()} />}
            label={this.state.isEnabled ? 'Enabled' : 'Disabled'}
          />
        </div>
        <h4>{`Always maintain a minimum balance of:`}</h4>
        <div>
          <FormControl className="">
            <Input
              id="amount"
              error={!this.state.minimumBalanceValidation}
              classes={{ input: 'inputNumber' }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              type="number"
              onChange={this.onChange}
              value={this.state.minimumBalance}
              aria-describedby="component-error-text"
            />

            <FormHelperText error={!this.state.minimumBalanceValidation}>
              {!this.state.minimumBalanceValidation && <span>{`Minimum $50`}</span>}
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          disabled={!(this.state.minimumBalanceValidation && this.state.minimumBalance)}
          color="primary"
          variant="outlined"
          onClick={() => this.createAutoTopUp()}>
          {`Save`}
        </Button>{' '}
        <Button onClick={this.props.onCancel}>{`Cancel`}</Button>
      </>
    )
  }
}

export default compose(
  graphql(CREATE_AUTO_TOP_UP, {
    name: 'createAutoTopUp'
  }),
  withApollo,
  withContext
)(AutoTopUp)
