import React from 'react'
import { Button, Paper } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { Contract } from './Contract.type'
import gql from 'graphql-tag'
import ContractForm from './ContractForm'
import { Link } from 'react-router-dom'
import SingleContractDialog from './list/SingleContractDialog'
import SendPDFContract from './action/SendPDFContract'

const UDPATE_CONTRACT_MUTATION = gql`
  mutation UpdateContract($data: ContractUpdateInput!, $where: ContractWhereUniqueInput!) {
    updateContract(data: $data, where: $where) {
      id
      title1
      title2
      # keyTerms
      textContract
      isSigned
      isSignedVendor
      canBePrinted
      canBeSigned
      canBeSignedVendor
      isComplete
    }
  }
`

type Props = {
  contract: Contract
  // onChangeData: (contract: Contract) => void
}

const UpdateContract = (props: Props) => {
  // console.log(props.contract)
  const [updateContract] = useMutation(UDPATE_CONTRACT_MUTATION)
  const [contract, setContract] = React.useState(props.contract)
  const [message, setMessage] = React.useState('')

  const updateContractF = async () => {
    let contractUpdated = updateContract({
      variables: {
        data: {
          title1: contract.title1,
          title2: contract.title2,
          // keyTerms: contract.keyTerms,
          textContract: contract.textContract,
          isSigned: contract.isSigned,
          isSignedVendor: contract.isSignedVendor,
          canBePrinted: contract.canBePrinted,
          canBeSigned: contract.canBeSigned,
          canBeSignedVendor: contract.canBeSignedVendor,
          isComplete: contract.isComplete,
        },
        where: {
          id: props.contract.id,
        },
      },
    })
    if (contractUpdated) {
      setMessage('Saved!')
    }
  }
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <h3>Update contract in companie {props.contract.companie.name}</h3>
        <SingleContractDialog contract={props.contract} />
        <div>
          companieId:{' '}
          <Link className="link" to={`/company/${props.contract.companie.id}`}>
            {props.contract.companie.id}
          </Link>
        </div>
        <br />
        <ContractForm contract={contract} onChangeData={(contract: Contract) => setContract(contract)} />
        <Button variant="outlined" color="primary" onClick={() => updateContractF()}>
          Update
        </Button>{' '}
        <SendPDFContract contract={contract} />
        <p className="secondary">{message}</p>
      </Paper>
    </div>
  )
}

export default UpdateContract
