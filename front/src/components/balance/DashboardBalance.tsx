
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import { Product } from '../product/Product.type'
import { BALANCES_QUERY } from './GraphQL'
import utils from '../utils'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
// import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'
// import Icon from '@material-ui/core/Icon'
// import SingleBalance from './SingleBalance'
// import AutoTopUp from './AutoTopUp'
// import CashOut from './CashOut'
// import utils from '../utils'
// import Logs from '../log/list/Logs'

type State = {}
type Props = {
  companieId: string
  testMode: boolean
  context: Context
  product: Product
  balancesQuery: any
  // companie: Companie
}

class CompanieBalance extends React.Component<Props, State> {
  state = {
    mode: ''
  }

  // toggleEditMode = () => this.setState({ editMode: !this.state.editMode })

  render() {
    if (this.props.balancesQuery.error) {
      return (
        <Error
          message={this.props.balancesQuery.error.graphQLErrors.length && this.props.balancesQuery.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.balancesQuery.loading) {
      return <Loading />
    }
    if (!this.props.balancesQuery) {
      return <NotFound />
    }

    return (
      <>
        <h3>{`Balance`}</h3>
        {!this.props.balancesQuery.balancesConnection.edges.length && <>{utils.priceFormated(0, 'usd')}</>}
        {this.props.balancesQuery.balancesConnection.edges.map(balanceNode => (
          <div key={balanceNode.node.id} className="">
            <>
              <Grid container>
                <Grid item xs={4} className="">
                  Available balance:
                </Grid>
                <Grid item xs={8} className="">
                  {utils.priceFormated(balanceNode.node.valueBalance, 'usd')}
                </Grid>
              </Grid>
              {balanceNode.node.pendingBalance > 0 && (
                <Grid container>
                  <Grid item xs={4} className="">
                    Topup pending:
                  </Grid>
                  <Grid item xs={8} className="">
                    {utils.priceFormated(balanceNode.node.pendingBalance, 'usd')}
                  </Grid>
                </Grid>
              )}
            </>
          </div>
        ))}
      </>
    )
  }
}

export default compose(
  graphql(BALANCES_QUERY, {
    name: 'balancesQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          companie: {
            id: props.companieId
          },
          testMode: props.testMode
        }
      }
    })
  }),
  withRouter,
  withContext
)(CompanieBalance)
