import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_STATUS_ISSUED_CARD } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { History } from '../../History.type'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import { IssuedCard } from '../IssuedCard.type'
// import { User } from '../../user/User.type'

type State = {}

type Props = {
  context: Context
  status: string
  updateStatusIssuedCard: any
  issuedCard: IssuedCard
  history: History
  testMode: boolean
}

class UpdateStatusIssuedCardButton extends React.Component<Props, State> {
  render() {
    // console.log(this.props.issuedCard)
    return (
      <Button variant="outlined" color="secondary" onClick={this.cancelIssuedCard}>
        {'Yes, cancel'}
      </Button>
    )
  }
  cancelIssuedCard = async () => {
    let issuedCard
    try {
      issuedCard = await this.props.updateStatusIssuedCard({
        variables: {
          issuedCardId: this.props.issuedCard.id,
          status: this.props.status
        }
      })
    } catch (e) {
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
    }
    if (issuedCard) {
      // this.props.client.resetStore()
      this.props.history.push('/issuedCard/' + this.props.issuedCard.id)
    }
  }
}

export default compose(
  graphql(UPDATE_STATUS_ISSUED_CARD, {
    name: 'updateStatusIssuedCard'
  }),
  withRouter,
  withContext,
  withApollo
)(UpdateStatusIssuedCardButton)
