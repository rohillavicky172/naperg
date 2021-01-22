import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Button from '@material-ui/core/Button'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import { CREATE_BALANCE } from './GraphQL'

type Props = {
  companieId: string
}

const CreateBalance = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const client = useApolloClient()
  const [createBalance] = useMutation(CREATE_BALANCE)

  return (
    <Button
      color="default"
      variant="outlined"
      onClick={async () => {
        createBalance({
          variables: {
            data: {
              testMode: context.testMode,
              isEnabled: false,
              valueBalance: 0,
              pendingBalance: 0,
              minimumBalance: 0,
              pendingCharge: 0,
              unpaidCharge: 0,
              cashbackPending: 0,
              cashbackAvailable: 0,
              pendingSmallAmount: 0,
              currency: 'usd',
              companie: {
                connect: {
                  id: props.companieId,
                },
              },
            },
          },
        })
        await client.resetStore()
      }}>{`Create balance`}</Button>
  )
}

export default CreateBalance
