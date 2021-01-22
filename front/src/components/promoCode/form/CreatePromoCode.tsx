import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { PromoCode } from '../PromoCode.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { useHistory } from 'react-router-dom'

export const MUTATION = gql`
  mutation CreatePromoCodeMutation($data: PromoCodeCreateInput!) {
    createPromoCode(data: $data) {
      id
      code
    }
  }
`

type Props = {
  promoCode: PromoCode
  companieId: string

  // cleanFields: () => void
}

const CreatePromoCode = (props: Props) => {
  const history = useHistory()
  const [loading, setLoading] = React.useState(false)
  const client = useApolloClient()
  const [createPromoCode] = useMutation(MUTATION)

  const createPromoCodeF = async () => {
    setLoading(true)
    let promoCode
    try {
      promoCode = await createPromoCode({
        variables: {
          data: {
            code: props.promoCode.code,
            startAt: props.promoCode.startAt,
            endAt: props.promoCode.endAt,
            type: props.promoCode.type,
            companieId: props.companieId,
            description: props.promoCode.description,
          },
        },
      })
    } catch (e) {
      setLoading(false)
      //
    }
    setLoading(false)
    if (promoCode) {
      client.resetStore()
      history.push('/admin/promocodes/?companieId=' + props.companieId)
    }
  }
  return (
    <ButtonLoadingAfterClick
      id={'idButtonUpdateAddress'}
      disabled={false}
      icon={''}
      size={'medium'}
      color={'primary'}
      variant={'outlined'}
      buttonText={'Create'}
      buttonLoadingText={`Setting up...`}
      onClick={() => createPromoCodeF()}
      loading={loading}
    />
  )
}

export default CreatePromoCode
