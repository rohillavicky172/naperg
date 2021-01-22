import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { useLocation } from 'react-router-dom'
import { COMPUTE_INVOICES_PROMOTION_MUTATION } from '../../GraphQL'
import Filters from '../../../nav/filter/Filters'
import queryString from 'query-string'
import InvoicesAdminQuery from './InvoicesAdminQuery'

const ComputeInvoicesPromotion = () => {
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  let page: number = parsed.page ? Number(parsed.page) : 1
  const first = 10
  // let promotionId = parsed.promotionId
  let subscriptionId = parsed.subscriptionId
  const productId = parsed.productId
  const client = useApolloClient()
  let message

  const [computeInvoicePromotion, data] = useMutation(COMPUTE_INVOICES_PROMOTION_MUTATION)
  if (data.error) {
    message = data.error.message
  }

  if (data.data) {
    message = data.data.computeInvoicesPromotion
  }

  const variables = {
    first,
    orderBy: 'createdAt_DESC',
    skip: (page - 1) * first,
    where: {
      subscription: subscriptionId && {
        id: subscriptionId,
      },
      product: productId && {
        id: productId,
      },
    },
  }

  return (
    <>
      <Filters showSubscriptionId showProductId />
      <Button
        color="default"
        variant="outlined"
        onClick={async () => {
          await computeInvoicePromotion({
            variables: {
              ...variables,
              skip: undefined,
              first: undefined,
            },
          })

          await client.resetStore()
        }}>{`ComputeInvoicesPromotion`}</Button>
      {message && <div className="secondary">{message}</div>}

      <InvoicesAdminQuery page={page} variables={variables} />
    </>
  )
}

export default ComputeInvoicesPromotion
