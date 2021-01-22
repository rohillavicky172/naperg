import React from 'react'
import { flowRight as compose } from 'lodash'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Location } from '../../../Location.type'
import { IssuedCard } from '../../IssuedCard.type'
import { withRouter } from 'react-router'
import IssuedCardDateForm from './IssuedCardDateForm'
import DateComponent from '../../../nav/DateComponent'
import CustomTooltip from '../../../nav/customTooltip/CustomTooltip'
// import WarningNoBalanceIssuedCard from './notice/WarningNoBalanceIssuedCard'
// import Divider from '@material-ui/core/Divider'
// import CompanieOnboardingNotice from '../../../companie/single/CompanieOnboardingNotice'
// import utils from '../../../utils'
// import AuthorizationTypeForm from '../form/AuthorizationTypeForm'
// import LogsQueryLight from '../../../log/list/LogsQueryLight'
// import Authorizations from '../../../authorization/list/Authorizations'
// import IssuedCardFirstSection from './IssuedCardFirstSection'
// import HelpNotice from '../notice/HelpNotice'
// import StatusIssuedCard from './StatusIssuedCard'

type State = {
  showAuthorizationTypeForm: boolean
  showManageBudget: boolean
  showManageVendor: boolean
  editTitles: boolean
}

type Props = {
  context: Context
  issuedCard: IssuedCard
  location: Location
}

class IssuedCardDateManagement extends React.Component<Props, State> {
  state = {
    // showAuthorizationTypeForm: queryString.parse(this.props.location.search).step === 'init' ? true : false,
    showAuthorizationTypeForm: false,
    showManageVendor: false,
    showManageBudget: false,
    editTitles: false,
  }

  onUpdateAuthorizationType = (issuedCard) => {
    this.setState({
      showAuthorizationTypeForm: false,
      showManageBudget: issuedCard.authorizationType === 'CARD_LEVEL' ? true : false,
      // showManageVendor: issuedCard.authorizationType === 'CARD_PRODUCT_LEVEL' ? true : false
    })
  }

  render() {
    // let parsed = queryString.parse(this.props.location.search)
    // console.log(parsed)
    // console.log(this.props.issuedCard)

    // let step = queryString.parse(this.props.location.search).step
    const isMyCard = this.props.context.me.id === this.props.issuedCard.user.id

    const canCreateCard =
      (this.props.context.userRoleCompanie.permissions.includes('canCreateMyIssuedCards') && isMyCard) ||
      (this.props.context.userRoleCompanie.permissions.includes('canCreateIssuedCardsInCompanie') && !isMyCard)
        ? true
        : false

    return (
      <div>
        <Grid container>
          <Grid item xs={6} md={6} className="">
            <h3>{`Date restriction`}</h3>
          </Grid>

          <Grid item xs={6} md={6} className="tar">
            {!this.state.editTitles && (
              <>
                {canCreateCard && (
                  <CustomTooltip
                    placementDesktop={'left-start'}
                    type={'expiryDateIssuedCardTooltip'}
                    userId={this.props.context.me.id}
                    text={`Set your own card expiry date`}>
                    <Button
                      variant="outlined"
                      color={'primary'}
                      onClick={() => this.setState({ editTitles: !this.state.editTitles })}>{`Edit`}</Button>
                  </CustomTooltip>
                )}
              </>
            )}
          </Grid>

          {this.state.editTitles ? (
            <Grid item xs={12} className="">
              <IssuedCardDateForm
                onUpdate={() => this.setState({ editTitles: false })}
                onCancel={() => this.setState({ editTitles: false })}
                issuedCard={this.props.issuedCard}
              />
            </Grid>
          ) : (
            <>
              <div style={{ height: '40px' }} />

              <Grid container>
                <Grid item xs={12} md={6} className="">
                  <Grid container>
                    <Grid item xs={6} md={6} className="">
                      {`Valid From:`}
                    </Grid>
                    <Grid item xs={6} md={6} className="">
                      {this.props.issuedCard.dateValidFrom && <DateComponent date={this.props.issuedCard.dateValidFrom} />}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={6} md={6} className="">
                      {`Valid To:`}
                    </Grid>
                    <Grid item xs={6} md={6} className="">
                      {this.props.issuedCard.dateValidTo && <DateComponent date={this.props.issuedCard.dateValidTo} />}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </div>
    )
  }
}

export default compose(withContext, withRouter)(IssuedCardDateManagement)
