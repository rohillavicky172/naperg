import { Subscription } from '../subscription/Subscription.type'
import { User, userClass } from '../user/User.type'
import { Charge } from '../charge/Charge.type'
import { PromoCode } from '../promoCode/PromoCode.type'
import { IssuedCard } from '../issuedCard/IssuedCard.type'
import { Companie, companieClass } from '../companie/Companie.type'
import { Source } from '../source/Source.type'
import { RuleMerchantData } from '../ruleMerchantData/RuleMerchantData.type'
import { Product } from '../product/Product.type'

export interface TransactionsStripe {
  id: string
  amount: number
  currency: string
  type: string
}

export interface AuthorizationStripe {
  id: string
  approved: boolean
  status: string
  authorization_method: string
  created: number
  // card: IssuedCardStripe;
  card: Source
  wallet: string
  transactions: TransactionsStripe[]
}

export interface InvoiceNode {
  node: Invoice
}
export interface Invoice {
  id: string
  type:
    | 'SELLER_REVSHARE'
    | 'TOP_UP'
    | 'AUTO_TOP_UP'
    | 'VIRTUAL_CARD'
    | 'VIRTUAL_CARD_TRUSTED'
    | 'PLATFORM_FEES'
    | 'PHYSICAL_CARD_FEES'
    | 'REFUND'
    | 'REFUND_CASH_OUT'
    | 'RECURING_PLATFORM_FEES'

  typePayment: string

  ruleMerchantData: RuleMerchantData | null
  invoiceParent: Invoice | null
  invoiceChilds: Invoice[]
  cashbackStatus: 'PENDING' | 'AVAILABLE'
  currency: string
  // statusInvoice: string;
  statusIssuing: string
  description: string
  customSourceLabel: string
  productCostLocal: number
  descriptionError: string
  productCostLocalInitial: number
  availableAmountToRefund: number
  productCostInitial: number
  productCost: number
  period: string
  promoCode?: PromoCode
  issuedCard?: IssuedCard
  // promotions: Promotion[]
  // processingFees: number,
  // totalProductCost: number,
  buyerDiscount: number
  buyerFinalPrice: number
  crossBorderFee: number
  cashback: number
  revshare: number
  foreignExchangeFee: number
  incomingPaymentFee: number
  snapshotValueBalance: number
  smallId: number
  status: string
  customSourceLabelPrivate: string
  authorization_stripe_id: string
  companie: Companie
  isSmallExpensePaid: boolean
  // startAt: Date,
  // created: Date,
  // endAtEndMonth: Date,
  // endAt: Date,

  dateInvoice: Date
  subscription: Subscription | null

  product?: Product
  user: User
  charges: Charge[]
  authorizationStripe: AuthorizationStripe | null
}

export const invoiceClass: Invoice = {
  id: '',
  smallId: 0,
  status: 'SUCCESSFUL',
  cashbackStatus: 'PENDING',
  typePayment: 'BALANCE',
  statusIssuing: 'closed',
  customSourceLabel: '',
  customSourceLabelPrivate: '',
  descriptionError: '',
  period: '',
  type: 'TOP_UP',
  description: '',
  authorization_stripe_id: '',
  snapshotValueBalance: 0,
  cashback: 0,
  revshare: 0,
  currency: 'usd',
  productCost: 0,
  productCostLocal: 0,
  productCostLocalInitial: 0,
  availableAmountToRefund: 0,
  productCostInitial: 0,
  // promotions: [],

  crossBorderFee: 0,
  foreignExchangeFee: 0,
  incomingPaymentFee: 0,
  user: userClass,
  ruleMerchantData: null,
  authorizationStripe: null,
  subscription: null,
  invoiceParent: null,
  isSmallExpensePaid: false,
  buyerDiscount: 0,
  charges: [],
  buyerFinalPrice: 0,
  companie: companieClass,

  dateInvoice: new Date(),
  invoiceChilds: [],
}
