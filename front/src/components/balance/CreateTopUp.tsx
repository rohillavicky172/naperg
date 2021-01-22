import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { CREATE_TOP_UP } from './GraphQL'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
import FormHelperText from '@material-ui/core/FormHelperText'

type State = {
  loading: boolean
  amountValidation: boolean
  amount: string
}

type Props = {
  // card: Card,
  showCancelButton: boolean
  onCancel: () => void
  onCreateTopUpDone: () => void
  companieId: string
  amount: number
  context: Context
  createTopUp: any
  client: any
  // setDefaultSource: any
}

class CreateTopUp extends React.Component<Props, State> {
  state = {
    amount: '',
    loading: false,
    amountValidation: true,
  }
  createTopUpData = async () => {
    this.setState({ loading: true })
    let charge
    try {
      charge = await this.props.createTopUp({
        variables: {
          amount: Number(this.state.amount),
          companieId: this.props.companieId,
        },
      })
    } catch (e) {
      this.setState({ loading: false })
      e.graphQLErrors.some((graphQLError) => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
      throw e
    }
    if (charge) {
      this.setState({ loading: false })
      this.props.onCreateTopUpDone()
      this.props.context.openSnackBar(true, 'Topup approved', 'message')
      this.props.client.resetStore()
    }
  }

  onChange = (e) => {
    let amount = e.target.value
    // amount = Math.round(amount)

    const amountValidation = amount < 50 ? false : true

    // amount = amount * 1
    if (amount < 0) {
      amount = amount * -1
    }

    this.setState({
      amount: amount.toString(),
      amountValidation,
    })
  }

  render() {
    return (
      <>
        <div>
          <FormControl className="">
            <InputLabel htmlFor="amount">{`Amount`}</InputLabel>
            <Input
              id="amount"
              error={!this.state.amountValidation}
              classes={{ input: 'inputNumber' }}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              type="number"
              onChange={this.onChange}
              value={this.state.amount}
            />
            <p>
              Top up from a Bank Account can take 7 business days.
              <br />
              Top up from a Debit Card is instant.
            </p>
            <FormHelperText error={!this.state.amountValidation}>
              {!this.state.amountValidation && <span>{`Minimum $50`}</span>}
            </FormHelperText>
          </FormControl>
        </div>
        <br />
        <ButtonLoadingAfterClick
          id={'idButton'}
          icon={''}
          color={'primary'}
          variant={'outlined'}
          disabled={!(this.state.amountValidation && this.state.amount)}
          size={'medium'}
          buttonText={`Top up`}
          buttonLoadingText={`Setting up...`}
          onClick={() => {
            this.createTopUpData()
          }}
          loading={this.state.loading}
        />

        {this.props.showCancelButton && <Button onClick={this.props.onCancel}>{`Cancel`}</Button>}
      </>
    )
  }
}

export default compose(
  graphql(CREATE_TOP_UP, {
    name: 'createTopUp',
    // options: (props: Props) => ({
    //   refetchQueries: [
    //     {
    //       query: USER_STRIPE_QUERY,
    //       variables: { userId: props.userId }
    //     }
    //   ]
    // })
  }),
  withApollo,
  withContext
)(CreateTopUp)
