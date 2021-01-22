import { User, userClass } from '../user/User.type'
// import { Companie } from '../companie/Companie.type'
// import { Product } from '../product/Product.type'

export interface Campaign {
  // singleSendPerUser: boolean
  // isSuspended: boolean
  // unsubscribe: boolean
  id: string
  name: string
  campaignVariables: string
  emailTest: string
  isActive: boolean
  showUnsubscribe: boolean
  companieNameTest: string
  description: string
  outputJson: string
  from: string
  subject: string
  type: 'SMS_TWILIO' | 'MAIL_POSTMARK' | 'MAIL_AWS' | 'CREATE_HISTORIC' | 'SLACK'

  bcc: string
  frequency: string
  status: 'RUNNING' | 'STOP'

  bodyEmail: string
  user: User
  createdAt: Date
  lastSent: Date
}
export const campaignClass: Campaign = {
  id: '',

  bcc: '',
  frequency: '',
  emailTest: '',
  showUnsubscribe: true,
  status: 'STOP',

  // singleSendPerUser: true,

  // isSuspended: false,
  // unsubscribe: false,
  campaignVariables: '',
  isActive: false,
  outputJson: '',
  description: '',
  companieNameTest: '',
  type: 'MAIL_AWS',
  bodyEmail: '',
  from: '',
  subject: '',
  name: '',
  createdAt: new Date(),
  lastSent: new Date(),
  user: userClass,
}
