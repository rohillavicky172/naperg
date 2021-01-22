import { Product, productClass } from '../product/Product.type'
import { User, userClass } from '../user/User.type'

export interface Promotion {
  id: string
  type: string
  createdAt: Date
  text1: string
  text2: string
  howToRedeem: string
  // showHowToRedeem: boolean
  typeRedeem: 'LINK_NOT_REQUIRED' | 'LINK_REQUIRED' | 'CUSTOM_FIELD' | 'NONE'
  text3: string
  startAt: Date
  endAt: Date

  isPromotionLive: boolean
  discount: string
  window: string

  product: Product
  createdBy: User
}
export interface PromotionNode {
  node: Promotion
}

export const promotionClass: Promotion = {
  id: '',
  type: 'CASHBACK',
  typeRedeem: 'NONE',
  createdAt: new Date(),
  howToRedeem: '',
  // showHowToRedeem: false,
  text1: '',

  text2: '',
  text3: '',
  startAt: new Date(),
  endAt: new Date(),
  discount: '0',
  window: '0',

  product: productClass,
  createdBy: userClass,
  isPromotionLive: false,
}
