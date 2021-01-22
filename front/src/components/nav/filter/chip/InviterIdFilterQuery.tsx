import React from 'react'
import { History } from '../../../History.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
import NotFound from '../../error/NotFound'
import Chip from '@material-ui/core/Chip'
import Error from '../../error/Error'
import Loading from '../../error/Loading'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import ImageTemplate from '../../ImageTemplate'
import { USER_QUERY } from '../../../user/GraphQL'

const queryString = require('query-string')

type State = {}

type Props = {
  variables: any
  history: History
  location: Location
  userQuery: any
}

class InviterIdFilterQuery extends React.Component<Props, State> {
  onDelete = () => {
    let parsed = queryString.parse(this.props.location.search)
    delete parsed.inviterId
    delete parsed.page

    this.props.history.push('?' + queryString.stringify(parsed))
  }

  render() {
    if (this.props.userQuery.error) {
      return (
        <Error message={this.props.userQuery.error.graphQLErrors.length && this.props.userQuery.error.graphQLErrors[0].message} />
      )
    }
    if (this.props.userQuery.loading) {
      return <Loading />
    }
    if (!this.props.userQuery) {
      return <NotFound />
    }

    if (!this.props.userQuery.user) {
      return <NotFound />
    }

    return (
      <div className="margin2">
        <Chip
          avatar={<ImageTemplate format={'avatar'} nameFile={this.props.userQuery.user.nameFile} />}
          label={'Inviter: ' + this.props.userQuery.user.firstName + ' ' + this.props.userQuery.user.lastName}
          onDelete={this.onDelete}
          variant="outlined"
        />
      </div>
    )
  }
}

export default compose(
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withRouter
)(InviterIdFilterQuery)
