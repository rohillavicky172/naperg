import { Companie, companieClass } from '../companie/Companie.type'
import { User, userClass } from '../user/User.type'
import { Subscription } from '../subscription/Subscription.type'
import { Contract } from '../contract/Contract.type'
import { Invoice } from '../invoice/Invoice.type'

export interface FileContainer {
  nameFile: string
  type: string
}

export interface File {
  id: string
  description: string
  nameFile: string
  shortNameFile: string
  type: string
  isDeleted: boolean
  companie?: Companie
  invoice?: Invoice
  typeFile: 'CONTRACT' | 'IDENTITY_DOCUMENT' | 'OTHER' | 'INVOICE' | 'SUBSCRIPTION'
  createdAt: Date
  contract?: Contract
  user?: User
  createdBy?: User
  subscription?: Subscription
}

export const fileClass: File = {
  id: '',
  description: '',
  isDeleted: false,
  nameFile: '',
  shortNameFile: '',
  typeFile: 'OTHER',
  type: '',
  // subscription: null,
  createdAt: new Date(),
  companie: companieClass,
  user: userClass,
  // product: productClass
}
