import { User, userClass } from '../user/User.type'
import { Campaign, campaignClass } from '../campaign/Campaign.type'
// import { Product } from '../product/Product.type'

export interface CampaignHistoric {
  id: string
  createdAt: Date
  actionUnsubscribe: boolean
  dateActionUnsubscribe?: Date
  user: User
  campaign: Campaign
}
export const campaignHistoricClass: CampaignHistoric = {
  id: '',
  createdAt: new Date(),
  campaign: campaignClass,
  actionUnsubscribe: false,
  user: userClass,
}
