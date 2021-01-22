import { Companie, companieClass } from '../companie/Companie.type'
import { User, userClass } from '../user/User.type'

export interface PromoCode {
  id: string
  code: string
  startAt: Date
  endAt: Date
  description: string
  user: User
  type: 'FREE_APP' | 'FREE_6_MONTHS' | 'FREE_1_YEAR'

  createdAt: Date
  companie: Companie
  isRedeem: boolean
}
export interface PromoCodeNode {
  node: PromoCode
}

export const promoCodeClass: PromoCode = {
  id: '',
  startAt: new Date(),
  endAt: new Date(),
  code: '',
  type: 'FREE_APP',
  description: '',
  isRedeem: false,
  user: userClass,
  createdAt: new Date(),
  companie: companieClass,
}
