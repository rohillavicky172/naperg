import React from 'react'
import ProductCardContainerWithBadge from '../../../product/single/card/ProductCardContainerWithBadge'
import Grid from '@material-ui/core/Grid'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { CATEGORIES_SINGLE_PRODUCTS_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import { withRouter } from 'react-router'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import RemoveProductFromCategory from '../RemoveProductFromCategory'
import EditPostitionProduct from '../../../positionProduct/EditPostitionProduct'
import UseWindowDimensions from '../../../UseWindowDimensions'

type State = {}

type Props = {
  urlName: string
  categorieSingleProducts: any
  context: Context
  isEditMode: boolean
}

class CategorieProductDetailsListProducts extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    if (this.props.categorieSingleProducts.error) {
      return (
        <Error
          message={
            this.props.categorieSingleProducts.error.graphQLErrors.length &&
            this.props.categorieSingleProducts.error.graphQLErrors[0].message
          }
        />
      )
    }
    if (this.props.categorieSingleProducts.loading) {
      return <Loading />
    }
    if (!this.props.categorieSingleProducts) {
      return <NotFound />
    }
    const { categorieSingleProducts } = this.props.categorieSingleProducts

    if (!categorieSingleProducts) {
      return null
    }
    return (
      <div>
        {/* {this.props.isEditMode && <CategorieProductAddPositionProduct categorieProduct={categorieSingleProducts} />} */}
        <div className="tac">
          <Grid container spacing={isMobile ? 2 : 10}>
            {categorieSingleProducts.positionProducts &&
              categorieSingleProducts.positionProducts.map((positionProduct) => (
                <Grid xs={6} sm={6} md={3} lg={3} xl={3} key={positionProduct.id} item>
                  <ProductCardContainerWithBadge
                    product={positionProduct.product}
                    link={'/product/' + positionProduct.product.id}
                  />

                  {/* <div style={{ height: '35px' }} /> */}
                  {this.props.isEditMode && (
                    <>
                      <RemoveProductFromCategory
                        categorieProduct={categorieSingleProducts}
                        positionProductId={positionProduct.id}
                      />
                      <EditPostitionProduct positionProduct={positionProduct} />
                    </>
                  )}
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(CATEGORIES_SINGLE_PRODUCTS_QUERY, {
    name: 'categorieSingleProducts',

    options: (props: Props) => ({
      variables: {
        urlName: props.urlName,
      },
    }),
  }),
  withContext,
  withRouter,
  withApollo
)(CategorieProductDetailsListProducts)
