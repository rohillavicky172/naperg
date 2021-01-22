import { productClass, Product } from '../product/Product.type'
import { User, userClass } from '../user/User.type'
// import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
// import { Product } from '../product/Product.type'

export interface CustomLink {
  id: string
  link: string
  anchor:
    | 'SUPPORT'
    | 'PRIVACY_POLICY'
    | 'DOCUMENTATION'
    | 'TERMS_OF_SERVICE'
    | 'TERMS_AND_CONDITIONS'
    | 'PRICING'
    | 'FAQ'
    | 'BLOG'
    | 'CONTACT'

  createdAt: Date
  user: User
  product: Product
}

export const customLinkClass: CustomLink = {
  id: '',

  link: '',
  anchor: 'PRICING',
  product: productClass,

  createdAt: new Date(),
  user: userClass,
}
