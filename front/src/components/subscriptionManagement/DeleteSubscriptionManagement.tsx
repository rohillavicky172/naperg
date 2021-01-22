import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SubscriptionManagement } from './SubscriptionManagement.type'
import gql from 'graphql-tag'
import ButtonLoadingAfterClick from '../nav/ButtonLoadingAfterClick'

const MUTATION = gql`
  mutation DeleteSubscriptionManagement($where: SubscriptionManagementWhereUniqueInput!) {
    deleteSubscriptionManagement(where: $where) {
      id
    }
  }
`

type Props = {
  onDelete: () => void
  subscriptionManagement: SubscriptionManagement
}

const DeleteSubscriptionManagement = (props: Props) => {
  const [loading, setLoading] = React.useState(false)
  const [deleteSubscriptionManagement] = useMutation(MUTATION)

  const deleteSubscriptionManagementF = async () => {
    setLoading(true)
    await deleteSubscriptionManagement({
      variables: {
        where: {
          id: props.subscriptionManagement.id,
        },
      },
    })
    props.onDelete()
    setLoading(false)
  }
  return (
    <ButtonLoadingAfterClick
      id={'idButton'}
      icon={''}
      color={'primary'}
      disabled={false}
      variant={'outlined'}
      size={'medium'}
      buttonText={`Undo`}
      buttonLoadingText={`Loading...`}
      onClick={() => deleteSubscriptionManagementF()}
      loading={loading}
    />
  )
}

export default DeleteSubscriptionManagement
