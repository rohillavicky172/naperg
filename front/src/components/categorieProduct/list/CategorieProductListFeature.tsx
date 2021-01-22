import React from 'react'
import ProductCardContainerWithBadge from '../../product/single/card/ProductCardContainerWithBadge'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router'
import CategorieProductCreate from '../single/CategorieProductCreate'
import { CATEGORIES_PRODUCTS_QUERY } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import CategorieProductEdit from '../single/CategorieProductEdit'
import UseWindowDimensions from '../../UseWindowDimensions'

type State = {
  showAddCategory: boolean
}

type Props = {
  visibility: any
  categorieProducts: any
  deleteCategorieProduct: any
  context: Context
  isMobile: boolean
}

class CategorieProductListFeature extends React.Component<Props, State> {
  state: State = {
    showAddCategory: false,
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
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
      <div id="products">
        <div>
          {this.props.categorieProducts.categorieProducts.map((categorie) => (
            <div key={categorie.id}>
              {this.state.showAddCategory && <CategorieProductEdit categorieSingleProducts={categorie} />}
              <br />
              <br />
              <div className="tac">
                <Grid container spacing={10}>
                  <>
                    {categorie.positionProducts &&
                      categorie.positionProducts.map((positionProduct, i) => {
                        if (!(isMobile && i >= 2)) {
                          return (
                            <Grid xs={12} sm={6} md={3} lg={3} xl={3} key={positionProduct.id + positionProduct.product.id} item>
                              <ProductCardContainerWithBadge
                                link={'/product/' + positionProduct.product.id}
                                product={positionProduct.product}
                              />
                            </Grid>
                          )
                        }
                        return true
                      })}
                  </>
                </Grid>
              </div>
            </div>
          ))}
        </div>
        {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
          <>
            <br />
            <Button
              onClick={() =>
                this.setState({ showAddCategory: !this.state.showAddCategory })
              }>{`Manage Categories (admin)`}</Button>
            {this.state.showAddCategory && <CategorieProductCreate />}
          </>
        )}
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
          visibility_in: props.visibility,
        },
        orderBy: 'orderByInt_ASC',
      },
    }),
  }),
  withRouter,
  withApollo,
  withContext
)(CategorieProductListFeature)
