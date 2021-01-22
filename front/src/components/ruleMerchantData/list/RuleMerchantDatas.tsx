import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Loading from '../../nav/error/Loading'
import Error from '../../nav/error/Error'
import { useLocation } from 'react-router-dom'
import CreateRuleMerchantData from '../CreateRuleMerchantData'
import SingleRuleMerchantData from './SingleRuleMerchantData'
import queryString from 'query-string'
import Pagination from '../../nav/Pagination'
import Filters from '../../nav/filter/Filters'

const QUERY = gql`
  query RuleMerchantDatasConnection(
    $where: RuleMerchantDataWhereInput
    $orderBy: RuleMerchantDataOrderByInput
    $skip: Int
    $first: Int
  ) {
    ruleMerchantDatasConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          isActive
          nameRule
          stateRule

          stateValue

          postal_codeRule
          postal_codeValue
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
          productId
          user {
            id
            firstName
            lastName
          }
          product {
            id
            name
            nameFile
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

const RuleMerchantDatas = () => {
  const location = useLocation()
  const first = 10
  const parsed = queryString.parse(location.search)
  const search = parsed.search ? parsed.search : undefined
  const productId = parsed.productId
  let ruleMerchantDataId = parsed.ruleMerchantDataId ? parsed.ruleMerchantDataId : undefined
  let page: number = parsed.page ? Number(parsed.page) : 1
  const orderBy = 'createdAt_DESC'
  // const { context }: { context: Context } = useContext(AppContext)
  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: {
      where: {
        OR: search && [{ product: { name: { contains: search } } }],
        id: ruleMerchantDataId,
        product: {
          id: {
            contains: productId,
          },
        },
      },
      first,
      orderBy,
      skip: (page - 1) * first,
    },
  })
  if (loading) return <Loading />
  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />

  return (
    <>
      <Filters showRuleMerchantDataId showProductId searchPlaceholder={'Product'} />
      <CreateRuleMerchantData />
      {data.ruleMerchantDatasConnection.edges.map((ruleMerchantDataNode) => (
        <div key={ruleMerchantDataNode.node.id}>
          <div className="paperOut">
            <Paper className="paperIn">
              <SingleRuleMerchantData onUpdate={() => refetch()} ruleMerchantData={ruleMerchantDataNode.node} />
            </Paper>
          </div>
        </div>
      ))}
      <div>
        <Pagination page={page} first={first} count={data.ruleMerchantDatasConnection.aggregate.count} />
      </div>
    </>
  )
}

export default RuleMerchantDatas
