import React from 'react'
import { Invoice } from '../../../Invoice.type'
// import ImageTemplate from '../../../../nav/ImageTemplate'

type Props = {
  invoice: Invoice
}

// class WalletProvider extends React.Component<Props, State> {
const WalletProvider = (props: Props) => {
  if (!props.invoice.authorizationStripe) {
    return null
  }
  return (
    <>
      {props.invoice.authorizationStripe.wallet === 'apple_pay' && (
        <img className={'imageSize5'} alt="apple pay provider" src={'/icon/pay/apple_pay.png'} />
      )}
      {props.invoice.authorizationStripe.wallet === 'google_pay' && (
        <img className={'imageSize5'} alt="google pay provider" src={'/icon/pay/google_pay.png'} />
      )}
      {props.invoice.authorizationStripe.wallet === 'samsung_pay' && (
        <img className={'imageSize5'} alt="samsung pay provider" src={'/icon/pay/samsung_pay.jpg'} />
      )}
    </>
  )
}

export default WalletProvider
