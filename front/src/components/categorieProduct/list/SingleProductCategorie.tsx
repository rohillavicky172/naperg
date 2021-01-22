import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import { CategorieProduct } from '../CategorieProduct.type'
import Button from '@material-ui/core/Button'
// import ProductCardContainer from '../../product/single/card/ProductCardContainer'
// import Pagination from '../../nav/Pagination'
// import { graphql, withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import Error from '../../nav/error/Error'
// import NotFound from '../../nav/error/NotFound'
// import Loading from '../../nav/error/Loading'
// import { withRouter } from 'react-router'
// import CategorieProductCreate from '../single/CategorieProductCreate'
// import { CATEGORIES_PRODUCTS_QUERY } from '../GraphQL'
// import { withContext } from '../../withContext'
// import CategorieProductEdit from '../single/CategorieProductEdit'
// import DeleteCategorieProduct from '../single/DeleteCategorieProduct'

type Props = {
  // visibility: string
  // orderBy: string
  categorieProduct: CategorieProduct
  // deleteCategorieProduct: any
  // context: Context
  // isMobile: boolean
}

const SingleProductCategorie = (props: Props) => {
  const [showContent, setShowContent] = useState(false)
  return (
    <div className="">
      <div className="paperOut" key={props.categorieProduct.id}>
        <Paper className="paperIn">
          <Link to={'/category/' + props.categorieProduct.urlName}>
            <h3 className="link">
              {props.categorieProduct.orderByInt} - {props.categorieProduct.name} ({props.categorieProduct.visibility})
            </h3>
          </Link>
          <Button onClick={() => setShowContent(!showContent)}>Details</Button>
          {showContent && (
            <div className="">
              <Grid container>
                <>
                  {props.categorieProduct.positionProducts.map(positionProduct => (
                    <Grid xs={12} key={positionProduct.id} item>
                      - {positionProduct.product.name}
                    </Grid>
                  ))}
                </>
              </Grid>
            </div>
          )}
        </Paper>
      </div>
    </div>
  )
}

export default SingleProductCategorie
