import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'

import SingleCustomLink from './SingleCustomLink'
import Pagination from '../../nav/Pagination'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

import gql from 'graphql-tag'

export const QUERY = gql`
  query CustomLinksConnection($where: CustomLinkWhereInput, $orderBy: CustomLinkOrderByInput, $first: Int, $skip: Int) {
    customLinksConnection(where: $where, orderBy: $orderBy, first: $first, skip: $skip) {
      edges {
        node {
          id
          createdAt
          link
          anchor

          product {
            id
            name
          }

          user {
            id
            nameFile
            firstName
            lastName
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

const CustomLinksQueryAdmin = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.customLinksConnection) return <NotFound />

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

      {data.customLinksConnection.edges.map((customLinkNode) => (
        <SingleCustomLink key={customLinkNode.node.id} customLink={customLinkNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.customLinksConnection.aggregate.count} />
    </div>
  )
}

export default CustomLinksQueryAdmin
