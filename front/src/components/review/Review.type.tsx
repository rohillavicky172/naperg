import { productClass, Product } from '../product/Product.type'
import { User, userClass } from '../user/User.type'
import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
// import { Product } from '../product/Product.type'

export interface Review {
  id: string
  rating: number
  content: string
  productId: string
  headline: string
  product: Product
  createdAt: Date
  user: User
  userRoleCompanie?: UserRoleCompanie
  userTypeReview: 'VERIFIED_BUYER' | 'SELLER' | 'REGULAR_USER'
}
export const reviewClass: Review = {
  id: '',

  rating: 0,
  content: '',
  productId: '',
  product: productClass,

  headline: '',
  createdAt: new Date(),
  user: userClass,
  userTypeReview: 'REGULAR_USER',
}
