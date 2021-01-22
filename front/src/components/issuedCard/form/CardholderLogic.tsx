import React from 'react'
// import UpdatePhone from './UpdatePhone'
import CardholderForm from './CardholderForm'
import IssuedCardAddress from '../single/IssuedCardAddress'
import Button from '@material-ui/core/Button'
import { IssuedCard } from '../IssuedCard.type'
import Grid from '@material-ui/core/Grid'

type State = {
  isEditMode: boolean
}

type Props = {
  canCreateCard: boolean
  issuedCard: IssuedCard
}

class CardholderLogic extends React.Component<Props, State> {
  state = {
    isEditMode: false,
  }

  render() {
    const isStripeDisabled =
      this.props.issuedCard.issuedCardStripe.cardholder &&
      this.props.issuedCard.issuedCardStripe.cardholder.requirements &&
      this.props.issuedCard.issuedCardStripe.cardholder.requirements.disabled_reason
        ? true
        : false

    return (
      <>
        <>
          <Grid container>
            <Grid item xs={6} sm={6} className="">
              <h3>{`NachoCard details`}</h3>
            </Grid>
            <Grid item xs={6} sm={6} className="tar">
              {!this.state.isEditMode && (
                <>
                  {this.props.canCreateCard && (
                    <Button
                      id="editCardHolderButton"
                      color={'primary'}
                      variant="outlined"
                      size="small"
                      onClick={() => this.setState({ isEditMode: true })}>
                      {`Edit`}
                    </Button>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          {this.state.isEditMode ? (
            <div className="">
              <CardholderForm
                isStripeDisabled={isStripeDisabled}
                onCancel={() => this.setState({ isEditMode: false })}
                onUpdate={() => this.setState({ isEditMode: false })}
                issuedCard={this.props.issuedCard}
              />
            </div>
          ) : (
            <IssuedCardAddress isStripeDisabled={isStripeDisabled} issuedCard={this.props.issuedCard} />
          )}
        </>
      </>
    )
  }
}

export default CardholderLogic
