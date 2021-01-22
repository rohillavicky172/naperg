
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { DataProduct } from '../DataProduct.type'
import { DataProductValidation } from '../DataProductValidation.type'
import DataProductForm from './DataProductForm'
import { UPDATE_DATAPRODUCT_MUTATION } from '../GraphQL'

type State = {
  dataProduct: DataProduct,
  validation: DataProductValidation
}
type Props = {
  dataProduct: DataProduct,
  onCancel: () => void,
  onUpdate: () => void,
  updateDataProduct: any,
  typeField: string
}

class UpdateDataProduct extends React.Component<Props, State> {
  state = {
    dataProduct: this.props.dataProduct,
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
          onClick={this.updateDataProduct}>
          {`Save`}
        </Button>{' '}
        <Button onClick={this.props.onCancel}>{`Cancel`}</Button>
      </>
    )
  }

  updateDataProduct = async () => {
    await this.props.updateDataProduct({
      variables: {
        data: {
          website: this.state.dataProduct.website,
          productName: this.state.dataProduct.productName,
          note: this.state.dataProduct.note,
          category: this.state.dataProduct.category
        },
        where: {
          id: this.state.dataProduct.id
        }
      }
    })
    this.props.onUpdate()
  }
}

export default compose(
  graphql(UPDATE_DATAPRODUCT_MUTATION, {
    name: 'updateDataProduct'
  }),
  withRouter
)(UpdateDataProduct)
