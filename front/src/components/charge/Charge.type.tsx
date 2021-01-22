import { Source } from '../source/Source.type'
import { Invoice, invoiceClass } from '../invoice/Invoice.type'

export interface ChargeData {
  id: string
  source: Source | null
  amount: number
  captured: string
  amount_refunded: number
  created: number
  status: string
  currency: string
}
export interface Charge {
  id: string
  stripeChargeId: string
  invoice: Invoice
  // messageErrorPayment: string
  // dateErrorPayment: Date
  chargeData: ChargeData
}

export const ChargeDataClass: ChargeData = {
  id: '',
  source: null,
  amount: 0,
  captured: '',
  amount_refunded: 0,
  created: 0,
  status: '',
  currency: ''
}
export const chargeClass: Charge = {
  id: '',
  stripeChargeId: '',
  invoice: invoiceClass,
  chargeData: ChargeDataClass
}
