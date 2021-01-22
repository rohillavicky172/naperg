import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { MerchantData } from '../MerchantData.type'
import { Product } from '../../product/Product.type'
import { CREATE_MERCHANT_DATA_MUTATION } from '../GraphQL'

type State = {}
type Props = {
  merchantData: MerchantData
  createMerchantData: any
  product: Product
  cleanFields: () => void
  typeField: string
}

class CreateMerchantData extends React.Component<Props, State> {
  render() {
    return (
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          this.createMerchantData()
          this.props.cleanFields()
        }}>
        {`Save`}
      </Button>
    )
  }

  createMerchantData = async () => {
    await this.props.createMerchantData({
      variables: {
        data: {
          category: this.props.merchantData.category,
          city: this.props.merchantData.city,
          country: this.props.merchantData.country,
          name: this.props.merchantData.name,
          network_id: this.props.merchantData.network_id,
          postal_code: this.props.merchantData.postal_code,
          state: this.props.merchantData.state,
          product: {
            connect: {
              id: this.props.product.id,
            },
          },
        },
      },
    })
  }
}

export default compose(
  graphql(CREATE_MERCHANT_DATA_MUTATION, {
    name: 'createMerchantData',
  }),
  withRouter
)(CreateMerchantData)
