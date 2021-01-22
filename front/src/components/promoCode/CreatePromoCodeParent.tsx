import React from 'react'
import PromoCodeForm from './form/PromoCodeForm'
import { promoCodeClass } from './PromoCode.type'
import CreatePromoCode from './form/CreatePromoCode'
import { Companie } from '../companie/Companie.type'

type Props = {
  companie: Companie
}

const CreatePromoCodeParent = (props: Props) => {
  let code = props.companie.name.toLocaleLowerCase()
  code = code + '-' + (Math.floor(Math.random() * 10000) + 1000)
  code = code.split(' ').join('-')
  const [promoCode, setPromoCode] = React.useState({
    ...promoCodeClass,
    code,
  })

  return (
    <>
      <h3>Create promocode for {props.companie.name}</h3>
      <PromoCodeForm onChange={(promocode) => setPromoCode(promocode)} promoCode={promoCode} />
      <div style={{ height: '10px' }} />
      <CreatePromoCode promoCode={promoCode} companieId={props.companie.id} />
    </>
  )
}

export default CreatePromoCodeParent
