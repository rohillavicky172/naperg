// import { IssuedCard } from '../issuedCard/IssuedCard.type'
// import { Invoice } from '../invoice/Invoice.type'
// import { Balance } from '../balance/Balance.type'
// import { Subscription } from '../subscription/Subscription.type'
import { User } from '../user/User.type'
import { Companie } from '../companie/Companie.type'
import { PlaidData } from '../plaidData/PlaidData.type'

export interface SourceNode {
  node: Source
}
export interface Source {
  id: string
  createdAt: Date
  deletedAt: Date
  externalId: string
  cus_stripe_id: string
  isDefaultSource: boolean
  isDeleted: boolean
  companie: Companie
  testMode: boolean
  typeSource: string
  nickname: string
  object: string
  account_holder_name: string
  account_holder_type: string

  country: string
  currency: string
  customer: string
  last4: string
  routing_number: string
  status: string

  brand: string
  bank_name: string

  funding: string

  exp_month: number
  exp_year: number

  address_city: string
  address_country: string
  address_line1: string
  address_line1_check: string
  address_line2: string
  address_state: string

  address_zip: string
  address_zip_check: string
  cvc_check: string
  dynamic_last4: string
  fingerprint: string
  name: string
  tokenization_method: string
  plaidData: PlaidData
  user: User | null
}
