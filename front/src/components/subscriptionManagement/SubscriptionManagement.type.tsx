// import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
// import { UserStripe, userStripeClass } from '../userStripe/UserStripe.type'
// import { IssuedCard } from '../issuedCard/IssuedCard.type'
// import { Subscription } from '../subscription/Subscription.type'
// import { Invoice } from '../invoice/Invoice.type'
// import { Product, productClass } from '../product/Product.type'
// import { Source } from '../source/Source.type'
import { User, userClass } from '../user/User.type'
import { Subscription } from '../subscription/Subscription.type'

export interface SubscriptionManagementNode {
  node: SubscriptionManagement
}
export interface SubscriptionManagement {
  id: string
  dateStatus: Date
  subscription: Subscription
  user: User
  statusSubscriptionManagement: string
  typeSubscriptionManagement: string
}

// export const subscriptionManagementClass: SubscriptionManagement = {
//   id: '',
//   user: userClass,
//   dateStatus: new Date(),
//   subscription: subscriptionClass,
//   statusSubscriptionManagement: 'REJECTED',
//   typeSubscriptionManagement: 'CASHBACK',
// }
