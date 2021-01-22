import React from 'react'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import Paper from '@material-ui/core/Paper'
import { Location } from '../../../Location.type'
import TitlePage from '../../../nav/layout/titlePage/TitlePage'
import { Product } from '../../../product/Product.type'
import { Addresse } from '../../../addresse/Addresse.type'
import { Companie } from '../../../companie/Companie.type'
import { User } from '../../../user/User.type'
import CreateIssuedCardFunction from './CreateIssuedCardFunction'
import NavigateButtonTypeCard from './NavigateButtonTypeCard'
import CreateIssuedCardFunctionPhysical from './CreateIssuedCardFunctionPhysical'
import { History } from '../../../History.type'
// import AccountOnHoldUserStripe from '../../../source/list/AccountOnHoldUserStripe'
import { issuedCardClass } from '../../IssuedCard.type'
// import UserName from '../../../nav/layout/titlePage/UserName'
// import CompanieName from '../../../companie/single/CompanieName'
const queryString = require('query-string')

type State = {}
type Props = {
  history: History
  context: Context
  product: Product
  companie: Companie
  userId: string
  location: Location
  addresses: Addresse[]
  user: User
}

class CreateIssuedCardLogic extends React.Component<Props, State> {
  render() {
    const parsed = queryString.parse(this.props.location.search)

    return (
      <>
        {/* <AccountOnHoldUserStripe
          companieId={this.props.companie.id}
          shwowActionButton={false}
          variables={{
            where: {
              companie: { id: this.props.companie.id },
              testMode: this.props.context.testMode,
              isDeleted: false,
              isDefaultSource: true
            }
          }}
        /> */}
        <div className="paperOut">
          <Paper className="paperIn">
            {this.props.companie.canCreatePhysicalIssuedCard && (
              <div className="tar">
                <NavigateButtonTypeCard />
              </div>
            )}

            {parsed.type === 'physical' ? (
              <>
                <TitlePage companieId={''} type="user" objectName="Physical NachoCard setup" userId={this.props.user.id} />
                {this.props.companie.canCreatePhysicalIssuedCard && (
                  <CreateIssuedCardFunctionPhysical
                    issuedCard={{ ...issuedCardClass, type: 'virtual' }}
                    companie={this.props.companie}
                    user={this.props.user}
                  />
                )}
              </>
            ) : (
              <>
                {/* <TitlePage companieId={''} type="user" objectName="NachoCard setup" userId={this.props.user.id} /> */}
                <CreateIssuedCardFunction
                  issuedCard={{ ...issuedCardClass, type: 'virtual' }}
                  companie={this.props.companie}
                  userId={this.props.user.id}
                />
              </>
            )}
          </Paper>
        </div>
      </>
    )
  }
}

export default compose(withRouter, withContext)(CreateIssuedCardLogic)
