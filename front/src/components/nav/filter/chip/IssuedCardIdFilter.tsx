import React from 'react'
import { History } from '../../../History.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import IssuedCardIdFilterQuery from './IssuedCardIdFilterQuery'
const queryString = require('query-string')

type State = {
  currency: string
}

type Props = {
  showCurrency: boolean
  history: History
  location: Location
  currenciesQuery: any
}

class IssuedCardIdFilter extends React.Component<Props, State> {
  render() {
    const issuedCardId = queryString.parse(this.props.location.search).issuedCardId

    if (!issuedCardId) {
      return null
    }
    return (
      <>
        <IssuedCardIdFilterQuery
          variables={{
            where: {
              id: issuedCardId
            }
          }}
        />
      </>
    )
  }
}

export default compose(withRouter)(IssuedCardIdFilter)
