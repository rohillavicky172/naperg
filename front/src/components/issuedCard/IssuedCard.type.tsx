import { User, userClass } from '../user/User.type'
import { Companie, companieClass } from '../companie/Companie.type'
import { Product } from '../product/Product.type'
import { Invoice } from '../invoice/Invoice.type'
import { Cardholder, cardHolderClass } from '../cardholder/Cardholder.type'
import { AuthDevice, authDeviceClass } from '../authDevice/AuthDevice.type'

export interface Dob {
  month: number
  day: number
  year: number
}
export interface AddressStripe {
  line1: string
  line2: string
  city: string
  country: string
  state: string
  postal_code: string
}

export const addressStripeClass: AddressStripe = {
  line1: '',
  line2: '',
  city: '',
  country: '',
  state: '',
  postal_code: '',
}

export interface ShippingStripe {
  eta: number
  name: string
  address: AddressStripe
  carrier: string
  status: string
  // eta: number;
}

export const shippingStripeClass: ShippingStripe = {
  eta: 0,
  name: '',
  address: addressStripeClass,
  carrier: '',
  status: '',
}

export interface Metadata {
  nickname: string
}
export const metadataClass: Metadata = {
  nickname: '',
}

export interface BillingStripe {
  // name: string
  address: AddressStripe
}
export const billingStripeClass: BillingStripe = {
  // name: '',
  address: addressStripeClass,
}
export interface DobStripe {
  year: number
  month: number
  day: number
}
export const dobStripeClass: DobStripe = {
  year: 0,
  month: 0,
  day: 0,
}
export interface IndividualStripe {
  first_name: string
  last_name: string
  dob: DobStripe
}
export const individualStripeClass: IndividualStripe = {
  first_name: '',
  last_name: '',
  dob: dobStripeClass,
}
export interface RequirementsStripe {
  disabled_reason: string
}

export const requirementsStripeClass: RequirementsStripe = {
  disabled_reason: '',
}
export interface CardholderStripe {
  id: string
  name: string
  phone_number: string
  email: string
  billing: BillingStripe
  requirements: RequirementsStripe
  individual: IndividualStripe
}
export const cardholderStripeClass: CardholderStripe = {
  id: '',
  name: '',
  phone_number: '',
  email: '',
  billing: billingStripeClass,
  requirements: requirementsStripeClass,
  individual: individualStripeClass,
}

export interface IssuedCardStripe {
  id: string
  exp_month: number
  exp_year: number
  brand: string
  bank_name: string
  funding: string
  last4: string
  status: string
  number: string
  cvc: string
  object: string
  cardholder: CardholderStripe
  metadata: Metadata
  shipping: ShippingStripe
}

export const issuedCardStripeClass: IssuedCardStripe = {
  id: '',
  exp_month: 0,
  exp_year: 0,
  brand: '',
  bank_name: '',
  number: '',
  cvc: '',
  funding: '',
  last4: '0000',
  status: '',
  object: '',
  shipping: shippingStripeClass,
  cardholder: cardholderStripeClass,
  metadata: metadataClass,
  // shipping: ShippingStripe;
}

export interface IssuedCard {
  id: string
  name: string
  last4: number
  authorizedAmount: number | ''
  status: string
  testMode: boolean
  notification: boolean
  statusRequested: string
  isRequested: boolean
  user: User
  createdBy: User
  approvedBy: User | null
  description: string
  issuedCardType: string
  issuedCardCode: string
  invoice: Invoice | null
  city: string
  limitPerTransaction: number
  stripe_issuedCard_id: string
  alreadySpent: number
  type: string
  authorizedAmountUnit: string
  cardholder: Cardholder
  // authorizationType: string;
  authDevice: AuthDevice
  createdAt: Date
  dateApproved: Date
  initProduct: Product | null
  dateValidFrom: Date | null
  dateValidTo: Date | null
  companie: Companie
  issuedCardStripe: IssuedCardStripe
}

export const issuedCardClass: IssuedCard = {
  id: '',
  name: '',
  stripe_issuedCard_id: '',
  testMode: false,
  issuedCardType: 'STANDARD',
  createdAt: new Date(),
  notification: true,
  createdBy: userClass,
  dateApproved: new Date(),
  dateValidFrom: new Date(),
  cardholder: cardHolderClass,
  dateValidTo: new Date(),
  limitPerTransaction: 0,
  issuedCardStripe: issuedCardStripeClass,
  isRequested: false,
  last4: 0,
  initProduct: null,
  invoice: null,
  city: '',
  authorizedAmount: '',
  alreadySpent: 0,
  description: '',
  issuedCardCode: '',
  statusRequested: '',
  status: '',
  type: 'virtual',
  authorizedAmountUnit: 'NONE',
  user: userClass,
  approvedBy: userClass,
  authDevice: authDeviceClass,
  companie: companieClass,
}
