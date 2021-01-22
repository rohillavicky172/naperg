import React from 'react'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'
import PlaidDatasQueryAdmin from './PlaidDatasQueryAdmin'
import Filters from '../../nav/filter/Filters'
const queryString = require('query-string')

type State = {
  first: number
}

type Props = {
  context: Context
  location: Location
  client: any
  history: any
  plaidDatasQuery: any
}

class PlaidDatasAdminPage extends React.Component<Props, State> {
  state = {
    first: 10,
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const page = parsed.page ? parsed.page : 1
    // const id = parsed.id
    const plaidDataId = parsed.plaidDataId

    const verificationStatus = typeof parsed.issuedCardType === 'string' ? [parsed.verificationStatus] : parsed.verificationStatus

    const isDefaultSource = parsed.isDefaultSource === 'TRUE' ? true : parsed.isDefaultSource === 'FALSE' ? false : undefined
    const resetLogin = parsed.resetLogin === 'TRUE' ? true : parsed.resetLogin === 'FALSE' ? false : undefined

    const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
    const companieId = parsed.companieId
    const testMode = this.props.context.testMode
    // console.log(testMode)
    return (
      <>
        <div className="paperOut">
          <h2>PLAID</h2>
          <Filters showId showVerificationStatus showResetLogin showIsDefaultSource showOrderByCreated showCompanieId />

          <PlaidDatasQueryAdmin
            page={page}
            variables={{
              first: this.state.first,
              skip: (page - 1) * this.state.first,
              orderBy: orderBy,
              where: {
                id: plaidDataId,
                resetLogin,
                verificationStatus_in: verificationStatus,
                companie: {
                  id: companieId,
                },
                source:
                  isDefaultSource !== undefined
                    ? {
                        isDefaultSource,
                      }
                    : undefined,
                testMode,
              },
            }}
          />
        </div>
      </>
    )
  }
}

export default withContext(PlaidDatasAdminPage)
