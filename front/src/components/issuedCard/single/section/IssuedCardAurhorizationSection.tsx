import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import utils from '../../../utils'
import { AppContext } from '../../../AppContext'
import UpdateIssuedCard from '../../action/UpdateIssuedCard'
import { IssuedCard } from '../../IssuedCard.type'
import MappingAuthorizedAmountUnit from '../../single/authorization/MappingAuthorizedAmountUnit'
import AuthorizationForm from '../../single/authorization/AuthorizationForm'
import CustomTooltip from '../../../nav/customTooltip/CustomTooltip'
import { Context } from '../../../Context.type'

type Props = {
  canCreateCard: boolean
  issuedCard: IssuedCard
}

const IssuedCardAurhorizationSection = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const [issuedCard, setIssuedCard] = React.useState(props.issuedCard)
  const [isEditMode, setIsEditMode] = React.useState(false)

  const isFormValid = () => {
    if (issuedCard.authorizedAmountUnit === 'NONE') {
      return true
    } else {
      if (issuedCard.authorizedAmount > 0) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <Grid container>
        <Grid item xs={6} md={6} className="">
          <h3>{`Card restrictions`}</h3>
        </Grid>

        <Grid item xs={6} md={6} className="tar">
          {!isEditMode && (
            <>
              {props.canCreateCard && (
                <CustomTooltip
                  placementDesktop={'left-start'}
                  type={'spendingLimitIssuedCardTooltip'}
                  userId={context.me.id}
                  text={`Change the card's Spending Limit`}>
                  <Button
                    variant="outlined"
                    color={'primary'}
                    id={'editCardRestrictions'}
                    onClick={() => setIsEditMode(!isEditMode)}>{`Edit`}</Button>
                </CustomTooltip>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <Grid container>
        {isEditMode ? (
          <Grid item xs={12} className="">
            <>
              <AuthorizationForm issuedCard={issuedCard} onUpdate={(issuedCard) => setIssuedCard(issuedCard)} />
              <div style={{ height: '10px' }} />
              <UpdateIssuedCard
                onUpdated={() => setIsEditMode(false)}
                disabled={!isFormValid()}
                titleButton="Save"
                product={null}
                onCancel={() => setIsEditMode(false)}
                issuedCard={issuedCard}
              />
            </>
          </Grid>
        ) : (
          <>
            <Grid container>
              <Grid item xs={12} md={6} className="">
                <Grid container>
                  <Grid item xs={12} className="">
                    <div style={{ height: '20px' }} />
                  </Grid>
                  {props.issuedCard.authorizedAmountUnit === 'NONE' && (
                    <>
                      <Grid item xs={6} md={6} className="">
                        {`Spending limit:`}
                      </Grid>
                      <Grid item xs={6} md={6} className="">
                        None
                      </Grid>
                    </>
                  )}
                  {props.issuedCard.authorizedAmountUnit !== 'NONE' && (
                    <>
                      <Grid item xs={6} md={6}>
                        {`Spending limit:`}
                      </Grid>
                      <Grid item xs={6} md={6}>
                        {utils.priceFormated(Number(props.issuedCard.authorizedAmount), 'usd')}{' '}
                        <MappingAuthorizedAmountUnit authorizedAmountUnit={props.issuedCard.authorizedAmountUnit} />
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <LinearProgress
                          variant="determinate"
                          value={(props.issuedCard.alreadySpent / Number(props.issuedCard.authorizedAmount)) * 100}
                        />
                      </Grid>

                      <Grid item xs={6} md={6}>
                        {`Already spent:`}
                      </Grid>
                      <Grid item xs={6} md={6}>
                        {utils.priceFormated(props.issuedCard.alreadySpent, 'usd')}
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}

export default IssuedCardAurhorizationSection
