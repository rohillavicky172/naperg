import React from 'react'
import { Paper, Button } from '@material-ui/core'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { contractClass, Contract } from './Contract.type'
import { useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import ContractForm from './ContractForm'
import { useParams } from 'react-router'
import { ParamTypes } from '../ParamTypes.type'

const CREATE_CONTRACT_DATA_MUTATION = gql`
  mutation CreateContract($data: ContractCreateInput!) {
    createContract(data: $data) {
      id
    }
  }
`

const CreateContract = () => {
  const history = useHistory()
  const params: ParamTypes = useParams<ParamTypes>()
  const companieId = params.companieId
  const [createContract] = useMutation(CREATE_CONTRACT_DATA_MUTATION)
  const [contract, setContract] = React.useState(contractClass)
  // const [show, setShow] = React.useState(false)
  const client = useApolloClient()
  const createContractF = async () => {
    const newContrat = await createContract({
      variables: {
        data: {
          title1: contract.title1,
          title2: contract.title2,

          isSigned: contract.isSigned,
          isSignedVendor: contract.isSignedVendor,
          canBePrinted: contract.canBePrinted,
          canBeSigned: contract.canBeSigned,
          canBeSignedVendor: contract.canBeSignedVendor,
          isComplete: contract.isComplete,
          name: '',
          nameVendor: '',
          title: '',
          titleVendor: '',

          textContract: contract.textContract,
          // keyTerms: contract.keyTerms,
          companie: {
            connect: {
              id: companieId,
            },
          },
        },
      },
    })
    // console.log(newContrat)
    client.resetStore()
    history.push(`/admin/contracts?contractId=${newContrat.data.createContract.id}`)
  }
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <ContractForm contract={contract} onChangeData={(contract: Contract) => setContract(contract)} />

          <Button onClick={() => createContractF()}>Create</Button>
        </Paper>
      </div>
    </>
  )
}

export default CreateContract
