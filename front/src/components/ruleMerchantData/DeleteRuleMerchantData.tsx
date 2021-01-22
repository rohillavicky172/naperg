import React from 'react'
import Button from '@material-ui/core/Button'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { RuleMerchantData } from './RuleMerchantData.type'
import gql from 'graphql-tag'

const UDPATE_RULE_MERCHANT_DATA_MUTATION = gql`
  mutation DeleteRuleMerchantData($where: RuleMerchantDataWhereUniqueInput!) {
    deleteRuleMerchantData(where: $where) {
      id
    }
  }
`

type Props = {
  ruleMerchantData: RuleMerchantData
  // onChangeData: (ruleMerchantData: RuleMerchantData) => void
}

const DeleteRuleMerchantData = (props: Props) => {
  const client = useApolloClient()
  const [deleteRuleMerchantData] = useMutation(UDPATE_RULE_MERCHANT_DATA_MUTATION)
  // const [ruleMerchantData, setRuleMerchantData] = React.useState(ruleMerchantDataClass)

  const deleteRuleMerchantDataF = async () => {
    await deleteRuleMerchantData({
      variables: {
        where: {
          id: props.ruleMerchantData.id,
        },
      },
    })
    client.resetStore()
  }
  return (
    <>
      <Button onClick={() => deleteRuleMerchantDataF()}>delete</Button>
    </>
  )
}

export default DeleteRuleMerchantData
