import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
import { Companie } from '../companie/Companie.type'

export interface UserNode {
  node: User
}
export interface User {
  id: string
  shortLastName: string
  invitedByCompanie: Companie | null
  invitedBy: User | null
  isEmailValidated: boolean
  enabled2FA: boolean
  unsubscribe: boolean
  loginAttempts: number
  createIssuedCardsTooltip: boolean

  switchAccountsTooltip: boolean
  createIssuedCardTooltip: boolean
  hubspotId: string
  inviteMembersTooltip: boolean

  verificationStatusOffSite: boolean
  verificationStatus: 'REQUIRED' | 'SUBMITED' | 'APPROVED' | 'NOT_REQUIRED' | 'NOT_APPROVED'
  verificationDateSubmission?: Date

  typeAvatar: 'NONE' | 'GRAVATAR' | 'UPLOAD' | 'DOMAIN_METADATA'
  typeUnsubscribe: 'NONE' | 'BY_USER_CLICK_UNSUBSCRIBE_EMAIL' | 'BY_ADMIN' | 'BY_HUBSPOT'
  actionIssuedCardTooltip: boolean
  spendingLimitIssuedCardTooltip: boolean
  expiryDateIssuedCardTooltip: boolean
  copyClipboardIssuedCardTooltip: boolean

  isPhoneValidated: boolean
  isTwoFactorTotpVerified: boolean
  isSuspended: boolean
  showInviteBuyer: boolean
  showInviteSeller: boolean
  isPhoneChangeRequestedPending: boolean
  isPhoneValidationRequireOverride: boolean
  isPhoneValidationRequired: boolean
  welcomePersonalizedSent: boolean
  enabled2FAPhone: boolean
  enabled2FAEmail: boolean
  enabled2FATotp: boolean
  firstName: string
  privateData: string
  name: string
  last4Social: string
  nameFile: string
  lastName: string
  language: string
  phone: string
  phoneCode: string
  phoneValidationToken: string
  phoneChangeRequested: string
  phoneCodeChangeRequested: string

  linkedInLink: string
  twitterLink: string
  facebookLink: string
  instagramLink: string
  gender: string
  signupType:
    | 'MEMBER_INVITATION_SELLER'
    | 'NEWSLETTER'
    | 'MEMBER_INVITATION'
    | 'FORM'
    | 'SELLERFORM'
    | 'ADMINFORM'
    | 'ADMINFORMSELLER'
    | 'USERFORM'
    | 'USER_FORM_SELLER'
    | 'FORM_USER_REVIEW'
    | 'AFFILIATEFORM'
    | 'FORM_SLACK'
    | 'FORM_LINK_INVITATION'
  userRoleCompanies: UserRoleCompanie[]

  updatedAtHubspot?: Date
  birthday: Date | null
  dateTotpVerified: Date
  resetPasswordRequest: Date
  createdAt: Date
  resetPasswordExpires: Date
  lastLogin: Date
  email: string
  emailChangeRequested: string
  role: string
  stripe_cus_id: string
  stripe_cus_test_id: string
  timeZone: string
}

export const userClass: User = {
  id: '',
  verificationStatus: 'REQUIRED',
  invitedByCompanie: null,
  hubspotId: '',
  shortLastName: '',
  typeAvatar: 'NONE',
  typeUnsubscribe: 'NONE',
  dateTotpVerified: new Date(),
  isPhoneValidationRequireOverride: true,
  birthday: new Date(),

  createdAt: new Date(),
  lastLogin: new Date(),
  resetPasswordExpires: new Date(),
  firstName: '',
  privateData: '',
  enabled2FA: false,
  verificationStatusOffSite: false,
  enabled2FAPhone: false,
  unsubscribe: false,
  enabled2FAEmail: false,
  enabled2FATotp: false,
  isTwoFactorTotpVerified: false,
  isPhoneValidationRequired: true,
  welcomePersonalizedSent: false,

  showInviteBuyer: false,
  showInviteSeller: false,

  createIssuedCardsTooltip: true,
  switchAccountsTooltip: true,
  createIssuedCardTooltip: true,
  inviteMembersTooltip: true,
  loginAttempts: 0,
  actionIssuedCardTooltip: true,
  spendingLimitIssuedCardTooltip: true,
  expiryDateIssuedCardTooltip: true,
  copyClipboardIssuedCardTooltip: true,

  name: '',
  role: '',
  email: '',
  last4Social: '',
  phoneCodeChangeRequested: '',
  phoneValidationToken: '',
  phoneCode: '',
  isPhoneChangeRequestedPending: false,
  phoneChangeRequested: '',
  isPhoneValidated: false,
  isSuspended: false,
  phone: '',
  linkedInLink: '',
  facebookLink: '',

  twitterLink: '',
  instagramLink: '',

  resetPasswordRequest: new Date(),
  lastName: '',
  language: '',
  nameFile: '',
  gender: '',
  emailChangeRequested: '',
  stripe_cus_id: '',
  stripe_cus_test_id: '',
  timeZone: '',
  userRoleCompanies: [],

  isEmailValidated: false,
  invitedBy: null,
  signupType: 'USERFORM',
}
