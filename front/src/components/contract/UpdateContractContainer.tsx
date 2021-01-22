import React from 'react'
import { Contract } from './Contract.type'
import gql from 'graphql-tag'
import { useParams } from 'react-router'
import { ParamTypes } from '../ParamTypes.type'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../nav/error/Loading'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import UpdateContract from './UpdateContract'
import { Paper } from '@material-ui/core'
import ManageFile from '../file/ManageFile'

const CONTRACT_QUERY = gql`
  query Contract($where: ContractWhereUniqueInput!) {
    contract(where: $where) {
      id
      nameVendor
      titleVendor
      canBePrinted
      isSignedVendor
      canBeSignedVendor
      isComplete
      dateSignedVendor
      title
      name
      dateSigned
      id
      title1
      title2
      textContract
      isSigned
      isSignedVendor
      canBeSigned
      signedBy {
        id
        firstName
        lastName
      }
      signedByVendor {
        id
        firstName
        lastName
      }

      companie {
        id
        name
      }
    }
  }
`

// contract(where: ContractWhereUniqueInput!): Contract @hasRole(roles: ["ADMIN"]) @isAuthDeviceVerified

// type Props = {
//   contract: Contract
//   onChangeData: (contract: Contract) => void
// }

const UpdateContractContainer = () => {
  const params: ParamTypes = useParams<ParamTypes>()
  const contractId = params.contractId
  const { loading, error, data } = useQuery(CONTRACT_QUERY, {
    variables: {
      where: {
        id: contractId,
      },
    },
  })

  if (loading) return <Loading />
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (!data.contract) return <NotFound />
  const contract: Contract = data.contract
  return (
    <>
      <UpdateContract contract={contract} />

      <div className="paperOut">
        <Paper className="paperIn">
          <h4>{`Attachments Admin`}</h4>
          <div>
            <ManageFile
              companieId={contract.companie.id}
              contractId={contract.id}
              showDownload={true}
              onCreate={() => {}}
              typeFile={'CONTRACT'}
            />
          </div>
        </Paper>
      </div>
    </>
  )
}

export default UpdateContractContainer
