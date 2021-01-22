import React from 'react'
// import { graphql } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
// import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
// import { DataProduct, dataProductClass } from '../DataProduct.type'
// import DataProductForm from './DataProductForm'
// import { CREATE_DATAPRODUCT_MUTATION } from '../GraphQL'
// import { DataProductValidation } from '../DataProductValidation.type'
import CreateDataProduct from './CreateDataProduct'

// type State = {
//   dataProduct: DataProduct
//   validation: DataProductValidation
// }
type Props = {
  // dataProduct: DataProduct
  // createDataProduct: any
  userId: string
  companieId: string
  productId: string
  subscriptionId: string
  onCreate: () => void
}

const CreateDataProductManagement = (props: Props) => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      {show ? (
        <>
          <CreateDataProduct
            onCreate={props.onCreate}
            userId={props.userId}
            companieId={props.companieId}
            subscriptionId={props.subscriptionId}
            productId={props.productId}
            onCancel={() => setShow(false)}
          />
        </>
      ) : (
        <div className="tar">
          <Button color="primary" variant="outlined" onClick={() => setShow(true)}>
            Edit
          </Button>
        </div>
      )}
    </>
  )
}

export default CreateDataProductManagement
