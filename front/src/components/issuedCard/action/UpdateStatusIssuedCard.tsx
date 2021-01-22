import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_STATUS_ISSUED_CARD } from '../GraphQL'
import { withContext } from '../../withContext'

import { Context } from '../../Context.type'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import { IssuedCard } from '../IssuedCard.type'

type State = {}

type Props = {
  updateStatusIssuedCard: any
  context: Context
  type: string
  text: string
  status: string
  issuedCard: IssuedCard
  onClick: () => void
}

class UpdateStatusIssuedCard extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.type === 'MenuItem' && <MenuItem onClick={this.updateIssuedCard}>{this.props.text}</MenuItem>}
        {this.props.type === 'Button' && (
          <Button variant="outlined" color="secondary" onClick={this.updateIssuedCard}>
            {this.props.text}
          </Button>
        )}
      </>
    )
  }
  updateIssuedCard = async () => {
    this.props.onClick()
    try {
      await this.props.updateStatusIssuedCard({
        variables: {
          issuedCardId: this.props.issuedCard.id,
          status: this.props.status
        }
      })
    } catch (e) {
      // console.log(e)
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
    }
    // if (issuedCard) {
    //   // this.props.client.resetStore()
    //   // this.props.onUpdatedIssuedCard()
    //   // this.props.history.push('/issuedCard/' + this.props.issuedCard.id)
    // }
  }
}

export default compose(
  graphql(UPDATE_STATUS_ISSUED_CARD, {
    name: 'updateStatusIssuedCard'
  }),
  withRouter,
  withContext,
  withApollo
)(UpdateStatusIssuedCard)
