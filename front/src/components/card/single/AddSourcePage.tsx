import React from 'react'
import AddCard from './AddCard'
import Paper from '@material-ui/core/Paper'
import AddBankMicroDeposit from './AddBankMicroDeposit'
import { Elements, StripeProvider } from 'react-stripe-elements'
import { STRIPE } from '../../../config/config'
import { UserStripe } from '../../userStripe/UserStripe.type'
import { Context } from '../../Context.type'
import { AppContext } from '../../AppContext'
import { useParams } from 'react-router'
import { ParamTypes } from '../../ParamTypes.type'
import { Location } from '../../Location.type'
import { History } from '../../History.type'
import { useHistory, useLocation } from 'react-router-dom'
import TitlePage from '../../nav/layout/titlePage/TitlePage'
const queryString = require('query-string')

type Props = {
  buttonText: string
  hideCancelButton: boolean
  userStripe: UserStripe
  userId: string
  context: Context
  history: History
  location: Location
}

// class AddSourcePage extends React.Component<Props, State> {
const AddSourcePage = (props: Props) => {
  const location = useLocation()
  const history = useHistory()
  const { context }: { context: Context } = React.useContext(AppContext)
  const onCancel = () => {
    history.goBack()
  }

  let parsed = queryString.parse(location.search)
  const testMode = context.testMode
  const paymentMethod = parsed.paymentMethod
  const { companieId }: ParamTypes = useParams<ParamTypes>()

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <TitlePage userId={''} type="companie" companieId={companieId} objectName="Add source" />

          <div className="responsiveMargin2">
            <div className="sourceContainer">
              {paymentMethod === 'card' && (
                <StripeProvider apiKey={testMode ? STRIPE.STRIPE_KEY_PK_TEST : STRIPE.STRIPE_KEY_PK_LIVE}>
                  <Elements>
                    <AddCard
                      companieId={companieId}
                      onCancel={onCancel}
                      userId={props.userId}
                      hideCancelButton={props.hideCancelButton}
                      buttonText={props.buttonText}
                    />
                  </Elements>
                </StripeProvider>
              )}
              {paymentMethod === 'bank' && (
                <StripeProvider apiKey={testMode ? STRIPE.STRIPE_KEY_PK_TEST : STRIPE.STRIPE_KEY_PK_LIVE}>
                  <Elements>
                    <AddBankMicroDeposit
                      companieId={companieId}
                      onCancel={onCancel}
                      userId={props.userId}
                      hideCancelButton={props.hideCancelButton}
                      buttonText={props.buttonText}
                    />
                  </Elements>
                </StripeProvider>
              )}
            </div>
          </div>
        </Paper>
      </div>
      {/* )} */}
    </>
  )
}

export default AddSourcePage
