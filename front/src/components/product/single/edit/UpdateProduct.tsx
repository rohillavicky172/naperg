import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ProductPageForm from './ProductPageForm'
import { Product } from '../../Product.type'
import { UPDATE_PRODUCT_MUTATION } from '../../GraphQL'
// import { graphql, withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { withRouter } from 'react-router-dom'
// import { Location } from '../../../Location.type'
// import { CategorieProduct } from '../../../categorieProduct/CategorieProduct.type'
// import { withContext } from '../../../withContext'
// import { Context } from '../../../Context.type'
// import { History } from '../../../History.type'

type Props = {
  product: Product
}

const UpdateProduct = (props: Props) => {
  const history = useHistory()
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION)
  const [product, setProduct] = React.useState(props.product)
  const [message, setMessage] = React.useState('')
  const [isFormValide, setIsFormValide] = React.useState(false)

  const onCancel = () => {
    history.push(`/product/${product.id}`)
  }

  const updateProductF = async () => {
    try {
      await updateProduct({
        variables: {
          where: {
            id: product.id,
          },
          data: {
            name: product.name,
            nameFile: product.nameFile,
            // sellerApiName: product.sellerApiName,
            nameFileBanner: product.nameFileBanner,
            productDescription: product.productDescription,
            visibility: product.visibility,
            privateData: product.privateData,
            sellerLink: product.sellerLink,
            shortDescription: product.shortDescription,
            // communicationWithSellerType: product.communicationWithSellerType,
            typeProduct: product.typeProduct,
            productFrequency: product.productFrequency,
            creationType: product.creationType,
            policyLink: product.policyLink,
            urlName: product.urlName,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }

    history.push(`/product/${product.id}`)
  }

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h2>{product.name}</h2>
          <div>
            <ProductPageForm
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

export default UpdateProduct
