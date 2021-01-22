import React from 'react'

import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import SingleFile from '../SingleFile'
import { FILES_QUERY } from '../GraphQL'
import { useQuery } from '@apollo/react-hooks'

type Props = {
  variables: any
  canDelete: boolean
  showDownload: boolean
}
const FilesQuery = (props: Props) => {
  const { loading, error, data } = useQuery(FILES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.filesConnection) return <NotFound />

  return (
    <>
      {data.filesConnection.edges.map((fileNode) => (
        <SingleFile key={fileNode.node.id} file={fileNode.node} canDelete={props.canDelete} showDownload={props.showDownload} />
      ))}
    </>
  )
}

export default FilesQuery
