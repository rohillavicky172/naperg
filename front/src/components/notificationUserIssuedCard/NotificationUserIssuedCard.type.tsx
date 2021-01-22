import { User } from '../user/User.type'
// import { Companie, companieClass } from '../companie/Companie.type'
// import { Product } from '../product/Product.type'
// import { Invoice } from '../invoice/Invoice.type'
// import { Cardholder, cardHolderClass } from '../cardholder/Cardholder.type'
// import { AuthDevice, authDeviceClass } from '../authDevice/AuthDevice.type'

export interface NotificationUserIssuedCard {
  id: string
  user: User
  createdAt: Date
}
