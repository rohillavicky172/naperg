import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { Product } from '../../product/Product.type'
import { History } from '../../History.type'
import { Match } from '../../Match.type'
import { Query } from '../../Query.type'
import { ISSUED_CARD_QUERY } from '../GraphQL'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import UpdateStatusIssuedCardButton from '../action/UpdateStatusIssuedCardButton'
import IssuedCardFirstSection from './section/IssuedCardFirstSection'
import Divider from '@material-ui/core/Divider'
import WarningAction from '../../subscription/single/action/WarningAction'

type State = {}
type Props = {
  match: Match
  product: Product
  issuedCardQuery: Query
  history: History
}

class CancelIssuedCardPage extends React.Component<Props, State> {
  render() {
    if (this.props.issuedCardQuery.error) {
      return (
        <Error
          message={
            this.props.issuedCardQuery.error.graphQLErrors.length && this.props.issuedCardQuery.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.issuedCardQuery.loading) {
      return <Loading />
    }
    if (!this.props.issuedCardQuery) {
      return <NotFound />
    }

    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Cancel NachoCard`}</h3>

          <WarningAction
            iconText={'warning'}
            onCancel={() => {}}
            onClick={() => {}}
            actionText="Yes, unsubscribe"
            message="All future charges to this card will be declined and this card will not be usable any more"
            shwowActionButton={false}
            shwowCancelButton={false}
          />
          {this.props.issuedCardQuery.issuedCard.issuedCardStripe.status !== 'canceled' && (
            <div className="tac">
              <UpdateStatusIssuedCardButton status={`canceled`} issuedCard={this.props.issuedCardQuery.issuedCard} />{' '}
              <Button onClick={() => this.props.history.goBack()}>{`Don't cancel`}</Button>
            </div>
          )}

          <div className="margin3">
            <Divider />
          </div>

          <IssuedCardFirstSection issuedCard={this.props.issuedCardQuery.issuedCard} />
        </Paper>
      </div>
    )
  }
}

export default compose(
  graphql(ISSUED_CARD_QUERY, {
    name: 'issuedCardQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.match.params.issuedCardId,
        },
      },
    }),
  }),
  withRouter
)(CancelIssuedCardPage)
