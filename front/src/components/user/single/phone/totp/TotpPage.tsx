import React from 'react'
import { USER_QUERY } from '../../../GraphQL'
import Paper from '@material-ui/core/Paper'
import NotFound from '../../../../nav/error/NotFound'
import Loading from '../../../../nav/error/Loading'
import Error from '../../../../nav/error/Error'
import { useQuery } from '@apollo/react-hooks'
import GenerateSecret from './GenerateSecret'

type Props = {
  userId: string
}

const TotpPage = (props: Props) => {
  const { loading, error, data } = useQuery(USER_QUERY, {
    variables: {
      where: {
        id: props.userId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.user) return <NotFound />

  let user = data.user
  // const history = useHistory()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <GenerateSecret userId={user.id} />
        </Paper>
      </div>
    </>
  )
}

export default TotpPage
