import { Product, productClass } from '../product/Product.type'
import { Invoice } from '../invoice/Invoice.type'

export interface MerchantData {
  id: string
  createdAt: Date
  type: string
  category: string
  product: Product
  invoices: Invoice[]
  city: string
  country: string
  name: string
  network_id: string
  postal_code: string
  state: string
}

export const merchantDataClass: MerchantData = {
  id: '',
  category: '',
  type: '',
  invoices: [],
  createdAt: new Date(),
  product: productClass,
  city: '',
  country: '',
  name: '',
  network_id: '',
  postal_code: '',
  state: ''
}
