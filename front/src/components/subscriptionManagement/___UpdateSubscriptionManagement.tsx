import React from 'react'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { SubscriptionManagement } from './SubscriptionManagement.type'
import gql from 'graphql-tag'
import SubscriptionManagementForm from './___SubscriptionManagementForm'

const UDPATE_SUBSCRIPTION_MANAGEMENT_MUTATION = gql`
  mutation UpdateSubscriptionManagement(
    $data: SubscriptionManagementUpdateInput!
    $where: SubscriptionManagementWhereUniqueInput!
  ) {
    updateSubscriptionManagement(data: $data, where: $where) {
      id
      nameRule
      nameSimulation
      nameSubstringInit

      nameSubstringEnd
      categoryRule
      network_idRule
      countryRule
      cityRule
      nameValue
      categoryValue
      network_idValue
      countryValue
      cityValue

      stateRule
      stateValue

      postal_codeRule
      postal_codeValue
    }
  }
`

type Props = {
  subscriptionManagement: SubscriptionManagement
  // onChangeData: (subscriptionManagement: SubscriptionManagement) => void
  onUpdate: (subscriptionManagement: SubscriptionManagement) => void
}

const UpdateSubscriptionManagement = (props: Props) => {
  // console.log(props.subscriptionManagement)
  const [updateSubscriptionManagement, data] = useMutation(UDPATE_SUBSCRIPTION_MANAGEMENT_MUTATION)
  const [subscriptionManagement, setSubscriptionManagement] = React.useState(props.subscriptionManagement)

  const updateSubscriptionManagementF = async () => {
    const data: any = await updateSubscriptionManagement({
      variables: {
        data: {
          // isActive: subscriptionManagement.statusSubscriptionManagement,
        },
        where: {
          id: props.subscriptionManagement.id,
        },
      },
    })
    console.log(data.data.updateSubscriptionManagement)
    if (data.data) {
      props.onUpdate(data.data.updateSubscriptionManagement)
    }
  }
  return (
    <>
      <SubscriptionManagementForm
        subscriptionManagement={subscriptionManagement}
        onChangeData={(subscriptionManagement: SubscriptionManagement) => {
          console.log(subscriptionManagement)
          setSubscriptionManagement(subscriptionManagement)
        }}
      />

      <Button onClick={() => updateSubscriptionManagementF()}>Update</Button>
    </>
  )
}

export default UpdateSubscriptionManagement
