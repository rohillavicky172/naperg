import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../withContext'
import { SOURCES_QUERY } from '../GraphQL'
import SingleSourceAdminList from './admin/SingleSourceAdminList'
import Pagination from '../../nav/Pagination'
import Paper from '@material-ui/core/Paper'

type State = {
  loading: boolean
}

type Props = {
  page: number
  first: number
  client: any
  history: any
  sourcesQuery: any
  variables: any
}

class SourcesAdminQuery extends React.Component<Props, State> {
  state = {
    loading: false,
  }
  refetch = async () => {
    this.setState({ loading: true })
    await this.props.sourcesQuery.refetch()
    this.setState({ loading: false })
  }

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
      <div className="paperOut">
        {this.props.sourcesQuery.sourcesConnection.edges.map((sourceNode) => (
          <div key={sourceNode.node.id} className="paperOut">
            <Paper className="paperIn">
              <SingleSourceAdminList source={sourceNode.node} />
            </Paper>
          </div>
        ))}
        <Pagination
          page={this.props.page}
          first={this.props.variables.first}
          count={this.props.sourcesQuery.sourcesConnection.aggregate.count}
        />
      </div>
    )
  }
}

export default compose(
  graphql(SOURCES_QUERY, {
    name: 'sourcesQuery',
    options: (props: Props) => ({
      variables: props.variables,
    }),
  }),
  withRouter,
  withApollo,
  withContext
)(SourcesAdminQuery)
