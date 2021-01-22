import React from 'react'
import { MerchantData } from '../MerchantData.type'
import { UPDATE_MERCHANT_DATA_MUTATION } from '../GraphQL'
import { useMutation } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

type Props = {
  merchantData: MerchantData
}

const UpdateMerchantData = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [updateMerchantData] = useMutation(UPDATE_MERCHANT_DATA_MUTATION)

  const updateMerchantDataF = async () => {
    setLoading(true)
    let newMerchantData
    try {
      newMerchantData = await updateMerchantData({
        variables: {
          where: {
            id: props.merchantData.id,
          },
          data: {
            category: props.merchantData.category,
            city: props.merchantData.city,
            country: props.merchantData.country,
            name: props.merchantData.name,
            network_id: props.merchantData.network_id,
            postal_code: props.merchantData.postal_code,
            state: props.merchantData.state,
            // product: {
            //   connect: {
            //     id: props.merchantData.product.id,
            //   },
            // },
          },
        },
      })
    } catch (e) {
      setLoading(false)
      e.graphQLErrors.some((graphQLError) => setMessage(graphQLError.message))
    }
    setLoading(false)
    if (newMerchantData) {
      setMessage('Saved!')
    }
  }
  return (
    <>
      <ButtonLoadingAfterClick
        id={'UpdateMerchantData'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={'Update'}
        buttonLoadingText={`Loading...`}
        onClick={() => updateMerchantDataF()}
        loading={loading}
      />

      <div className="secondary">{message}</div>
    </>
  )
}

export default UpdateMerchantData
