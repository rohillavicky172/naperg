import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { ruleMerchantDataClass, RuleMerchantData } from './RuleMerchantData.type'
import gql from 'graphql-tag'
import RuleMerchantDataForm from './RuleMerchantDataForm'

const CREATE_RULE_MERCHANT_DATA_MUTATION = gql`
  mutation CreateRuleMerchantData($data: RuleMerchantDataCreateInput!) {
    createRuleMerchantData(data: $data) {
      id
    }
  }
`

const CreateRuleMerchantData = () => {
  const [createRuleMerchantData] = useMutation(CREATE_RULE_MERCHANT_DATA_MUTATION)
  const [ruleMerchantData, setRuleMerchantData] = React.useState(ruleMerchantDataClass)
  const [show, setShow] = React.useState(false)
  const client = useApolloClient()
  const createRuleMerchantDataF = async () => {
    if (!ruleMerchantData.product) {
      return
    }
    await createRuleMerchantData({
      variables: {
        data: {
          isActive: ruleMerchantData.isActive,
          nameRule: ruleMerchantData.nameRule,
          nameSimulation: ruleMerchantData.nameSimulation,
          nameSubstringInit: Number(ruleMerchantData.nameSubstringInit),

          nameSubstringEnd: Number(ruleMerchantData.nameSubstringEnd),

          nameValue: ruleMerchantData.nameValue,

          categoryRule: ruleMerchantData.categoryRule,
          categoryValue: ruleMerchantData.categoryValue,

          network_idRule: ruleMerchantData.network_idRule,
          network_idValue: ruleMerchantData.network_idValue,

          countryRule: ruleMerchantData.countryRule,
          countryValue: ruleMerchantData.countryValue,

          cityRule: ruleMerchantData.cityRule,
          cityValue: ruleMerchantData.cityValue,

          stateRule: ruleMerchantData.stateRule,
          stateValue: ruleMerchantData.stateValue,

          postal_codeRule: ruleMerchantData.postal_codeRule,
          postal_codeValue: ruleMerchantData.postal_codeValue,

          // productId: ruleMerchantData.product.id,
          product: {
            connect: {
              id: ruleMerchantData.product.id,
            },
          },
        },
      },
    })
    setShow(false)
    client.resetStore()
  }
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          {show ? (
            <>
              <RuleMerchantDataForm
                ruleMerchantData={ruleMerchantData}
                onChangeData={(ruleMerchantData: RuleMerchantData) => setRuleMerchantData(ruleMerchantData)}
              />

              <Button onClick={() => createRuleMerchantDataF()}>Create</Button>
              <Button onClick={() => setShow(false)}>Cancel</Button>
            </>
          ) : (
            <Button onClick={() => setShow(true)}>Create Rule</Button>
          )}
        </Paper>
      </div>
    </>
  )
}

export default CreateRuleMerchantData
