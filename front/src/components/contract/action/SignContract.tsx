import React from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { Contract } from '../Contract.type'
import gql from 'graphql-tag'
import DateComponent from '../../nav/DateComponent'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

const SIGN_CONTRACT_MUTATION = gql`
  mutation SignContract($data: ContractUpdateInput!, $where: ContractWhereUniqueInput!) {
    signContract(data: $data, where: $where) {
      id
      # keyTerms
      textContract
      nameVendor
      titleVendor
      signedByVendor {
        id
      }
      isSignedVendor
      canBeSignedVendor
      isComplete
      dateSignedVendor
      title
      name
      signedBy {
        id
      }
      dateSigned

      title1
      title2
      isSigned
      canBeSigned
      companie {
        id
        name
      }
    }
  }
`

type Props = {
  contract: Contract
  onUpdate: (contract: Contract) => void
  // onChangeData: (contract: Contract) => void
}

const SignContract = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  // console.log(props.contract)
  const [updateContract] = useMutation(SIGN_CONTRACT_MUTATION)
  const [contract, setContract] = React.useState(props.contract)

  const updateContractF = async () => {
    const contractUpdated = await updateContract({
      variables: {
        data: {
          name: contract.name,
          title: contract.title,
        },
        where: {
          id: props.contract.id,
        },
      },
    })
    if (contractUpdated.data.signContract) {
      props.onUpdate(contractUpdated.data.signContract)
    }
    // console.log(contractUpdated.data.signContract)
  }
  // console.log(props.contract)
  if (!props.contract.canBeSigned) return null
  const isAdmin = context.me.role === 'ADMIN' ? true : false
  return (
    <div>
      {props.contract.isSigned ? (
        <>
          <h4>For NachoNacho</h4>
          Accepted by {props.contract.name}, {props.contract.title}, NachoNacho on{' '}
          <DateComponent formatString={'MMM dd, yyyy hh:mma (z)'} date={props.contract.dateSigned} />
        </>
      ) : (
        <>
          <h4 className={!isAdmin ? 'grey' : ''}>For NachoNacho</h4>
          <div>
            <FormControl>
              <InputLabel htmlFor="name">{`Full Name`}</InputLabel>
              <Input
                disabled={!isAdmin}
                className="inputResponsive"
                id="name"
                type="text"
                value={contract.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContract({ ...contract, name: e.target.value })}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="title">{`Title`}</InputLabel>
              <Input
                disabled={!isAdmin}
                className="inputResponsive"
                id="title"
                type="text"
                value={contract.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContract({ ...contract, title: e.target.value })}
              />
            </FormControl>
          </div>
          <div style={{ height: '5px' }} />
          <Button color="primary" variant="contained" disabled={!isAdmin} onClick={() => updateContractF()}>
            Accept
          </Button>
        </>
      )}
    </div>
  )
}

export default SignContract
