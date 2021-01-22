import React from 'react'
import { Button } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { Contract } from '../Contract.type'
import gql from 'graphql-tag'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

const SEND_PDF_CONTRACT_MUTATION = gql`
  mutation SendPDFContract($where: ContractWhereUniqueInput!) {
    sendPDFContract(where: $where) {
      id
    }
  }
`

type Props = {
  contract: Contract
  // onUpdate: (contract: Contract) => void
  // onChangeData: (contract: Contract) => void
}

const SendPDFContract = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  // console.log(props.contract)
  const [updateContract] = useMutation(SEND_PDF_CONTRACT_MUTATION)
  const [message, setMessage] = React.useState('')

  const updateContractF = async () => {
    const contractUpdated = await updateContract({
      variables: {
        where: {
          id: props.contract.id,
        },
      },
    })
    if (contractUpdated) {
      setMessage('Sent')
    }
    // if (contractUpdated.data.signContract) {
    //   props.onUpdate(contractUpdated.data.signContract)
    // }
    // console.log(contractUpdated.data.signContract)
  }
  // console.log(props.contract)
  // if (!props.contract.canBeSigned) return null
  const isAdmin = context.me.role === 'ADMIN' ? true : false
  return (
    <>
      <Button disabled={!isAdmin} onClick={() => updateContractF()}>
        Send PDF
      </Button>
      <p className="secondary">{message}</p>
    </>
  )
}

export default SendPDFContract
