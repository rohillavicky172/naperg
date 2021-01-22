/* eslint-disable react/destructuring-assignment */

import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import SingleFileAdmin from './page/SingleFileAdmin'
import { FILES_QUERY } from '../GraphQL'
// import { File } from '../File.type'
// import AddFileContainer from './AddFileContainer'
// import CreateFile from '../form/CreateFile'

type State = {}
type Props = {
  variables: any
  // file: File,
  files: any
}

class FilesAdminQuery extends React.Component<Props, State> {
  onCreate = () => {
    this.props.files.refetch()
  }

  render() {
    if (this.props.files.error) {
      return <Error message={this.props.files.error.graphQLErrors.length && this.props.files.error.graphQLErrors[0].message} />
    }
    if (this.props.files.loading) {
      return <Loading />
    }
    if (!this.props.files) {
      return <NotFound />
    }

    return (
      <>
        {this.props.files.filesConnection.edges.map(fileNode => (
          <div key={fileNode.node.id}>
            <SingleFileAdmin file={fileNode.node} />
          </div>
        ))}
      </>
    )
  }
}

export default compose(
  graphql(FILES_QUERY, {
    name: 'files',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter
)(FilesAdminQuery)
