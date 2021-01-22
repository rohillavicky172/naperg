
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { BALANCE_SUM } from '../GraphQL'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { User } from '../../user/User.type'
import { withContext } from '../../withContext'
import utils from '../../utils'
// import Paper from '@material-ui/core/Paper'
// import DateComponent from '../../nav/DateComponent'

type State = {}

type Props = {
  variables: any
  balanceSum: any
  me: User
}

class BalanceSum extends React.Component<Props, State> {
  render() {
    if (this.props.balanceSum.error) {
      return (
        <Error
          message={this.props.balanceSum.error.graphQLErrors.length && this.props.balanceSum.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.balanceSum.loading) {
      return <Loading />
    }
    if (!this.props.balanceSum) {
      return <NotFound />
    }

    return <>{utils.priceFormated(-this.props.balanceSum.balanceSum, 'usd')}</>
  }
}

export default compose(
  graphql(BALANCE_SUM, {
    name: 'balanceSum',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withContext
)(BalanceSum)
