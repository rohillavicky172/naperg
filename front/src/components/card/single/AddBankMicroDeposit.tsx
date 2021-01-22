import React from 'react'
import Button from '@material-ui/core/Button'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { injectStripe } from 'react-stripe-elements'
import { withContext } from '../../withContext'
import { Client } from '../../Client.type'
import { History } from '../../History.type'
import { Context } from '../../Context.type'
import { withRouter } from 'react-router-dom'
import { CREATE_ACH_SOURCE_MUTATION } from '../GraphQL'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Icon from '@material-ui/core/Icon'
import { BankAccountStripe } from './BankAccountStripe.type'

import '../Card.css'

type State = {
  bank: BankAccountStripe
  loading: boolean
  message: string
}

type Props = {
  createAchSourceMutation: any
  buttonText: string
  openSnackBar: (message: string) => void
  createCardMutation: any
  userId: string
  hideCancelButton: Boolean
  // toggleShowAddCard: () => void
  onCancel: () => void
  companieId: string
  stripe: any
  client: Client
  history: History
  context: Context
}

class AddBankMicroDeposit extends React.Component<Props, State> {
  state = {
    loading: false,
    message: '',
    bank: {
      account_holder_name: '',
      account_number: '',
      routing_number: '',
      account_holder_type: 'company',
      currency: 'usd',
      source: 'bank_account',
      country: 'US',
    },
  }

  async submit(ev) {
    ev.preventDefault()
    let data
    this.setState({ loading: true })

    try {
      data = await this.props.stripe.createToken('bank_account', this.state.bank)
    } catch (e) {
      console.log(e)
      this.setState({ loading: false })
      throw e
    }
    this.setState({ loading: false })
    console.log(data)
    if (!data) {
      this.props.context.openSnackBar(true, `Unknown source`, 'message')
      return
    }
    if (data.error) {
      this.props.context.openSnackBar(true, `Unknown source`, 'message')
      return
    }
    console.log(data)
    let acchSource
    try {
      acchSource = await this.props.createAchSourceMutation({
        variables: {
          tokenCardId: data.token.id,
          companieId: this.props.companieId,
        },
      })
      // this.props.toggleShowAddCard()
    } catch (e) {
      console.log(e)
      e.graphQLErrors &&
        e.graphQLErrors.some((graphQLError) => {
          let message = graphQLError.message
          if (
            graphQLError.message ===
            'A bank account with that routing number and account number already exists for this customer.'
          ) {
            message = 'This bank account is already connected to NachoNacho'
          }
          this.setState({ message })
          return true
        })
    }
    if (acchSource) {
      this.props.client.resetStore()
      this.props.history.push('/paymentSource/' + this.props.companieId)
    }
  }

  render() {
    const testMode = this.props.context.testMode
    return (
      <form onSubmit={this.submit.bind(this)}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <h3>{`Add your Bank details`}</h3>
            <h4>
              <Icon className="iconAlignText">info</Icon> {`SUPPORTED BANK ACCOUNT TYPES`}
            </h4>
            <p>
              {`A standard bank account with a financial institution must be provided (e.g., checking). 
Other types of bank accounts (e.g., savings) or those with a virtual bank account provider (e.g., e-wallet or cross-border services) are not supported.`}
            </p>
          </Grid>
          <Grid item xs={12} sm={12}>
            {testMode && (
              <div>
                {`Test Data`}
                <br />
                Type: individual
                <br />
                Account number (success): 000123456789
                <br />
                Account number (NSF/insufficient funds): 000222222227
                <br />
                Routing number: 110000000
                <br />
                <br />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="account_holder_type">{`Type`}</InputLabel>
              <Select
                id="account_holder_type"
                value={this.state.bank.account_holder_type}
                onChange={(e: any) =>
                  this.setState({
                    bank: {
                      ...this.state.bank,
                      account_holder_type: e.target.value,
                    },
                  })
                }>
                <MenuItem value={'company'}>{`Company`}</MenuItem>
                <MenuItem value={'individual'}>{`Individual`}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="account_holder_name">{`Bank account holder's name`}</InputLabel>
              <Input
                id="account_holder_name"
                onChange={(e) =>
                  this.setState({
                    bank: {
                      ...this.state.bank,
                      account_holder_name: e.target.value,
                    },
                  })
                }
                type="text"
                value={this.state.bank.account_holder_name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="account_number">{`Account number`}</InputLabel>
              <Input
                id="account_number"
                onChange={(e) =>
                  this.setState({
                    bank: {
                      ...this.state.bank,
                      account_number: e.target.value,
                    },
                  })
                }
                type="text"
                value={this.state.bank.account_number}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl className="width100per">
              <InputLabel htmlFor="routing_number">{`Routing number`}</InputLabel>
              <Input
                id="routing_number"
                onChange={(e) =>
                  this.setState({
                    bank: {
                      ...this.state.bank,
                      routing_number: e.target.value,
                    },
                  })
                }
                type="text"
                value={this.state.bank.routing_number}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={12} className="tac">
            <div style={{ height: '20px' }} />
            <ButtonLoadingAfterClick
              id={'idButton'}
              size={'medium'}
              icon={''}
              disabled={false}
              color={'primary'}
              variant={'outlined'}
              buttonText={`Add`}
              buttonLoadingText={`Setting up...`}
              onClick={this.submit.bind(this)}
              loading={this.state.loading}
            />{' '}
            {!this.props.hideCancelButton && <Button onClick={this.props.onCancel}>{`Cancel`}</Button>}
          </Grid>
        </Grid>
        <div style={{ height: '10px' }} />
        <div className="secondary">{this.state.message}</div>
      </form>
    )
  }
}

export default compose(
  graphql(CREATE_ACH_SOURCE_MUTATION, {
    name: 'createAchSourceMutation',
  }),
  withContext,
  withRouter,
  withApollo,
  injectStripe
)(AddBankMicroDeposit)
