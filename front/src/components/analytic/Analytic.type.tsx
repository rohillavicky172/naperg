// import { User } from '../user/User.type'
// import { Companie } from '../companie/Companie.type'
// import { Product } from '../product/Product.type'

export interface Analytic {
  id: string
  url: string
  urlTo: string
  userId: string
  productId: string
  companieId: string
  origin: string
  ip: string
  country: string
  region: string
  timezone: string
  city: string
  isBot: boolean
  nameBot: string
  userAgent: string
  friendlyBrowserName: string
  friendlyBrowserVersion: string
  friendlyBrowserMajor: string
  friendlyEngineName: string
  friendlyEngineVersion: string
  friendlyOsName: string
  friendlyOsVersion: string
  friendlyDeviceVendor: string
  friendlyDeviceModel: string
  friendlyDeviceType: string
  friendlyCpuArchitecture: string

  createdAt: Date
  type: 'CLICK'
}
