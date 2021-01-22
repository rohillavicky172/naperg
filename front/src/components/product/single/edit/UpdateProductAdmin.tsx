import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ProductPageFormAdmin from './ProductPageFormAdmin'
import { Product } from '../../Product.type'
import gql from 'graphql-tag'

export const MUTATION = gql`
  mutation UpdateProductMutation($data: ProductUpdateInput!, $where: ProductWhereUniqueInput!) {
    updateProduct(data: $data, where: $where) {
      id
      subscribed
      name
      subName
      textButton
      urlName
      discount
      levelBtoB
      showShowcase
      showMarketplace
      altNameFile
      altNameFileBanner
      previewOgImage
      visibility
      policyLink
      privateData
      sellerLink
      typeProduct
      productFrequency
      creationType
      nameFile
      nameFileBanner
      productDescription
      shortDescription
    }
  }
`

type Props = {
  product: Product
}

const UpdateProductAdmin = (props: Props) => {
  const history = useHistory()
  const [updateProduct] = useMutation(MUTATION)
  const [product, setProduct] = React.useState(props.product)
  const [message, setMessage] = React.useState('')
  const [isFormValide, setIsFormValide] = React.useState(false)

  const onCancel = () => {
    history.push(`/product/${product.id}`)
  }

  const updateProductF = async () => {
    let productUpdated
    try {
      productUpdated = await updateProduct({
        variables: {
          where: {
            id: product.id,
          },
          data: {
            name: product.name,
            nameFile: product.nameFile,
            subName: product.subName,
            nameFileBanner: product.nameFileBanner,
            productDescription: product.productDescription,
            visibility: product.visibility,
            levelBtoB: product.levelBtoB,
            privateData: product.privateData,
            sellerLink: product.sellerLink,
            textButton: product.textButton,
            shortDescription: product.shortDescription,
            // communicationWithSellerType: product.communicationWithSellerType,
            typeProduct: product.typeProduct,
            productFrequency: product.productFrequency,
            creationType: product.creationType,
            showShowcase: product.showShowcase,
            showMarketplace: product.showMarketplace,
            previewOgImage: product.previewOgImage,
            altNameFile: product.altNameFile,
            altNameFileBanner: product.altNameFileBanner,

            policyLink: product.policyLink,
            urlName: product.urlName,
          },
        },
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }

    if (productUpdated) {
      history.push(`/product/${product.id}`)
    }
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>{props.product.name}</h2>
          <div>
            <ProductPageFormAdmin
              onFormValide={(isFormValide: boolean) => setIsFormValide(isFormValide)}
              updateProductData={(product: Product) => setProduct(product)}
              product={product}
            />
          </div>
          <div style={{ height: '20px' }} />
          <Button
            id={'updateProductButton'}
            disabled={!isFormValide}
            color="secondary"
            variant="outlined"
            onClick={() => updateProductF()}>
            {`Save`}
          </Button>{' '}
          <Button onClick={onCancel}>{`Cancel`}</Button>
        </Paper>
        <div className="secondary">{message}</div>
      </div>
    </>
  )
}

export default UpdateProductAdmin

// import React from 'react'
// import { graphql, withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { withRouter } from 'react-router-dom'
// import { Location } from '../../../Location.type'
// import Button from '@material-ui/core/Button'
// import Paper from '@material-ui/core/Paper'
// import ProductPageFormAdmin from './ProductPageFormAdmin'
// import { Product } from '../../Product.type'
// import { CategorieProduct } from '../../../categorieProduct/CategorieProduct.type'
// import { UPDATE_PRODUCT_MUTATION } from '../../GraphQL'
// import { withContext } from '../../../withContext'
// import { Context } from '../../../Context.type'
// import { History } from '../../../History.type'
// // const queryString = require('query-string')

// type State = {
//   product: Product
//   isFormValide: boolean
// }
// type Props = {
//   location: Location
//   product: Product
//   categorieProduct: CategorieProduct
//   updateProduct: any
//   context: Context
//   history: History
// }

// class UpdateProductAdmin extends React.Component<Props, State> {
//   state = {
//     product: this.props.product,
//     isFormValide: false,
//   }

//   render() {
//     return (
//       <>
//         <div className="paperOut">
//           <Paper className="paperIn">
//             <h2>{this.props.product.name}</h2>
//             <div>
//               <ProductPageFormAdmin
//                 onFormValide={(isFormValide: boolean) => this.setState({ isFormValide })}
//                 updateProductData={(product: Product) => this.setState({ product })}
//                 product={this.state.product}
//               />
//             </div>
//             <div style={{ height: '20px' }} />
//             <Button
//               id={'updateProductButton'}
//               disabled={!this.state.isFormValide}
//               color="secondary"
//               variant="outlined"
//               onClick={() => this.updateProduct()}>
//               {`Save`}
//             </Button>{' '}
//             <Button onClick={this.onCancel}>{`Cancel`}</Button>
//           </Paper>
//         </div>
//       </>
//     )
//   }

//   onCancel = () => {
//     this.props.history.push(`/admin/product/${this.state.product.id}`)
//   }
//   updateProduct = async () => {
//     try {
//       await this.props.updateProduct({
//         variables: {
//           where: {
//             id: this.state.product.id,
//           },
//           data: {
//             name: this.state.product.name,
//             subName: this.state.product.subName,
//             nameFile: this.state.product.nameFile,

//             nameFileBanner: this.state.product.nameFileBanner,
//             productDescription: this.state.product.productDescription,
//             visibility: this.state.product.visibility,
//             privateData: this.state.product.privateData,
//             sellerLink: this.state.product.sellerLink,
//             shortDescription: this.state.product.shortDescription,
//             communicationWithSellerType: this.state.product.communicationWithSellerType,
//             typeProduct: this.state.product.typeProduct,
//             productFrequency: this.state.product.productFrequency,
//             creationType: this.state.product.creationType,

//             policyLink: this.state.product.policyLink,
//             urlName: this.state.product.urlName,
//           },
//         },
//       })
//     } catch (e) {
//       e.graphQLErrors.some((graphQLError) => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
//       throw e
//     }

//     this.props.history.push(`/admin/product/${this.state.product.id}`)
//   }
// }

// export default compose(
//   graphql(UPDATE_PRODUCT_MUTATION, {
//     name: 'updateProduct',
//   }),
//   withContext,
//   withRouter,
//   withApollo
// )(UpdateProductAdmin)
