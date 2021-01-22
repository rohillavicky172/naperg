// import { Subscription } from '../subscription/Subscription.type'
// import { User } from '../user/User.type'
// import { Charge } from '../charge/Charge.type'
import { Companie } from '../companie/Companie.type'

export interface Balance {
  id: string
  createdAt: Date
  currency: string
  valueBalance: number
  pendingCharge: number
  pendingBalance: number
  cashbackPending: number
  availableAmountToRefund: number
  maxAvailableAmountToRefund: number
  cashbackAvailable: number
  pendingSmallAmount: number
  unpaidCharge: number
  revshareSellerTotal: number
  revshareSellerTotalPaid: number

  minimumBalance: number
  isEnabled: boolean
  companie: Companie
}
export interface BalanceNode {
  node: Balance
}
