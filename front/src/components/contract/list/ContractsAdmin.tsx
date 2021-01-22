import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Loading from '../../nav/error/Loading'
import Error from '../../nav/error/Error'
import { useLocation } from 'react-router-dom'
// import CreateContract from '../CreateContract'
import SingleContractAdmin from './SingleContractAdmin'
import queryString from 'query-string'
import Pagination from '../../nav/Pagination'
import Filters from '../../nav/filter/Filters'
import { ContractNode } from '../Contract.type'

const CONTRACTS_CONNECTION_QUERY = gql`
  query ContractsConnection($where: ContractWhereInput, $orderBy: ContractOrderByInput, $skip: Int, $first: Int) {
    contractsConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          # keyTerms
          textContract
          nameVendor
          titleVendor
          signedByVendor {
            id
            firstName
            lastName
          }
          isSignedVendor
          canBeSignedVendor
          canBePrinted
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
      aggregate {
        count
      }
    }
  }
`

const ContractsAdmin = () => {
  const location = useLocation()
  const first = 10
  const parsed = queryString.parse(location.search)
  const companieId = parsed.companieId ? parsed.companieId : undefined
  // let isComplete = parsed.isComplete ? parsed.isComplete : undefined
  const isComplete = parsed.isComplete === 'TRUE' ? true : parsed.isComplete === 'FALSE' ? false : undefined
  const isSignedVendor = parsed.isSignedVendor === 'TRUE' ? true : parsed.isSignedVendor === 'FALSE' ? false : undefined
  const isSigned = parsed.isSigned === 'TRUE' ? true : parsed.isSigned === 'FALSE' ? false : undefined
  const canBeSignedVendor = parsed.canBeSignedVendor === 'TRUE' ? true : parsed.canBeSignedVendor === 'FALSE' ? false : undefined
  const canBeSigned = parsed.canBeSigned === 'TRUE' ? true : parsed.canBeSigned === 'FALSE' ? false : undefined

  const contractId = parsed.contractId ? parsed.contractId : undefined
  const page: number = parsed.page ? Number(parsed.page) : 1
  const orderBy = 'createdAt_DESC'
  // const { context }: { context: Context } = useContext(AppContext)
  const { loading, error, data } = useQuery(CONTRACTS_CONNECTION_QUERY, {
    variables: {
      where: {
        id: contractId,
        isComplete,
        canBeSignedVendor,
        canBeSigned,
        isSignedVendor,
        isSigned,
        companie: companieId && {
          id: companieId,
        },
      },
      first,
      orderBy,
      skip: (page - 1) * first,
    },
  })
  // console.log(data)
  if (loading) return <Loading />
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Contracts</h3>

          <Filters
            showIsSignedVendor
            showCanBeSignedVendor
            showCanBeSigned
            showContractId
            showCompanieId
            showIsSigned
            showIsComplete
          />
          {data.contractsConnection.edges.map((contractNode: ContractNode) => (
            <div key={contractNode.node.id}>
              <SingleContractAdmin contract={contractNode.node} />
            </div>
          ))}
        </Paper>
      </div>
      <div>
        <Pagination page={page} first={first} count={data.contractsConnection.aggregate.count} />
      </div>
    </>
  )
}

export default ContractsAdmin
