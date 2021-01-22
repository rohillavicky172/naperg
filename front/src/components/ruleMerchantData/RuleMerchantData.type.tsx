// import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
// import { UserStripe, userStripeClass } from '../userStripe/UserStripe.type'
// import { IssuedCard } from '../issuedCard/IssuedCard.type'
// import { Subscription } from '../subscription/Subscription.type'
// import { Invoice } from '../invoice/Invoice.type'
import { Product, productClass } from '../product/Product.type'
// import { Source } from '../source/Source.type'
import { User, userClass } from '../user/User.type'

export interface RuleMerchantData {
  id: string
  createdAt: Date
  nameSubstringInit: string
  isActive: boolean
  nameSubstringEnd: string
  nameRule: TypeRule
  categoryRule: TypeRule
  network_idRule: TypeRule
  countryRule: TypeRule
  cityRule: TypeRule
  stateRule: TypeRule
  user: User
  postal_codeRule: TypeRule
  nameValue: string
  categoryValue: string
  network_idValue: string
  countryValue: string
  productId: string
  cityValue: string
  nameSimulation: string
  stateValue: string
  postal_codeValue: string
  product: Product
}

type TypeRule = 'NONE' | 'SUBSTRING' | 'EQUAL' | 'INCLUDES'

export const ruleMerchantDataClass: RuleMerchantData = {
  id: '',
  createdAt: new Date(),
  isActive: true,
  nameRule: 'NONE',
  nameSubstringInit: '2',
  user: userClass,
  nameSimulation: '',
  stateValue: '',
  stateRule: 'NONE',
  postal_codeRule: 'NONE',
  postal_codeValue: '',

  nameSubstringEnd: '8',
  categoryRule: 'NONE',
  network_idRule: 'NONE',
  countryRule: 'NONE',
  cityRule: 'NONE',
  nameValue: 'AMAZON',
  categoryValue: '',
  network_idValue: '',
  countryValue: '',
  cityValue: '',
  productId: '',
  product: productClass,
}
