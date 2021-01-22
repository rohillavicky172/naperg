import React from 'react'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import Button from '@material-ui/core/Button'

import { IssuedCard } from '../IssuedCard.type'
import { Product } from '../../product/Product.type'
import { UPDATE_ISSUED_CARD } from '../GraphQL'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import utils from '../../utils'

type Props = {
  titleButton: string
  onCancel: () => void
  issuedCard: IssuedCard
  disabled: boolean
  product: Product | null

  onUpdated: (issuedCard: IssuedCard) => void
}

const UpdateIssuedCardInitProduct = (props: Props) => {
  const client = useApolloClient()
  const [updateIssuedCard] = useMutation(UPDATE_ISSUED_CARD)

  const [loading, setLoading] = React.useState(false)
  // state = {
  //   loading: false,
  // }

  const updateIssuedCardF = async () => {
    setLoading(true)
    let newIssuedCard

    try {
      let dataIssueCard: any = {
        name: props.issuedCard.name,
        notification: props.issuedCard.notification,
        limitPerTransaction: Number(props.issuedCard.limitPerTransaction),
        dateValidFrom: props.issuedCard.dateValidFrom ? utils.removeTime(props.issuedCard.dateValidFrom) : null,
        dateValidTo: props.issuedCard.dateValidTo ? utils.removeTime(props.issuedCard.dateValidTo) : null,
        description: props.issuedCard.description,
        authorizedAmount: Number(props.issuedCard.authorizedAmount),
        authorizedAmountUnit: props.issuedCard.authorizedAmountUnit,
        isRequested: props.issuedCard.isRequested,
        type: props.issuedCard.type,
        issuedCardCode: props.issuedCard.issuedCardCode,
      }

      if (props.product) {
        dataIssueCard = {
          ...dataIssueCard,
          initProduct: { connect: { id: props.product.id } },
        }
      }
      if (props.product === null && props.issuedCard.initProduct) {
        dataIssueCard = {
          ...dataIssueCard,
          initProduct: { disconnect: true },
        }
      }

      newIssuedCard = await updateIssuedCard({
        variables: {
          data: dataIssueCard,
          where: {
            id: props.issuedCard.id,
          },
        },
      })
    } catch (e) {
      setLoading(false)
    }
    if (newIssuedCard) {
      setLoading(false)
      props.onUpdated(newIssuedCard.data.updateIssuedCard)
      client.resetStore()
    }
  }

  return (
    <>
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        variant={'outlined'}
        size={'medium'}
        disabled={props.disabled}
        buttonText={props.titleButton}
        buttonLoadingText={`Setting up...`}
        onClick={() => updateIssuedCardF()}
        loading={loading}
      />{' '}
      <Button onClick={props.onCancel}>{`Cancel`}</Button>
    </>
  )
}

export default UpdateIssuedCardInitProduct
