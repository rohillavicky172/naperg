import React from 'react'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'

const SEND_SLACK_TO_CHANNEL_MUTATION = gql`
  mutation SendSlackToChannel($where: SlackWhereUniqueInput!) {
    sendSlackToChannel(where: $where) {
      id
    }
  }
`

type Props = {
  slackId: string
}

const SendSlackToChannel = (props: Props) => {
  const [sendSlackToChannel, data] = useMutation(SEND_SLACK_TO_CHANNEL_MUTATION)
  if (data.called === true && data.loading === false && data.data && data.client) {
    data.client.resetStore()
  }
  return (
    <>
      <Button onClick={() => sendSlackToChannel({ variables: { where: { id: props.slackId } } })}>Send to channel</Button>
    </>
  )
}

export default SendSlackToChannel
