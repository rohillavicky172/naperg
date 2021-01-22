
import React from 'react'
import { flowRight as compose } from 'lodash'
import { withApollo } from 'react-apollo'
import { Client } from '../../../Client.type'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'
import { IssuedCard } from '../../IssuedCard.type'
import utils from '../../../utils'
import { withRouter } from 'react-router'
import IssuedCardFormLimitPerTransaction from '../../form/IssuedCardFormLimitPerTransaction'

type State = {
  // showAuthorizationTypeForm: boolean,
  // showManageBudget: boolean,
  // showManageVendor: boolean,
  editTitles: boolean
}

type Props = {
  client: Client,
  issuedCard: IssuedCard,
  canCreateCard: boolean,
  showEditButton: boolean
}

class IssuedCardLimitPerTransactionSection extends React.Component<Props, State> {
  state = {
    editTitles: false
  }

  render() {
    // console.log(this.props.issuedCard)
    return (
      <>
        <Grid container>
          <Grid item xs={12} md={6} className="">
            <h3>{`Limit per transaction (admin)`}</h3>
          </Grid>
          {this.state.editTitles ? (
            <Grid item xs={12} className="">
              <IssuedCardFormLimitPerTransaction
                showDescription={true}
                showIssuedCardCode={true}
                onUpdated={() => {
                  this.props.client.resetStore()
                  this.setState({ editTitles: false })
                }}
                onCancel={() => this.setState({ editTitles: false })}
                issuedCard={this.props.issuedCard}
              />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} md={6} className="tar marginAuto">
                <>
                  {this.props.showEditButton && (
                    <>
                      {this.props.canCreateCard && (
                        <Button
                          variant="outlined"
                          color={'primary'}
                          onClick={() => this.setState({ editTitles: !this.state.editTitles })}>{`Edit`}</Button>
                      )}
                    </>
                  )}
                </>
              </Grid>
              <div style={{ height: '40px' }} />
              <Grid container>
                <Grid item xs={12} md={6} className="">
                  <Grid container>
                    <Grid item xs={6} md={6} className="">
                      {`Max. Transaction Size:`}
                    </Grid>
                    <Grid item xs={12} md={6} className="">
                      {utils.priceFormated(this.props.issuedCard.limitPerTransaction, 'usd')}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </>
    )
  }
}

export default compose(
  withContext,
  withApollo,
  withRouter
)(IssuedCardLimitPerTransactionSection)
