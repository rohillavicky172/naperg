
import { Source } from '../source/Source.type'

export interface Sources {
  data: Source[]
}

export interface UserStripe {
  default_source: string | null
  sources: Sources
}

export const SourcesClass: Sources = {
  data: []
}

export const userStripeClass: UserStripe = {
  default_source: null,
  sources: SourcesClass
}
