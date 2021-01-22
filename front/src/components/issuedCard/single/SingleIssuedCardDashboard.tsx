
import React from 'react'
import Grid from '@material-ui/core/Grid'
// import Icon from '@material-ui/core/Icon'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Companie } from '../../companie/Companie.type'
import { IssuedCard } from '../IssuedCard.type'
import '../Style.css'
import IssuedCardDesignSmall from './IssuedCardDesignSmall'
// import utils from '../../utils'
// import DateComponent from '../../nav/DateComponent'
// import PaymentMethodFormat from '../../card/single/PaymentMethodFormat'
// import CopyToClipboard from './CopyToClipboard'

type State = {}

type Props = {
  context: Context,
  companie: Companie,
  issuedCard: IssuedCard
}

class SingleIssuedCardDashboard extends React.Component<Props, State> {
  render() {
    return (
      <div className="">
        <Grid container>
          <Grid item xs={4} sm={4} className="marginAuto">
            <IssuedCardDesignSmall issuedCard={this.props.issuedCard} />
          </Grid>
          <Grid item xs={4} sm={4} className="marginAuto">
            {`"${this.props.issuedCard.name}"`}
          </Grid>
          {!this.props.companie.isPersonal && (
            <Grid item xs={4} sm={4} className="marginAuto">
              {this.props.issuedCard.user.firstName} {this.props.issuedCard.user.lastName}
            </Grid>
          )}
        </Grid>
      </div>
    )
  }
}

export default withContext(SingleIssuedCardDashboard)
