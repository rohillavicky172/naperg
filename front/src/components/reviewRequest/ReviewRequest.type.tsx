// import { productClass, Product } from '../product/Product.type'
import { User } from '../user/User.type'
// import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
import { Product } from '../product/Product.type'
import { Companie } from '../companie/Companie.type'

export interface ReviewRequest {
  id: string
  email: string
  firstName: string
  companieName: string
  lastName: string
  product: Product
  userRequester: User
  companieRequester: Companie
  privateMessageInviter: string
  createdAt: Date
}
// export const reviewClass: ReviewRequest = {
//   id: '',
//   email: '',
//   firstName: '',
//   lastName: '',
//   createdAt: new Date(),
// }
export interface ReviewRequestNode {
  node: ReviewRequest
}
