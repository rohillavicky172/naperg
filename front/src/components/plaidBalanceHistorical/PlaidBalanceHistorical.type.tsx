
import { Companie } from '../companie/Companie.type'
import { PlaidData } from '../plaidData/PlaidData.type'

export interface PlaidBalanceHistorical {
  id: string;
  createdAt: Date;
  available: number;
  current: number;
  name: string;
  mask: string;
  official_name: string;
  subtype: string;
  type: string;
  iso_currency_code: string;
  companie: Companie;
  plaidData: PlaidData;
  // publicTokenPlaid: string;
  // accessToken: string;
  // name: string;
  // mask: string;
  // accountIdPlaid: string;
  // companie: Companie;
  // verificationStatus: string;
  // publicTokenFresh: string;
  // institution: string;
  // stripeSourceId: string;
  // subType: string;
  // publicTokenVerifyMicroD: string;
  // metaDataPlaidBalances: string;
  // metaDataPlaidTransactions: string;
  // metaDataPlaidIdentity: string;
  // users: User[],
  // ip: string,
  // timeZone: string,
  // apiAnswer: string,
  // apiKey: string,
  // apiHost: string,
  // apiCallType: string,
  // apiEndPointName: string,
  // apiCallId: string,
  // apiRequest: string
}
