import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Client } from '../../Client.type'
import { IssuedCard } from '../IssuedCard.type'
import { APPROVE_ISSUED_CARD } from '../GraphQL'

// import utils from '../../utils'

type State = {}

type Props = {
  context: Context
  client: Client
  statusRequested: string

  issuedCard: IssuedCard
  approveIssuedCard: any
}

class ApproveUpdateIssuedCard extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Button variant="outlined" color={'secondary'} onClick={() => this.approveIssuedCard()}>
          {this.props.statusRequested === 'DECLINED' && <>Decline Request</>}
          {this.props.statusRequested === 'APPROVED' && <>Approve Request</>}
          {this.props.statusRequested === 'PENDING' && <>PENDING</>}
        </Button>
      </>
    )
  }

  approveIssuedCard = async () => {
    let newIssuedCard
    try {
      newIssuedCard = await this.props.approveIssuedCard({
        variables: {
          data: {
            statusRequested: this.props.statusRequested
          },
          where: {
            id: this.props.issuedCard.id
          }
        }
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
    }
    if (newIssuedCard) {
      // this.props.onUpdated(newIssuedCard.data.approveIssuedCard)
      // this.props.client.resetStore()
    }
  }
}

export default compose(
  graphql(APPROVE_ISSUED_CARD, {
    name: 'approveIssuedCard'
  }),
  withContext,
  withRouter,
  withApollo
)(ApproveUpdateIssuedCard)
