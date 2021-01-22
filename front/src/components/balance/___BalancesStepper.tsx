import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { Balance } from './Balance.type'
import { BALANCES_QUERY } from './GraphQL'

type State = {}
type Props = {
  companieId: string
  // product: Product,
  // companie: Companie
  balances: Balance[]
  balancesQuery: any
  onBalances: (balances: Balance[]) => void
}

class BalancesStepper extends React.Component<Props, State> {
  componentDidUpdate = (prevProps: Props) => {
    if (this.props.balances !== prevProps.balances) {
      if (this.props.balancesQuery.balances) {
        this.props.onBalances(this.props.balancesQuery.balances)
      }
    }
  }
  componentDidMount = () => {
    if (this.props.balancesQuery.balances) {
      this.props.onBalances(this.props.balancesQuery.balances)
    }
  }

  render() {
    return null
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
          }
        }
      }
    })
  })
  // withRouter,
  // withContext
)(BalancesStepper)
