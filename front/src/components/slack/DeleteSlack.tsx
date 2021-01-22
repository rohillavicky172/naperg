import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { useMutation } from '@apollo/react-hooks'

import gql from 'graphql-tag'

const DELETE_SLACK_MUTATION = gql`
  mutation DeleteSlack($where: SlackWhereUniqueInput!) {
    deleteSlack(where: $where) {
      id
    }
  }
`

type Props = {
  slackId: string
}

const DeleteSlack = (props: Props) => {
  const [deleteSlack, data] = useMutation(DELETE_SLACK_MUTATION)
  if (data.called === true && data.loading === false && data.data && data.client) {
    data.client.resetStore()
  }
  return (
    <>
      <Button onClick={() => deleteSlack({ variables: { where: { id: props.slackId } } })}>
        <Icon>delete</Icon>
      </Button>
    </>
  )
}

export default DeleteSlack
