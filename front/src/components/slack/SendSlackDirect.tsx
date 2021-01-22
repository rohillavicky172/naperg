import React from 'react'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'

const SEND_SLACK_DIRECT_MUTATION = gql`
  mutation SendSlackDirect($where: SlackWhereUniqueInput!) {
    sendSlackDirect(where: $where) {
      id
    }
  }
`

type Props = {
  slackId: string
}

const SendSlackDirect = (props: Props) => {
  const [sendSlackDirect, data] = useMutation(SEND_SLACK_DIRECT_MUTATION)
  if (data.called === true && data.loading === false && data.data && data.client) {
    data.client.resetStore()
  }
  return (
    <>
      <Button
        variant="outlined"
        color={'primary'}
        onClick={() => sendSlackDirect({ variables: { where: { id: props.slackId } } })}>
        Send test message
      </Button>
    </>
  )
}

export default SendSlackDirect
