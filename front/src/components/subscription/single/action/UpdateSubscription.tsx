import React from 'react'
import { UPDATE_SUBSCRIPTION_MUTATION } from '../../GraphQL'
import Button from '@material-ui/core/Button'
import { DateTimePicker } from '@material-ui/pickers'
import { useMutation } from '@apollo/react-hooks'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Subscription } from '../../Subscription.type'

type Props = {
  subscription: Subscription
}

const UpdateSubscription = (props: Props) => {
  const [subscription, setSubscription] = React.useState(props.subscription)

  const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION_MUTATION)

  const updateSubscriptionF = async () => {
    await updateSubscription({
      variables: {
        data: {
          lastInvoiceDate: subscription.lastInvoiceDate,
          dateCreation: subscription.dateCreation,
        },
        where: {
          id: subscription.id,
        },
      },
    })
  }

  return (
    <>
      <h4>Update Subscription Dates</h4>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            className=""
            id={'lastInvoiceDate'}
            autoOk
            label={'lastInvoiceDate'}
            value={subscription.lastInvoiceDate}
            onChange={(lastInvoiceDate: Date) =>
              setSubscription({
                ...subscription,
                lastInvoiceDate,
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            className=""
            id={'dateCreation'}
            autoOk
            label={'dateCreation'}
            value={subscription.dateCreation}
            onChange={(dateCreation: Date) =>
              setSubscription({
                ...subscription,
                dateCreation,
              })
            }
          />
        </MuiPickersUtilsProvider>
      </div>
      <Button color={'primary'} variant={'outlined'} onClick={() => updateSubscriptionF()}>
        Update
      </Button>
    </>
  )
}

export default UpdateSubscription
