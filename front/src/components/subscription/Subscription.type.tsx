import { Product } from '../product/Product.type'
// import { Invoice } from '../invoice/Invoice.type'
import { IssuedCard } from '../issuedCard/IssuedCard.type'
import { Companie } from '../companie/Companie.type'
import { User } from '../user/User.type'

export interface SubscriptionNode {
  node: Subscription
}
// export interface SubscriptionInvoice {
//   id: string
//   invoice: Invoice
// }
export interface Subscription {
  id: string
  // firstRegularInvoiceYM: number
  // myListPriceOffCycle: number
  createdAt: Date
  lastInvoiceDate: Date
  dateCreation: Date

  averagePrice: number
  countAveragePrice: number
  issuedCard: IssuedCard
  // variation: Variation,
  // willBeCancelledInYM: number
  product: Product
  status: string
  paymentFrequency: string
  // sellerLoginLink: string
  // signupSellerApproved: boolean
  signupDate: Date
  companie: Companie
  datePaymentError: Date
  dateCancellation: Date
  endAt: Date
  user: User
  endAtEndMonth: Date
  // initSignupFields: SignupField[],
  // subscriptionInvoices: SubscriptionInvoice[]
}
