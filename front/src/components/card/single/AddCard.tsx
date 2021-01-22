import React from 'react'
import Button from '@material-ui/core/Button'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { injectStripe, CardCVCElement, CardExpiryElement, CardNumberElement } from 'react-stripe-elements'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { History } from '../../History.type'
import { Client } from '../../Client.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { CREATE_CARD_MUTATION } from '../GraphQL'
import { withRouter } from 'react-router-dom'
import '../Card.css'

type State = {
  loading: boolean
  message: string
}

type Props = {
  companieId: string
  buttonText: string

  createCardMutation: any
  userId: string
  hideCancelButton: Boolean
  // toggleShowAddCard: () => void
  onCancel: () => void
  stripe: any
  context: Context
  client: Client
  history: History
}

class AddCard extends React.Component<Props, State> {
  state = {
    message: '',
    loading: false,
  }

  async submit(ev) {
    ev.preventDefault()
    this.setState({ loading: true })
    let { token } = await this.props.stripe.createToken({
      name: ' (' + this.props.context.me.firstName + ' ' + this.props.context.me.lastName + ')',
    })
    if (!token) {
      this.setState({ loading: false })

      this.setState({ message: `Unknown source` })
      return
    }
    let card
    try {
      card = await this.props.createCardMutation({
        variables: {
          tokenCardId: token.id,
          companieId: this.props.companieId,
        },
      })
      // this.props.toggleShowAddCard()
    } catch (e) {
      this.setState({ loading: false })
      const message = 'Unfortunately your card did not work. Please try again or use a different card.'

      e.graphQLErrors.some((graphQLError) => this.setState({ message: message + ' ' + graphQLError.message }))
      throw e
    }
    this.setState({ loading: false })
    if (card) {
      this.props.client.resetStore()
      this.props.history.push('/paymentSource/' + this.props.companieId)
    }
  }

  render() {
    const testMode = this.props.context.testMode
    return (
      <div className="">
        <form onSubmit={this.submit.bind(this)}>
          <Grid container>
            <Grid item xs={12} sm={8}>
              <h3>{`Add your debit card`}</h3>
            </Grid>
            <Grid item xs={12} sm={4} className="tac">
              <img alt="Card" className="cardsImg" src="/cards.png" />
            </Grid>
            <Grid item xs={12} sm={12}>
              {testMode && (
                <>
                  <span>{`Ok: 4242424242424242`}</span> <span>{`Error: 4000000000000341`}</span>
                </>
              )}
              <CardNumberElement />
            </Grid>
            <Grid item xs={12} sm={6}>
              {testMode && <span>{`Test Data: 01/23`}</span>}
              <CardExpiryElement />
            </Grid>
            <Grid item xs={12} sm={6}>
              {testMode && <span>{`Test Data: 123`}</span>}
              <CardCVCElement />
            </Grid>
          </Grid>
          <div className={'secondary'}>{this.state.message}</div>
          <Grid container>
            <Grid item xs={12} sm={12} className="tac">
              <div style={{ height: '20px' }} />
              <ButtonLoadingAfterClick
                id={'idButton'}
                size={'medium'}
                disabled={false}
                icon={''}
                color={'primary'}
                variant={'outlined'}
                buttonText={`Add`}
                buttonLoadingText={`Setting up...`}
                onClick={this.submit.bind(this)}
                loading={this.state.loading}
              />
              {/* <Button color="primary" variant="outlined" onClick={this.submit.bind(this)}>
                {`Add`}
              </Button> */}{' '}
              {!this.props.hideCancelButton && <Button onClick={this.props.onCancel}>{`Cancel`}</Button>}
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(CREATE_CARD_MUTATION, {
    name: 'createCardMutation',
  }),
  withContext,
  withRouter,
  withApollo,
  injectStripe
)(AddCard)
