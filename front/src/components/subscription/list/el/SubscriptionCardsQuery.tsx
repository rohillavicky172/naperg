import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { SUBSCRIPTIONS_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import Loading from '../../../nav/error/Loading'
import SubscriptionCard from '../../single/listSingle/SubscriptionCard'
import Pagination from '../../../nav/Pagination'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import UseWindowDimensions from '../../../UseWindowDimensions'

type State = {}

type Props = {
  subscriptionsQueryConnection: any
  hideIfNoData: boolean
  title: string
  context: Context
  page: number
  variables: any
}

class SubscriptionCardsQuery extends React.Component<Props, State> {
  render() {
    if (this.props.subscriptionsQueryConnection.error) {
      console.log(this.props.subscriptionsQueryConnection.error)
      return (
        <Error
          message={
            this.props.subscriptionsQueryConnection.error.graphQLErrors.length &&
            this.props.subscriptionsQueryConnection.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.subscriptionsQueryConnection.loading) {
      return <Loading />
    }
    const { edges } = this.props.subscriptionsQueryConnection.subscriptionsConnection

    if (!edges.length) {
      return (
        <div className="paperOut">
          <Paper className="paperIn">
            <div className="responsiveMargin2 tac textSize11">{`You will see all your subscriptions here.`}</div>
          </Paper>
        </div>
      )
    }
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <div className="paperIn">
          <div className="paperIn">
            <div className="paperOut">
              <div className="tac">
                <Grid container spacing={isMobile ? 2 : 10}>
                  {edges &&
                    edges.map((subscriptionNode) => (
                      <Grid xs={6} sm={6} md={3} lg={3} xl={3} key={subscriptionNode.node.id} item>
                        <SubscriptionCard subscription={subscriptionNode.node} />
                      </Grid>
                    ))}
                </Grid>
              </div>
            </div>
            <Pagination
              page={this.props.page}
              first={this.props.variables.first}
              count={this.props.subscriptionsQueryConnection.subscriptionsConnection.aggregate.count}
            />
          </div>
        </div>
      </>
    )
  }
}

export default compose(
  graphql(SUBSCRIPTIONS_QUERY, {
    name: 'subscriptionsQueryConnection',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withContext
)(SubscriptionCardsQuery)
