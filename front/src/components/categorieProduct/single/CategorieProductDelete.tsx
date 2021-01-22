import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { DELETE_MUTATION_CATEGORIE_PRODUCT } from '../GraphQL'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { CategorieProduct } from '../CategorieProduct.type'

type State = {}

type Props = {
  categorieProduct: CategorieProduct
  deleteCategorieProduct: any
  openSnackBar: (message: string) => void
  context: Context
  client: any
  history: any
}

class CategorieProductDelete extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>Dangerous</h3>
            <Button onClick={this.deleteCategorieProduct}>{`Delete Category`}</Button>
          </Paper>
        </div>
      </>
    )
  }

  deleteCategorieProduct = async () => {
    try {
      await this.props.deleteCategorieProduct({
        variables: {
          where: {
            id: this.props.categorieProduct.id
          }
        }
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    this.props.client.resetStore()
    this.props.history.push('/')
  }
}

export default compose(
  graphql(DELETE_MUTATION_CATEGORIE_PRODUCT, {
    name: 'deleteCategorieProduct'
  }),
  withContext,
  withApollo,
  withRouter
)(CategorieProductDelete)
