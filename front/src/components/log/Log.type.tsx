import { User } from '../user/User.type'
import { Invoice } from '../invoice/Invoice.type'
import { IssuedCard } from '../issuedCard/IssuedCard.type'
import { Balance } from '../balance/Balance.type'
import { Subscription } from '../subscription/Subscription.type'
import { Cardholder } from '../cardholder/Cardholder.type'
import { Companie } from '../companie/Companie.type'
import { Product } from '../product/Product.type'
import { Source } from '../source/Source.type'
import { AuthDevice } from '../authDevice/AuthDevice.type'
import { PlaidData } from '../plaidData/PlaidData.type'
import { Charge } from '../charge/Charge.type'
import { Campaign } from '../campaign/Campaign.type'
import { RuleMerchantData } from '../ruleMerchantData/RuleMerchantData.type'
import { SubscriptionManagement } from '../subscriptionManagement/SubscriptionManagement.type'
import { SellerBalance } from '../sellerBalance/SellerBalance.type'

export interface Log {
  id: string
  event: string
  json: string
  jsonError: string
  date: Date
  message: string
  invoice: Invoice
  charge: Charge
  user: User
  issuedCard: IssuedCard
  source: Source
  authDevice: AuthDevice
  subscriptionManagement: SubscriptionManagement
  balance: Balance
  companie: Companie
  cardholder: Cardholder
  campaign: Campaign
  plaidData: PlaidData
  product: Product
  subscription: Subscription
  ruleMerchantData: RuleMerchantData
  sellerBalance: SellerBalance
}
