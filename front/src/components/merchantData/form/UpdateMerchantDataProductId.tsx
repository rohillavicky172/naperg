import React from 'react'
import { MerchantData } from '../MerchantData.type'
import { UPDATE_MERCHANT_DATA_MUTATION } from '../GraphQL'
import { useMutation } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { FormControl, InputLabel, Input } from '@material-ui/core'

type Props = {
  merchantData: MerchantData
}

const UpdateMerchantDataProductId = (props: Props) => {
  const [message, setMessage] = React.useState('')
  const [productId, setProductId] = React.useState(props.merchantData.product.id)
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
            product: {
              connect: {
                id: productId,
              },
            },
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
      <div>
        <FormControl>
          <InputLabel htmlFor="productId">{`productId`}</InputLabel>
          <Input id="productId" type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
        </FormControl>
      </div>
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

export default UpdateMerchantDataProductId
