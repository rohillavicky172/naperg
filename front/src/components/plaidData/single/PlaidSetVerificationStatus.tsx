
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { PLAID_SET_VERIFICATION_STATUS } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
// import { Card } from '../../Card.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { Client } from '../../Client.type'

type State = {
  loading: boolean
}

type Props = {
  context: Context
  client: Client

  plaidSetVerificationStatus: any
  openSnackBar: (message: string) => void
  plaidDataId: string
  // card: Card
}

class PlaidSetVerificationStatus extends React.Component<Props, State> {
  state = {
    loading: false
  }
  plaidSetVerificationStatus = async () => {
    this.setState({ loading: true })
    let card
    try {
      card = await this.props.plaidSetVerificationStatus({
        variables: {
          plaidDataId: this.props.plaidDataId
        }
      })
    } catch (e) {
      console.log(e)
      this.setState({ loading: false })
      // this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    this.setState({ loading: false })
    if (card) {
      // this.props.context.openSnackBar(true, `Payment Source successfully deleted`, 'message')
      this.props.client.resetStore()
    }
  }

  render() {
    return (
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        disabled={false}
        color={'secondary'}
        variant={'outlined'}
        size={'medium'}
        buttonText={`Update verification Status`}
        buttonLoadingText={`Loading...`}
        onClick={() => {
          this.plaidSetVerificationStatus()
        }}
        loading={this.state.loading}
      />
    )
  }
}

export default compose(
  graphql(PLAID_SET_VERIFICATION_STATUS, {
    name: 'plaidSetVerificationStatus'
    // options: (props: Props) => ({
    //   refetchQueries: [
    //     {
    //       query: USER_STRIPE_QUERY,
    //       variables: { userId: props.userId }
    //     }
    //   ]
    // })
  }),
  withContext,
  withApollo
)(PlaidSetVerificationStatus)
