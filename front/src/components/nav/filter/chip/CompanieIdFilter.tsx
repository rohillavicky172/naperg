import React from 'react'
import { useHistory } from 'react-router-dom'
import Chip from '@material-ui/core/Chip'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import gql from 'graphql-tag'

export const QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id

      name
    }
  }
`

const CompanieIdFilter = () => {
  const history = useHistory()
  const location = useLocation()
  const companieId = queryString.parse(location.search).companieId
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        id: companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />

  const onDelete = () => {
    let parsed = queryString.parse(location.search)
    delete parsed.companieId
    delete parsed.page

    history.push('?' + queryString.stringify(parsed))
  }

  return (
    <>
      <div className="margin2">
        <Chip label={'companie: ' + data.companie.name} onDelete={onDelete} variant="outlined" />
      </div>
    </>
  )
}

export default CompanieIdFilter
