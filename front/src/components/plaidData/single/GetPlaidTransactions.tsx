import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import ButtonSecondValidation from '../../nav/ButtonSecondValidation'
// import { Product } from '../../Product.type'
import { GET_PLAID_TRANSACTIONS_MUTATION } from '../GraphQL'
// import { CATEGORIES_PRODUCTS_QUERY } from '../../../categorieProduct/GraphQL'

import { withContext } from '../../withContext'
import { Context } from '../../Context.type'

import { Client } from '../../Client.type'

import { PlaidData } from '../PlaidData.type'

type State = {}
type Props = {
  context: Context
  deleteProduct: any
  getPlaidTransactions: any
  plaidData: PlaidData
  client: Client
  // product: Product,
  history: any
}

class GetPlaidTransactions extends React.Component<Props, State> {
  render() {
    return (
      <ButtonSecondValidation
        color={'primary'}
        size={'medium'}
        variant={'outlined'}
        buttonText={`getPlaidTransactions`}
        onClick={() => {
          this.getPlaidTransactions(this.props.plaidData.id)
        }}
      />
    )
  }

  getPlaidTransactions = async (id) => {
    let plaidData
    try {
      plaidData = await this.props.getPlaidTransactions({
        variables: {
          plaidDataId: id,
        },
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (plaidData) {
      this.props.client.resetStore()
    }
  }
}

export default compose(
  graphql(GET_PLAID_TRANSACTIONS_MUTATION, {
    name: 'getPlaidTransactions',
  }),
  withRouter,
  withApollo,
  withContext
)(GetPlaidTransactions)
