import { Companie } from '../companie/Companie.type'
import { Product } from '../product/Product.type'

export interface SellerBalance {
  id: string
  createdAt: Date
  revshareSellerTotalPaid: number
  revshareSellerTotalPaidPending: number
  revshareSellerTotal: number
  product: Product
  companie: Companie
}
