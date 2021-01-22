import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { TRACKINGLINKS_QUERY } from '../GraphQL'
import SingleTrackingLink from '../single/SingleTrackingLink'
import Pagination from '../../nav/Pagination'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

type Props = {
  page: number
  variables: any
}

const TrackingLinksQuery = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { loading, error, data, refetch } = useQuery(TRACKINGLINKS_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.trackingLinksConnection) return <NotFound />

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

      {data.trackingLinksConnection.edges.map((trackingLinkNode) => (
        <SingleTrackingLink key={trackingLinkNode.node.id} trackingLink={trackingLinkNode.node} />
      ))}
      <Pagination page={props.page} first={props.variables.first} count={data.trackingLinksConnection.aggregate.count} />
    </div>
  )
}

export default TrackingLinksQuery
