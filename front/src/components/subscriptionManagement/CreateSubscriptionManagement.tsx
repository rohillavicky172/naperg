import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const CREATE_SUBSCRIPTION_MANAGEMENT_MUTATION = gql`
  mutation CreateSubscriptionManagement($data: SubscriptionManagementCreateInput!) {
    createSubscriptionManagement(data: $data) {
      id
    }
  }
`
type Props = {
  subscriptionId: string
  typeSubscriptionManagement: string
  onCreate: () => void
}

const CreateSubscriptionManagement = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(false)
  const [statusSubscriptionManagement, setStatusSubscriptionManagement] = React.useState('NOT_NEW_USER')
  const [createSubscriptionManagement] = useMutation(CREATE_SUBSCRIPTION_MANAGEMENT_MUTATION)

  const createSubscriptionManagementF = async () => {
    setLoading(true)
    await createSubscriptionManagement({
      variables: {
        data: {
          statusSubscriptionManagement,
          typeSubscriptionManagement: props.typeSubscriptionManagement,
          subscription: {
            connect: {
              id: props.subscriptionId,
            },
          },
        },
      },
    })
    setLoading(false)
    props.onCreate()
  }
  return (
    <>
      <div>
        <FormControl className="">
          <InputLabel htmlFor="statusSubscriptionManagement">{`statusSubscriptionManagement`}</InputLabel>
          <Select
            id="statusSubscriptionManagement"
            value={statusSubscriptionManagement}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStatusSubscriptionManagement(e.target.value)}>
            <MenuItem value={'NOT_NEW_USER'}>{`Not new user for vendor`}</MenuItem>
            <MenuItem value={'BUYER_DID_NOT_CLICK_AFFILIATE_LINK'}>{`Buyer didn't click on affiliate link`}</MenuItem>
            {context.me.role === 'ADMIN' && (
              <MenuItem value={'SOURCED_BY_VENDOR'}>{`Buyer was new user for vendor, but was sourced by vendor`}</MenuItem>
            )}
            {context.me.role === 'ADMIN' && <MenuItem value={'OTHER'}>{`Other reason not listed above`}</MenuItem>}
          </Select>
        </FormControl>
      </div>
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={`${props.typeSubscriptionManagement === 'CASHBACK' ? 'CASHBACK ' : ''}Mark as "Not new User"`}
        buttonLoadingText={`Loading...`}
        onClick={() => createSubscriptionManagementF()}
        loading={loading}
      />
    </>
  )
}

export default CreateSubscriptionManagement
