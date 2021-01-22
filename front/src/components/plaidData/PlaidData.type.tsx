import { Companie } from '../companie/Companie.type'
import { Source } from '../source/Source.type'

export interface Institution {
  name: string
}

export interface PlaidAccount {
  id: string
  subtype: string
  verification_status: string
  type: string
  mask: string
  name: string
}
export interface Metadata {
  institution: Institution
  accounts: PlaidAccount[]
}
export const institutionClass: Institution = {
  name: '',
}

export const metadataClass: Metadata = {
  institution: institutionClass,
  accounts: [],
}

// export const checkingAccountClass: CheckingAccount = {
//   id: '',
//   name: '',
//   mask: '',
// }
// export interface CheckingAccount {
//   id: string
//   name: string
//   mask: string
// }

export interface PlaidData {
  id: string
  createdAt: Date
  dateBalanceRequested: Date
  resetLogin: Boolean

  type: string
  subtype: string
  bankAccountToken: string
  metaDataPlaid: string
  publicTokenPlaid: string
  accessToken: string
  name: string
  mask: string
  accountIdPlaid: string
  companie: Companie
  verificationStatus: string
  publicTokenFresh: string
  institution: string
  stripeSourceId: string
  source: Source
  subType: string
  publicTokenVerifyMicroD: string
  metaDataPlaidBalances: string
  metaDataPlaidTransactions: string
  metaDataPlaidIdentity: string
  error: string
  // users: User[],
  // ip: string,
  // plaidDatain: string,
  // timeZone: string,
  // apiAnswer: string,
  // apiKey: string,
  // apiHost: string,
  // apiCallType: string,
  // apiEndPointName: string,
  // apiCallId: string,
  // apiRequest: string
}
