// import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
// import { UserStripe, userStripeClass } from '../userStripe/UserStripe.type'
// import { IssuedCard } from '../issuedCard/IssuedCard.type'
// import { Subscription } from '../subscription/Subscription.type'
// import { Invoice } from '../invoice/Invoice.type'
// import { Product } from '../product/Product.type'
import { Companie, companieClass } from '../companie/Companie.type'
import { User } from '../user/User.type'

export interface ContractNode {
  node: Contract
}
export interface Contract {
  id: string
  companie: Companie
  title1: string
  title2: string

  nameVendor: string

  name: string
  title: string

  isSignedVendor: boolean
  canBeSignedVendor: boolean
  canBePrinted: boolean
  isComplete: boolean

  titleVendor: string

  createdBy: Date

  dateSignedVendor: Date
  signedByVendor: User | null

  // keyTerms: string
  textContract: string
  isSigned: boolean
  canBeSigned: boolean
  signedBy: User | null
  dateSigned: Date
}

export const contractClass: Contract = {
  id: '',
  title1: '',
  title2: '',
  // keyTerms: '',
  textContract: '',
  nameVendor: '',
  titleVendor: '',
  signedByVendor: null,
  isSignedVendor: false,
  canBeSignedVendor: true,
  isComplete: false,
  canBeSigned: true,
  canBePrinted: true,
  dateSignedVendor: new Date(),
  isSigned: false,
  title: '',
  name: '',
  signedBy: null,
  dateSigned: new Date(),
  createdBy: new Date(),
  companie: companieClass,
}
