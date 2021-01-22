import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { CATEGORIES_SINGLE_PRODUCTS_QUERY } from '../../GraphQL'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import { withRouter } from 'react-router'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import CategorieProductEdit from '../CategorieProductEdit'
import CategorieProductAddPositionProduct from '../CategorieProductAddPositionProduct'
import CategorieProductDetailsListProducts from './CategorieProductDetailsListProducts'
import CategorieProductDelete from '../CategorieProductDelete'
// import '../Style.css'
// import Card from '@material-ui/core/Card'
// import InvoicesGraph from '../../../invoice/list/InvoicesGraph'
// import HeroCategorieProduct from '../hero/HeroCategorieProduct'
// import Breadcrumb from '../breadcrumb/Breadcrumb'
// import HeadTags from '../../../nav/HeadTags'

type State = {
  isEditMode: boolean
}

type Props = {
  urlName: string
  categorieSingleProducts: any
  context: Context
}

class CategorieProductDetails extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
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
    if (!this.props.categorieSingleProducts.categorieSingleProducts) {
      return <NotFound />
    }
    const { categorieSingleProducts } = this.props.categorieSingleProducts
    return (
      <>
        <div className="content" id="products">
          {/* <Breadcrumb categorieSingleProducts={categorieSingleProducts} />
          <br /> */}
          <h3>{categorieSingleProducts.name}</h3>

          <div style={{ height: '40px' }} />
          <CategorieProductDetailsListProducts isEditMode={this.state.isEditMode} urlName={this.props.urlName} />
        </div>

        <div>
          {this.props.context.me && this.props.context.me.role === 'ADMIN' && (
            <p className="cursor" onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}>
              {`Edit this category`}
            </p>
          )}
        </div>
        {this.state.isEditMode && (
          <>
            <CategorieProductEdit categorieSingleProducts={categorieSingleProducts} />
            <CategorieProductAddPositionProduct categorieProduct={categorieSingleProducts} />
            <CategorieProductDelete categorieProduct={categorieSingleProducts} />
          </>
        )}
      </>
    )
  }
}

export default compose(
  graphql(CATEGORIES_SINGLE_PRODUCTS_QUERY, {
    name: 'categorieSingleProducts',
    options: (props: Props) => ({
      variables: {
        urlName: props.urlName
      }
    })
  }),
  withContext,
  withRouter,
  withApollo
)(CategorieProductDetails)
