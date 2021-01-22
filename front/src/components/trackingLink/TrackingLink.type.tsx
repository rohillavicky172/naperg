import { User } from '../user/User.type'
import { Companie } from '../companie/Companie.type'
import { Product } from '../product/Product.type'

export interface TrackingLink {
  id: string
  origin: string
  link: string
  user?: User
  product: Product
  companie?: Companie

  date: Date
}
