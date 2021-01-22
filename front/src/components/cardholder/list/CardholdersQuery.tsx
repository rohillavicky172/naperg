import React from 'react'
// import { graphql, withApollo } from 'react-apollo'
// import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'

import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { useQuery } from '@apollo/react-hooks'
// import { withRouter } from 'react-router-dom'
// import { withContext } from '../../withContext'
import { CARDHOLDERS_QUERY } from '../GraphQL'
import SingleCardholder from '../single/SingleCardholder'
import Pagination from '../../nav/Pagination'
// import Icon from '@material-ui/core/Icon'
// import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

// type State = {
//   loading: boolean
// }

type Props = {
  page: number
  // first: number

  variables: any
}

// class CardholdersQuery extends React.Component<Props, State> {
const CardholdersQuery = (props: Props) => {
  const { loading, error, data } = useQuery(CARDHOLDERS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.cardholdersConnection) return <NotFound />

  return (
    <div className="paperOut">
      {data.cardholdersConnection.edges.map((cardholderNode) => (
        <SingleCardholder key={cardholderNode.node.id} cardholder={cardholderNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.cardholdersConnection.aggregate.count} />
    </div>
  )
}

export default CardholdersQuery
