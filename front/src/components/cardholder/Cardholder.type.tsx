import { User, userClass } from '../user/User.type'
// import { Invoice } from '../invoice/Invoice.type'
// import { IssuedCard } from '../issuedCard/IssuedCard.type'
// import { Balance } from '../balance/Balance.type'
// import { Subscription } from '../subscription/Subscription.type'
import { Companie, companieClass } from '../companie/Companie.type'
// import { Product } from '../product/Product.type'
// import { Source } from '../source/Source.type'
// import { AuthDevice } from '../authDevice/AuthDevice.type'
import { IssuedCard, CardholderStripe, cardholderStripeClass } from '../issuedCard/IssuedCard.type'

export interface Cardholder {
  id: string
  name: string
  user: User
  issuedCards: IssuedCard[]

  companie: Companie
  stripe_issuedCardHolder_id: string
  cardholderStripe: CardholderStripe
}

export const cardHolderClass: Cardholder = {
  id: '',
  name: '',
  user: userClass,
  issuedCards: [],
  companie: companieClass,
  stripe_issuedCardHolder_id: '',
  cardholderStripe: cardholderStripeClass,
}
