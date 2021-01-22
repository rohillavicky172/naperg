import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'

import SingleMerchantDataList from './SingleMerchantDataList'
import Pagination from '../../nav/Pagination'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

import gql from 'graphql-tag'

export const QUERY = gql`
  query MerchantDatasConnection($where: MerchantDataWhereInput, $orderBy: MerchantDataOrderByInput, $first: Int, $skip: Int) {
    merchantDatasConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          name
          type
          category
          city
          country
          network_id
          postal_code
          state
          invoices {
            id
          }
          product {
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

type Props = {
  page: number
  variables: any
}

const MerchantDatasAdminQuery = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.merchantDatasConnection) return <NotFound />

  const refetchF = async () => {
    setIsLoading(true)
    await refetch()
    setIsLoading(false)
  }

  return (
    <div className="paperOut">
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={<Icon>refresh</Icon>}
        buttonLoadingText={`Loading...`}
        onClick={() => refetchF()}
        loading={isLoading}
      />

      {data.merchantDatasConnection.edges.map((merchantDataNode) => (
        <SingleMerchantDataList key={merchantDataNode.node.id} merchantData={merchantDataNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.merchantDatasConnection.aggregate.count} />
    </div>
  )
}

export default MerchantDatasAdminQuery
