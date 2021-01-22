import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
import { UserStripe, userStripeClass } from '../userStripe/UserStripe.type'
import { IssuedCard } from '../issuedCard/IssuedCard.type'
import { Subscription } from '../subscription/Subscription.type'
import { Invoice } from '../invoice/Invoice.type'
import { Product } from '../product/Product.type'
import { Source } from '../source/Source.type'
import { Balance } from '../balance/Balance.type'
import { SellerBalance } from '../sellerBalance/SellerBalance.type'

export interface Companie {
  id: string
  name: string
  createdAt: Date
  dateStatusApplication?: Date
  balances: Balance[]
  sellerBalances: SellerBalance[]
  leadershipPhone: string
  leadershipPhoneCode: string
  // dateSubmissionOwnerOfCompanieVerification?: Date
  leadershipEmail: string
  leadershipTitle: string
  typeCreation: string
  nameFile: string
  dayCreatedAt: number
  statusApplication: 'SUBMITED' | 'APPROVED' | 'NOT_APPROVED'
  // ownerOfCompanieVerificationUser?: User

  leadershipFirstName: string
  registrationNumber: string
  registeredBusinessName: string
  typeBusinessStructure: string
  leadershipLastName: string
  privateData: string
  stripe_cus_test_id: string
  ownedProducts: Product[]
  website: string
  // isTrusted: boolean;
  invoices: Invoice[]
  typeUploadNameFile: 'UPLOAD' | 'NONE'
  // ownerOfCompanieVerificationStatus: 'REQUIRED' | 'SUBMITED' | 'APPROVED' | 'NOT_REQUIRED'
  subscriptions: Subscription[]
  sources: Source[]
  isPersonal: boolean
  // canUseCreditDebitCard: boolean,
  hideDebitCredit: boolean
  hideAddBank: boolean
  addStripeBank: boolean
  addPaypal: boolean

  deletedLogically: boolean
  isOnboardingMembersDone: boolean
  canManageSellerSubscriptionManagement: boolean
  tierRecuringPlatformFees: 'FREE' | 'TRIAL_1_MONTH'
  canCreatePhysicalIssuedCard: boolean
  isOnboardingIssuedCardDone: boolean
  stripe_cus_id: string
  isOnboardingBillingAddressDone: boolean
  isVerified: boolean
  isOnboardingIssuedCardsDone: boolean
  isOnboardingBalanceDone: boolean
  onboardProcessDone: boolean
  // isBuyer: boolean
  typeCompanie: 'BUYER' | 'SELLER' | 'AFFILIATE' | 'NN_ANALYST'
  issuedCards: IssuedCard[]
  hideCashOut: boolean
  disableCrossBorderFee: boolean
  disableForeignExchangeFee: boolean
  isTrustedPayment: boolean
  maxTransactionValue: number
  limitPerTransactionForCardSource: number
  incomingPaymentFeeTopUp: number

  incomingPaymentFeeACHPercentage: number
  incomingPaymentFeeCardPercentage: number

  valueSpent: number
  userRoleCompanies: UserRoleCompanie[]
  userStripe: UserStripe
}

export const companieClass: Companie = {
  id: '',
  dayCreatedAt: 1,
  // ownerOfCompanieVerificationStatus: 'NOT_REQUIRED',
  name: '',
  createdAt: new Date(),
  statusApplication: 'NOT_APPROVED',
  balances: [],
  privateData: '',
  sellerBalances: [],
  registeredBusinessName: '',
  website: '',
  typeBusinessStructure: '',
  nameFile: '',
  typeUploadNameFile: 'NONE',
  sources: [],
  registrationNumber: '',
  stripe_cus_test_id: '',
  ownedProducts: [],
  typeCreation: 'USER_CREATION',
  leadershipPhone: '',
  leadershipPhoneCode: '',
  leadershipEmail: '',
  leadershipTitle: '',
  leadershipFirstName: '',
  leadershipLastName: '',
  limitPerTransactionForCardSource: 0,
  canCreatePhysicalIssuedCard: false,
  tierRecuringPlatformFees: 'TRIAL_1_MONTH',
  canManageSellerSubscriptionManagement: false,
  // isTrusted: false,
  issuedCards: [],
  subscriptions: [],
  isPersonal: false,
  stripe_cus_id: '',
  // canUseCreditDebitCard: boolean,
  hideDebitCredit: false,
  hideAddBank: false,
  addStripeBank: false,
  addPaypal: false,
  deletedLogically: false,
  isOnboardingBalanceDone: false,
  isOnboardingBillingAddressDone: false,
  isVerified: true,
  isOnboardingIssuedCardDone: false,
  isOnboardingIssuedCardsDone: false,
  isOnboardingMembersDone: false,
  onboardProcessDone: false,
  // isBuyer: true,
  typeCompanie: 'BUYER',
  invoices: [],
  hideCashOut: false,
  disableCrossBorderFee: false,
  disableForeignExchangeFee: false,
  isTrustedPayment: false,
  maxTransactionValue: 0,
  incomingPaymentFeeTopUp: 0,
  incomingPaymentFeeACHPercentage: 0,
  incomingPaymentFeeCardPercentage: 0,

  valueSpent: 0,
  userRoleCompanies: [],
  userStripe: userStripeClass,
}
