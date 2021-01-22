import React from 'react'
import { flowRight as compose } from 'lodash'
import { withApollo } from 'react-apollo'
import { Client } from '../../../Client.type'
import { Grid } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { IssuedCard } from '../../IssuedCard.type'
import { withRouter } from 'react-router'
import IssuedCardForm from '../../form/IssuedCardForm'
import DateComponent from '../../../nav/DateComponent'
import HelpNotice from '../notice/HelpNotice'
import UseWindowDimensions from '../../../UseWindowDimensions'

type State = {
  isEditMode: boolean
}

type Props = {
  client: Client
  context: Context
  issuedCard: IssuedCard
  // location: Location,
  canCreateCard: boolean
  showEditButton: boolean
}

class IssuedCardDescriptionSection extends React.Component<Props, State> {
  state = {
    isEditMode: false,
  }

  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <Grid container>
          <Grid item xs={12} md={6} className="">
            <h3>{`Description`}</h3>
          </Grid>
          <Grid item xs={12} md={6} className="tar">
            {!this.state.isEditMode && (
              <>
                {this.props.showEditButton && (
                  <>
                    {this.props.canCreateCard && (
                      <Button
                        variant="outlined"
                        color={'primary'}
                        onClick={() => this.setState({ isEditMode: !this.state.isEditMode })}>{`Edit`}</Button>
                    )}
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
        <Grid container>
          {this.state.isEditMode && (
            <Grid item xs={12} className="">
              <IssuedCardForm
                onUpdated={() => this.setState({ isEditMode: false })}
                onCancel={() => this.setState({ isEditMode: false })}
                issuedCard={this.props.issuedCard}
              />
            </Grid>
          )}
          {!this.state.isEditMode && (
            <>
              <div style={{ height: '40px' }} />

              <Grid container>
                <Grid item xs={12} className="">
                  <div style={{ height: '10px' }} />
                </Grid>
                <Grid item xs={12} md={3} className="">
                  {`Created:`}
                </Grid>
                <Grid item xs={12} md={9}>
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  <DateComponent date={this.props.issuedCard.createdAt} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12} md={3} className="">
                  {`Name of card:`}
                </Grid>
                <Grid item xs={12} md={9}>
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {this.props.issuedCard.name}
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={3} className="">
                  {`Note:`} <HelpNotice text={`This note is for your own reference and can be as long as you like.`} />
                </Grid>
                <Grid item xs={12} md={9}>
                  {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                  {this.props.issuedCard.description}
                </Grid>
              </Grid>

              {this.props.issuedCard.companie.isTrustedPayment && (
                <Grid container>
                  <Grid item xs={12} md={3} className="">
                    {`Reference code:`}{' '}
                    <HelpNotice
                      text={`
                              Reference code is up to 4 characters long, and accepts only digits 0-9 and letters a-z and A-Z.  
                              It will show up in your bank/card statement for each transaction and help you organize your spend in your accounting software.`}
                    />
                  </Grid>
                  <Grid item xs={12} md={9}>
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                    {this.props.issuedCard.issuedCardCode}
                  </Grid>
                </Grid>
              )}

              {this.props.context.me.role === 'ADMIN' && (
                <Grid container>
                  <Grid item xs={12} md={3} className="">
                    {`Notifications (OLD Admin only):`}
                  </Grid>
                  <Grid item xs={12} md={9}>
                    {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
                    {this.props.issuedCard.notification ? 'On' : 'Off'}
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </>
    )
  }
}

export default compose(withContext, withApollo, withRouter)(IssuedCardDescriptionSection)
