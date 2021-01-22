import React from 'react'
import Button from '@material-ui/core/Button'
import { useMutation } from '@apollo/react-hooks'
import { RuleMerchantData } from './RuleMerchantData.type'
import gql from 'graphql-tag'
import RuleMerchantDataForm from './RuleMerchantDataForm'

const UDPATE_RULE_MERCHANT_DATA_MUTATION = gql`
  mutation UpdateRuleMerchantData($data: RuleMerchantDataUpdateInput!, $where: RuleMerchantDataWhereUniqueInput!) {
    updateRuleMerchantData(data: $data, where: $where) {
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
  ruleMerchantData: RuleMerchantData
  onUpdate: (ruleMerchantData: RuleMerchantData) => void
}

const UpdateRuleMerchantData = (props: Props) => {
  const [updateRuleMerchantData] = useMutation(UDPATE_RULE_MERCHANT_DATA_MUTATION)
  const [ruleMerchantData, setRuleMerchantData] = React.useState(props.ruleMerchantData)

  const updateRuleMerchantDataF = async () => {
    const data: any = await updateRuleMerchantData({
      variables: {
        data: {
          isActive: ruleMerchantData.isActive,
          nameRule: ruleMerchantData.nameRule,
          nameSimulation: ruleMerchantData.nameSimulation,
          nameSubstringInit: Number(ruleMerchantData.nameSubstringInit),

          nameSubstringEnd: Number(ruleMerchantData.nameSubstringEnd),
          categoryRule: ruleMerchantData.categoryRule,
          network_idRule: ruleMerchantData.network_idRule,
          countryRule: ruleMerchantData.countryRule,
          cityRule: ruleMerchantData.cityRule,

          nameValue: ruleMerchantData.nameValue,
          categoryValue: ruleMerchantData.categoryValue,
          network_idValue: ruleMerchantData.network_idValue,
          countryValue: ruleMerchantData.countryValue,
          cityValue: ruleMerchantData.cityValue,

          stateRule: ruleMerchantData.stateRule,
          stateValue: ruleMerchantData.stateValue,

          postal_codeRule: ruleMerchantData.postal_codeRule,
          postal_codeValue: ruleMerchantData.postal_codeValue,
        },
        where: {
          id: props.ruleMerchantData.id,
        },
      },
    })
    if (data.data) {
      props.onUpdate(data.data.updateRuleMerchantData)
    }
  }
  return (
    <>
      <RuleMerchantDataForm
        ruleMerchantData={ruleMerchantData}
        onChangeData={(ruleMerchantData: RuleMerchantData) => {
          console.log(ruleMerchantData)
          setRuleMerchantData(ruleMerchantData)
        }}
      />

      <Button onClick={() => updateRuleMerchantDataF()}>Update</Button>
    </>
  )
}

export default UpdateRuleMerchantData
