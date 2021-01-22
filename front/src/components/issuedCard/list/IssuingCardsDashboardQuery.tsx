import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Companie } from '../../companie/Companie.type'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { ISSUED_CARDS_QUERY } from '../GraphQL'
import SingleIssuedCardDashboard from '../single/SingleIssuedCardDashboard'
import Divider from '@material-ui/core/Divider'
import { Link } from 'react-router-dom'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

type State = {}

type Props = {
  variables: any
  context: Context
  issuedCards: any
  title: string
  companie: Companie
}

class IssuingCardsDashboardQuery extends React.Component<Props, State> {
  render() {
    if (this.props.issuedCards.error) {
      return (
        <Error
          message={this.props.issuedCards.error.graphQLErrors.length && this.props.issuedCards.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.issuedCards.loading) {
      return <Loading />
    }
    if (!this.props.issuedCards) {
      return <NotFound />
    }

    const listIssuedCards = this.props.issuedCards.issuedCardsConnection.edges

    return (
      <>
        <CardContent className="cardContentClass">
          <h3>{this.props.title}</h3>
          {listIssuedCards.map(nodeIssuedCard => (
            <div key={nodeIssuedCard.node.id} className="paperOut">
              <SingleIssuedCardDashboard companie={this.props.companie} issuedCard={nodeIssuedCard.node} />
              <div style={{ height: '4px' }} />
              <Divider />
            </div>
          ))}
        </CardContent>
        <CardActions>
          {this.props.issuedCards.issuedCardsConnection.aggregate.count > 3 && (
            <Link className="link" to={'/issuedCardsCompany/' + this.props.companie.id}>
              {`See all NachoCards for ${this.props.companie.name}`}
            </Link>
          )}
        </CardActions>
      </>
    )
  }
}

export default compose(
  graphql(ISSUED_CARDS_QUERY, {
    name: 'issuedCards',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withApollo,
  withContext
)(IssuingCardsDashboardQuery)
