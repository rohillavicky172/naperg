
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../withContext'
import { SOURCES_QUERY } from '../GraphQL'
import SingleSourceLight from '../single/SingleSourceLight'

type State = {
  loading: boolean
}

type Props = {
  sourcesQuery: any
  variables: any
}

class SourcesLightQuery extends React.Component<Props, State> {
  render() {
    if (this.props.sourcesQuery.error) {
      return (
        <Error
          message={this.props.sourcesQuery.error.graphQLErrors.length && this.props.sourcesQuery.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.sourcesQuery.loading) {
      return <Loading />
    }

    return (
      <>
        {this.props.sourcesQuery.sourcesConnection.edges.map(sourceNode => (
          <SingleSourceLight key={sourceNode.node.id} source={sourceNode.node} />
        ))}
      </>
    )
  }
}

export default compose(
  graphql(SOURCES_QUERY, {
    name: 'sourcesQuery',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter,
  withApollo,
  withContext
)(SourcesLightQuery)
