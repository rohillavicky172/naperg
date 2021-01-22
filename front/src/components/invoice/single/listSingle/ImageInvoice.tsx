import React from 'react'
import { Invoice } from '../../Invoice.type'
import '../Style.css'
import ImageTemplate from '../../../nav/ImageTemplate'
import { URL_FRONTEND } from '../../../../config/config'

type Props = {
  invoice: Invoice
  format: 'small' | 'verySmall'
}

const ImageInvoice = (props: Props) => {
  return (
    <>
      {props.invoice.product && <ImageTemplate format={props.format} nameFile={props.invoice.product.nameFile} />}
      {props.invoice.type === 'TOP_UP' && <ImageTemplate format={props.format} nameFile={`${URL_FRONTEND}/icon/topup.png`} />}
      {props.invoice.type === 'PLATFORM_FEES' && (
        <ImageTemplate format={props.format} nameFile={`${URL_FRONTEND}/icon/platformFees.png`} />
      )}

      {props.invoice.type === 'PHYSICAL_CARD_FEES' && (
        <ImageTemplate format={props.format} nameFile={'icon/physicalCardPlatformFee.png'} />
      )}
      {props.invoice.type === 'AUTO_TOP_UP' && (
        <ImageTemplate format={props.format} nameFile={`${URL_FRONTEND}/icon/autoTopup.png`} />
      )}
      {props.invoice.type === 'REFUND_CASH_OUT' && (
        <ImageTemplate format={props.format} nameFile={`${URL_FRONTEND}/icon/refund.png`} />
      )}
    </>
  )
}

export default ImageInvoice
