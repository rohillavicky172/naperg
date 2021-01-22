import React from 'react'
import { flowRight as compose } from 'lodash'
// import { withApollo } from 'react-apollo'
// import { Client } from '../../../Client.type'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { withContext } from '../../../withContext'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context.type'
import { IssuedCard } from '../../IssuedCard.type'
import { withRouter } from 'react-router'
import DateComponent from '../../../nav/DateComponent'
import SpoofUser from '../../../user/single/action/spoofUser/SpoofUser'
import ApproveUpdateIssuedCard from '../../action/ApproveUpdateIssuedCard'
// import Button from '@material-ui/core/Button'
// import IssuedCardForm from '../../form/IssuedCardForm'
// import HelpNotice from '../notice/HelpNotice'

type State = {
  editTitles: boolean
}

type Props = {
  // client: Client,
  context: Context
  issuedCard: IssuedCard
  // location: Location,
  canCreateCard: boolean
  showEditButton: boolean
}

class IssuedCardApprovedSection extends React.Component<Props, State> {
  state = {
    // showAuthorizationTypeForm: false,
    // showManageVendor: false,
    // showManageBudget: false,
    editTitles: false,
  }

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={12} md={6} className="">
            <h3>{`NachoCard Request`}</h3>
          </Grid>

          <Grid container>
            <Grid item xs={12} md={12} className="">
              {this.props.issuedCard.createdBy && (
                <>
                  {'Requested by '}
                  <Link className="link" to={'/user/' + this.props.issuedCard.createdBy.id}>
                    {this.props.issuedCard.createdBy.firstName} {this.props.issuedCard.createdBy.lastName}{' '}
                    <SpoofUser user={this.props.issuedCard.createdBy} />
                  </Link>
                  {this.props.issuedCard.createdAt && (
                    <>
                      {' on '}
                      <DateComponent date={this.props.issuedCard.createdAt} />
                    </>
                  )}{' '}
                </>
              )}
              <br />
              {this.props.issuedCard.statusRequested !== 'PENDING' && (
                <>
                  {this.props.issuedCard.statusRequested}
                  {this.props.issuedCard.approvedBy && (
                    <>
                      {' by '}
                      <Link className="link" to={'/user/' + this.props.issuedCard.approvedBy.id}>
                        {this.props.issuedCard.approvedBy.firstName} {this.props.issuedCard.approvedBy.lastName}{' '}
                        <SpoofUser user={this.props.issuedCard.approvedBy} />
                      </Link>
                    </>
                  )}
                  {this.props.issuedCard.dateApproved && (
                    <>
                      {' on '}
                      <DateComponent date={this.props.issuedCard.dateApproved} />
                    </>
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} md={12} className="">
              <div style={{ height: '10px' }} />
            </Grid>
            <Grid item xs={12} md={12} className="">
              {(this.props.issuedCard.statusRequested === 'APPROVED' || this.props.issuedCard.statusRequested === 'PENDING') && (
                <ApproveUpdateIssuedCard statusRequested={'DECLINED'} issuedCard={this.props.issuedCard} />
              )}{' '}
              {(this.props.issuedCard.statusRequested === 'DECLINED' || this.props.issuedCard.statusRequested === 'PENDING') && (
                <ApproveUpdateIssuedCard statusRequested={'APPROVED'} issuedCard={this.props.issuedCard} />
              )}
              {this.props.context.me.role === 'ADMIN' && (
                <div>
                  <div style={{ height: '20px' }} />
                  <Divider />
                  <div style={{ height: '20px' }} />
                  Admin
                  <ApproveUpdateIssuedCard statusRequested={'PENDING'} issuedCard={this.props.issuedCard} />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default compose(
  withContext,

  withRouter
)(IssuedCardApprovedSection)
