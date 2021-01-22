import React from 'react'
import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { Contract } from '../Contract.type'
import gql from 'graphql-tag'
import DateComponent from '../../nav/DateComponent'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'
import utils from '../../utils'

const SIGN_CONTRACT_VENDOR_MUTATION = gql`
  mutation SignContractVendor($data: ContractUpdateInput!, $where: ContractWhereUniqueInput!) {
    signContractVendor(data: $data, where: $where) {
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

const SignContractVendor = (props: Props) => {
  // console.log(props.contract)
  const [updateContract] = useMutation(SIGN_CONTRACT_VENDOR_MUTATION)
  const [contract, setContract] = React.useState(props.contract)
  const { context }: { context: Context } = React.useContext(AppContext)

  const updateContractF = async () => {
    const contractUpdated = await updateContract({
      variables: {
        data: {
          nameVendor: contract.nameVendor,
          titleVendor: contract.titleVendor,
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
  if (!props.contract.canBeSignedVendor) return null
  return (
    <div>
      <h4>For Company</h4>

      {props.contract.isSignedVendor ? (
        <>
          Accepted by {props.contract.nameVendor}, {props.contract.titleVendor}, {props.contract.companie.name} on{' '}
          <DateComponent formatString={'MMM dd, yyyy hh:mma (z)'} date={props.contract.dateSignedVendor} />
        </>
      ) : (
        <>
          {props.contract.isComplete ? (
            <>
              <div>
                <FormControl>
                  <InputLabel htmlFor="nameVendor">{`Full Name`}</InputLabel>
                  <Input
                    id="nameVendor"
                    className="inputResponsive"
                    type="text"
                    error={contract.nameVendor.length === 0}
                    value={contract.nameVendor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContract({ ...contract, nameVendor: e.target.value })
                    }
                  />
                </FormControl>
                <div>
                  Re-enter your full name ({context.me.firstName} {context.me.lastName})
                </div>
              </div>
              <div style={{ height: '10px' }} />
              <div>
                <FormControl>
                  <InputLabel htmlFor="titleVendor">{`Title`}</InputLabel>
                  <Input
                    className="inputResponsive"
                    id="titleVendor"
                    type="text"
                    error={contract.titleVendor.length === 0}
                    value={contract.titleVendor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContract({ ...contract, titleVendor: e.target.value })
                    }
                  />
                </FormControl>
              </div>
              <div style={{ height: '10px' }} />
              <div>
                <FormControl>
                  <InputLabel htmlFor="dateSignedVendor">{`Date`}</InputLabel>
                  <Input
                    className="inputResponsive"
                    id="dateSignedVendor"
                    type="text"
                    value={utils.dateFormated(new Date())}
                    disabled={true}
                  />
                </FormControl>
              </div>
              <div style={{ height: '5px' }} />
              <Button
                color="primary"
                variant="contained"
                disabled={!Boolean(contract.titleVendor || contract.titleVendor)}
                onClick={() => updateContractF()}>
                Accept
              </Button>
            </>
          ) : (
            <>
              <div>
                <FormControl>
                  <InputLabel htmlFor="nameVendor">{`Full Name`}</InputLabel>
                  <Input
                    id="nameVendor"
                    type="text"
                    disabled={true}
                    value={contract.nameVendor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContract({ ...contract, nameVendor: e.target.value })
                    }
                  />
                </FormControl>
              </div>
              <div>
                <FormControl>
                  <InputLabel htmlFor="titleVendor">{`Title`}</InputLabel>
                  <Input
                    id="titleVendor"
                    type="text"
                    disabled={true}
                    value={contract.titleVendor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setContract({ ...contract, titleVendor: e.target.value })
                    }
                  />
                </FormControl>
              </div>

              <div>
                <FormControl>
                  <InputLabel htmlFor="dateSignedVendor">{`Date`}</InputLabel>
                  <Input
                    className="inputResponsive"
                    id="dateSignedVendor"
                    type="text"
                    value={utils.dateFormated(new Date())}
                    disabled={true}
                  />
                </FormControl>
              </div>
              <div style={{ height: '5px' }} />
              <Button color="primary" variant="contained" disabled={true} onClick={() => updateContractF()}>
                Accept
              </Button>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default SignContractVendor
