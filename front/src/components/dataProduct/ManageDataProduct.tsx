import React from 'react'
import DataProductsQuery from './list/DataProductsQuery'

type State = {}
type Props = {
  userId: string
  companieId: string
  productId?: string
  subscriptionId?: string
}

class ManageDataProduct extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    return (
      <>
        <h4>{`Note`}</h4>
        <DataProductsQuery
          userId={this.props.userId}
          companieId={this.props.companieId}
          productId={this.props.productId}
          subscriptionId={this.props.subscriptionId}
          variables={{
            where: {
              companie: { id: this.props.companieId },
              // user: { id: this.props.userId },
              // product: { id: this.props.productId },
              subscription: { id: this.props.subscriptionId }
            }
          }}
        />
      </>
    )
  }
}

export default ManageDataProduct
