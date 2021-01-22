import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Product } from '../product/Product.type'
import { DELETE_MERCHANT_DATA_MUTATION } from './GraphQL'

type State = {}
type Props = {
  product: Product
  merchantDataId: string
  deleteMerchantData: any
}

class DeleteMerchantData extends React.Component<Props, State> {
  render() {
    return <Button onClick={() => this.deleteMerchantData()}>X</Button>
  }

  deleteMerchantData = async () => {
    await this.props.deleteMerchantData({
      variables: {
        where: {
          id: this.props.merchantDataId,
        },
      },
    })
  }
}

export default compose(
  graphql(DELETE_MERCHANT_DATA_MUTATION, {
    name: 'deleteMerchantData',
  }),
  withRouter
)(DeleteMerchantData)
