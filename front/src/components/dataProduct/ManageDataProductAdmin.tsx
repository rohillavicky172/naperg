import React from 'react'
import DataProductsAdminQuery from './list/DataProductsAdminQuery'

type Props = {
  userId: string
  companieId: string
  productId: string
}

const ManageDataProductAdmin = (props: Props) => {
  return (
    <>
      <h2>Data Products (ADMIN)</h2>
      <DataProductsAdminQuery
        userId={props.userId}
        companieId={props.companieId}
        productId={props.productId}
        variables={{
          where: {
            product: { id: { equals: props.productId } },
          },
        }}
      />
    </>
  )
}

export default ManageDataProductAdmin
