import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
// import { useHistory } from 'react-router-dom'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import { PromoCode } from './PromoCode.type'

export const MUTATION = gql`
  mutation RedeemPromoCodeMutation($code: String!, $companieId: String!) {
    redeemPromoCode(code: $code, companieId: $companieId) {
      id
      isRedeem
    }
  }
`

type Props = {
  onUpdate: (promoCode: PromoCode) => void
  companieId: string
}

const RedeemPromoCode = (props: Props) => {
  // const history = useHistory()
  const [loading, setLoading] = React.useState(false)
  const client = useApolloClient()
  const [code, setCode] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [redeemPromoCode] = useMutation(MUTATION)

  const createPromoCodeF = async () => {
    setLoading(true)
    setMessage('')
    let promoCode
    try {
      promoCode = await redeemPromoCode({
        variables: {
          companieId: props.companieId,
          code,
        },
      })
    } catch (e) {
      setLoading(false)
      setMessage('Error')
      //
    }
    if (promoCode) {
      setMessage('')
      client.resetStore()
      setLoading(false)
      setCode('')
      props.onUpdate(promoCode)
      // history.push('/admin/promocodes/?companieId=' + props.companieId)
    }
  }
  return (
    <>
      <div>
        <FormControl className="">
          <InputLabel htmlFor="discount">{`Enter Promo Code`}</InputLabel>
          <Input
            id="discount"
            type="text"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
          />
        </FormControl>
      </div>
      <div style={{ height: '15px' }} />
      <ButtonLoadingAfterClick
        id={'idButtonUpdateAddress'}
        disabled={false}
        icon={''}
        size={'medium'}
        color={'primary'}
        variant={'outlined'}
        buttonText={'Redeem'}
        buttonLoadingText={`Setting up...`}
        onClick={() => createPromoCodeF()}
        loading={loading}
      />
      <div className="secondary">{message}</div>
    </>
  )
}

export default RedeemPromoCode
