import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Contract } from './Contract.type'
import gql from 'graphql-tag'
import ButtonSecondValidation from '../nav/ButtonSecondValidation'

const UDPATE_CONTRACT_DATA_MUTATION = gql`
  mutation DeleteContract($where: ContractWhereUniqueInput!) {
    deleteContract(where: $where) {
      id
    }
  }
`

type Props = {
  contract: Contract
}

const DeleteContract = (props: Props) => {
  const client = useApolloClient()
  const [deleteContract] = useMutation(UDPATE_CONTRACT_DATA_MUTATION)
  // const [contract, setContract] = React.useState(contractClass)

  const deleteContractF = async () => {
    await deleteContract({
      variables: {
        where: {
          id: props.contract.id,
        },
      },
    })
    client.resetStore()
  }
  return (
    <ButtonSecondValidation
      color={'primary'}
      size={'medium'}
      variant={'outlined'}
      buttonText={`Delete`}
      onClick={() => deleteContractF()}
    />
  )
}

export default DeleteContract
