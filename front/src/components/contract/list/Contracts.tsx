import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loading from '../../nav/error/Loading'
import Error from '../../nav/error/Error'
import SingleContract from './SingleContract'
// import Paper from '@material-ui/core/Paper'
// import { useLocation } from 'react-router-dom'
// import CreateContract from '../CreateContract'
// import queryString from 'query-string'
// import Pagination from '../../nav/Pagination'
// import Filters from '../../nav/filter/Filters'

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
    }
  }
`
type Props = {
  companieId: string
}

const Contracts = (props: Props) => {
  const { loading, error, data } = useQuery(CONTRACTS_CONNECTION_QUERY, {
    variables: {
      where: {
        companie: {
          id: props.companieId,
        },
      },
      orderBy: 'title1_DESC',
    },
  })
  if (loading) return <Loading />
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />

  return (
    <>
      {data.contractsConnection.edges.map((contractNode) => (
        <div key={contractNode.node.id}>
          <SingleContract contract={contractNode.node} />
        </div>
      ))}
    </>
  )
}

export default Contracts
