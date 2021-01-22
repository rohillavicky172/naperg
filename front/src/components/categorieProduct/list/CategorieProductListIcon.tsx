
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router'
import { CATEGORIES_PRODUCTS_QUERY } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import CategorieProductIcon from '../single/icon/CategorieProductIcon'

type State = {
  isEditMode: boolean
}

type Props = {
  visibility: string
  categorieProducts: any

  deleteCategorieProduct: any
  context: Context
}

class CategorieProductListIcon extends React.Component<Props, State> {
  state: State = {
    isEditMode: false
  }

  render() {
    if (this.props.categorieProducts.error) {
      return (
        <Error
          message={
            this.props.categorieProducts.error.graphQLErrors.length && this.props.categorieProducts.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.categorieProducts.loading) {
      return <Loading />
    }
    if (!this.props.categorieProducts) {
      return <NotFound />
    }

    return (
      <div className="content">
        <div className="tac">
          <Grid container spacing={4}>
            {this.props.categorieProducts.categorieProducts.map(categorie => (
              <Grid key={categorie.id} item xs={6} sm={6} md={3} lg={3} xl={3}>
                <CategorieProductIcon
                  visibility={this.props.visibility}
                  isEditMode={this.state.isEditMode}
                  categorie={categorie}
                />
              </Grid>
            ))}
          </Grid>
          {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
            <Button onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}>{`Edit (Admin)`}</Button>
          )}
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(CATEGORIES_PRODUCTS_QUERY, {
    name: 'categorieProducts',

    options: (props: Props) => ({
      variables: {
        where: {
          visibility_in: props.visibility
        },
        orderBy: 'orderByInt_ASC'
      }
    })
  }),
  withRouter,
  withApollo,
  withContext
)(CategorieProductListIcon)
