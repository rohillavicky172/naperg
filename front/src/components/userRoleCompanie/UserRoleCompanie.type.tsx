import { User, userClass } from '../user/User.type'
import { Companie, companieClass } from '../companie/Companie.type'

export interface UserRoleCompanie {
  id: string
  user: User
  companie: Companie
  companieRole: 'OWNER' | 'ADMIN' | 'ANALYST' | 'PURCHASER'

  isInvitationApproved: boolean
  sendEmailInvoiceSuccessful: boolean
  sendEmailMyInvoiceSuccessful: boolean
  isDeleted: boolean

  sendSlackInvoiceSuccessful: boolean
  sendSlackMyInvoiceSuccessful: boolean

  showSetupGuide: boolean
  isSelectedForReview: boolean

  showNoDataPageHome: boolean
  showNoDataPagePaymentSource: boolean
  showNoDataPageTeam: boolean
  showNoDataPageIssuedCard: boolean
  showNoDataPageSubscription: boolean
  showNoDataPageInvoice: boolean

  lastDateInvitationSent: Date
  createdAt: Date
  permissions: string[]
  // invitedBy: User,
  // isEmailValidated: boolean,
  // firstName: string,
  // nameFile: string,
  // lastName: string,
  // language: string,
  // sendGridId: string,
  // newsletter: boolean,
  // getEmailTransactionSuccess: boolean,
  // gender: string,
  // signupType: string,
  // userRoleCompanies: UserRoleCompanies,
  // // address1: string,
  // // address2: string,
  // // city: string,
  // // zip: string,
  // // state: string,
  // // country: string,
  // createdAt: Date,
  // lastLogin: Date,
  // email: string,
  // emailChangeRequested: string,
  // role: string,
  // stripe_cus_id: string,
  // stripe_cus_test_id: string,
  // timeZone: string,
  // products: Product[]
}

export const userRolecompanieClass: UserRoleCompanie = {
  id: '',
  user: userClass,
  companie: companieClass,
  companieRole: 'ADMIN',
  showSetupGuide: true,
  isSelectedForReview: false,

  showNoDataPageHome: true,
  showNoDataPagePaymentSource: true,
  showNoDataPageTeam: true,
  showNoDataPageIssuedCard: true,
  showNoDataPageSubscription: true,
  showNoDataPageInvoice: true,

  isInvitationApproved: false,
  sendEmailInvoiceSuccessful: true,
  sendEmailMyInvoiceSuccessful: true,

  sendSlackInvoiceSuccessful: true,
  sendSlackMyInvoiceSuccessful: true,
  isDeleted: false,
  lastDateInvitationSent: new Date(),
  createdAt: new Date(),
  permissions: [],
}
