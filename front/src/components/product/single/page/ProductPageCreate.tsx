import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { CREATE_PRODUCT_MUTATION } from '../../GraphQL'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import ProductPageFormAdmin from '../edit/ProductPageFormAdmin'
import { Product, productClass } from '../../Product.type'

const ProductPageCreate = () => {
  const history = useHistory()
  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION)
  const [product, setProduct] = React.useState(productClass)
  const [isFormValide, setIsFormValide] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const createProductF = async () => {
    let dataProduct

    try {
      dataProduct = await createProduct({
        variables: {
          data: {
            name: product.name,
            urlName: product.urlName,
            subName: product.subName,
            textButton: product.textButton,
            levelBtoB: product.levelBtoB,
            showMarketplace: product.showMarketplace,
            showShowcase: product.showShowcase,
            // trialPeriod: trialPeriod * 1,
            // listPrice: listPrice * 1,
            nameFile: product.nameFile,
            visibility: product.visibility,
            sellerLink: product.sellerLink,
            privateData: product.privateData,
            typeProduct: product.typeProduct,
            productFrequency: product.productFrequency,
            creationType: product.creationType,

            altNameFile: product.altNameFile,
            altNameFileBanner: product.altNameFileBanner,

            // paymentFrequency,
            productDescription: product.productDescription,
            shortDescription: product.shortDescription,
            communicationWithSellerType: product.communicationWithSellerType,
            // loginLink: product.loginLink,
            // signupLink,
            // cancellationTerms,
            nameFileBanner: product.nameFileBanner,
          },
        },
      })
    } catch (e) {
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
      // throw e
    }
    if (dataProduct) {
      // console.log(dataProduct)
      const product = dataProduct.data.createProduct
      history.push(`product/${product.id}`)
      // this.props.client.resetStore()
    }
  }

  // render() {
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h1 className="">{`Create Product (admin)`}</h1>
          <ProductPageFormAdmin
            onFormValide={(isFormValide: boolean) => setIsFormValide(isFormValide)}
            updateProductData={(product: Product) => setProduct(product)}
            product={product}
          />
          <Button
            id={'createProductButton'}
            color="primary"
            disabled={!isFormValide}
            variant="outlined"
            onClick={() => createProductF()}>
            Create
          </Button>
        </Paper>
      </div>
      <div className="secondary">{message}</div>
    </>
  )
}

export default ProductPageCreate
