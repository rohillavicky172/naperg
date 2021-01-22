import { IssuedCard } from './issuedCard/IssuedCard.type'
import { Product } from './product/Product.type'
import { Companie } from './companie/Companie.type'
// import { Authorization } from './authorization/Authorization.type'
import { User } from './user/User.type'

export interface GraphQLErrors {
  message: string
}

export interface Error {
  graphQLErrors: GraphQLErrors[]
}

export interface Query {
  error: Error
  loading: boolean
  issuedCard: IssuedCard
  product: Product
  user: User
  companie: Companie
  me: User
  // authorizations: Authorization[];
  sourcesConnection: any
}
