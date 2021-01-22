import { CategorieProduct } from '../categorieProduct/CategorieProduct.type'
import { Subscription } from '../subscription/Subscription.type'
import { Companie } from '../companie/Companie.type'
// import { SignupField } from './single/signupField/SignupField.type'
import { Promotion } from '../promotion/Promotion.type'
import { RuleMerchantData } from '../ruleMerchantData/RuleMerchantData.type'

export interface PositionProduct {
  id: string
  categorieProduct: CategorieProduct
}

export interface Product {
  id: string
  name: string
  urlName: string
  subName: string
  createdAt: Date
  textButton: string
  altNameFile: string
  previewOgImage: string
  altNameFileBanner: string

  levelBtoB: number
  nameFile: string
  nameFileBanner: string
  ownerCompanie: Companie | null
  ruleMerchantDatas: RuleMerchantData[]
  privateData: string
  sellerLink: string
  productDescription: string
  typeProduct: 'BTOB' | 'CONSUMER' | 'BTOB_AND_CONSUMER'
  productFrequency: 'SUBSCRIPTION' | 'ONE_OFF'
  creationType: 'CREATED_BY_USER' | 'CREATED_BY_ISSUED_CARD' | 'CREATED_BY_ADMIN'
  visibility: string
  shortDescription: string
  // loginLink: string
  communicationWithSellerType: string
  policyLink: string

  showMarketplace: boolean
  showShowcase: boolean
  subscribed: boolean

  // owners: User[]
  positionProducts: PositionProduct[]
  subscriptions: Subscription[]
  promotions: Promotion[]
}

export interface NodeProduct {
  node: Product
}

export const productClass: Product = {
  id: '',
  ruleMerchantDatas: [],
  name: '',
  previewOgImage: '',
  altNameFile: '',
  altNameFileBanner: '',
  levelBtoB: 50,
  createdAt: new Date(),
  urlName: '',
  showMarketplace: false,
  showShowcase: false,
  productFrequency: 'SUBSCRIPTION',
  creationType: 'CREATED_BY_ADMIN',
  // discount: 0,
  typeProduct: 'BTOB_AND_CONSUMER',
  nameFile: '',
  nameFileBanner: '',
  subName: '',
  textButton: 'Subscribe',

  ownerCompanie: null,

  privateData: '',
  sellerLink: '',
  productDescription: '',

  visibility: 'PUBLIC',
  shortDescription: '',
  // loginLink: '',
  communicationWithSellerType: 'ISSUING_CARD',
  policyLink: '',
  subscribed: false,
  // owners: [],
  positionProducts: [],
  subscriptions: [],
  promotions: [],
}
