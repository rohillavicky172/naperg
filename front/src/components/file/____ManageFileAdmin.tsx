import React from 'react'
import FilesAdminQuery from './list/____FilesAdminQuery'

type State = {}
type Props = {
  userId: string
  companieId: string
  productId: string
}

class ManageFileAdmin extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  render() {
    return (
      <>
        <h2>Notes (ADMIN)</h2>
        <FilesAdminQuery
          userId={this.props.userId}
          companieId={this.props.companieId}
          productId={this.props.productId}
          variables={{
            where: {
              product: { id: this.props.productId }
            }
          }}
        />
      </>
    )
  }
}

export default ManageFileAdmin
