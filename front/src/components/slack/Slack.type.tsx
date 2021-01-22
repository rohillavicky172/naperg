import { Companie } from '../Companie/Companie.type'
import { User } from '../user/User.type'

export interface SlackNode {
  node: Slack
}
export interface Slack {
  id: string
  createdAt: Date
  user?: User
  companie?: Companie
  access_token: string
  team_name: string
  authed_user_id: string
}
