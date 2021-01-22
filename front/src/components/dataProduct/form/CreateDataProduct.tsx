import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { DataProduct, dataProductClass } from '../DataProduct.type'
import DataProductForm from './DataProductForm'
import { CREATE_DATAPRODUCT_MUTATION } from '../GraphQL'
import { DataProductValidation } from '../DataProductValidation.type'

type State = {
  dataProduct: DataProduct
  validation: DataProductValidation
}
type Props = {
  dataProduct: DataProduct
  createDataProduct: any
  userId: string
  companieId: string
  productId: string
  subscriptionId: string
  onCreate: () => void
  onCancel: () => void
}

class CreateDataProduct extends React.Component<Props, State> {
  state = {
    dataProduct: dataProductClass,
    validation: {
      websiteValidate: true,
      productNameValidate: true,
      noteValidate: true,
      formValidate: false
    }
  }
  onChange = dataProduct => {
    this.setState({ dataProduct })
  }

  onChangeValidation = validation => {
    this.setState({ validation })
  }

  render() {
    return (
      <>
        <DataProductForm
          dataProduct={this.state.dataProduct}
          validation={this.state.validation}
          onChange={this.onChange}
          onChangeValidation={this.onChangeValidation}
        />
        <div style={{ height: '10px' }} />
        <Button
          disabled={!this.state.validation.formValidate}
          color={'primary'}
          variant="outlined"
          onClick={this.createDataProduct}>
          {`Save`}
        </Button>{' '}
        <Button onClick={() => this.props.onCancel()}>{`Cancel`}</Button>
      </>
    )
  }

  createDataProduct = async () => {
    await this.props.createDataProduct({
      variables: {
        data: {
          // productName: this.state.dataProduct.productName,
          note: this.state.dataProduct.note,
          // website: this.state.dataProduct.website,
          // category: this.state.dataProduct.category,
          user: { connect: { id: this.props.userId } },
          companie: { connect: { id: this.props.companieId } },
          // product: { connect: { id: this.props.productId } }

          subscription: { connect: { id: this.props.subscriptionId } }
        }
      }
    })
    this.props.onCreate()
  }
}

export default compose(
  graphql(CREATE_DATAPRODUCT_MUTATION, {
    name: 'createDataProduct'
  }),
  withRouter
)(CreateDataProduct)
