import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { VALIDATE_INVITATION_TOKEN_MUTATION } from '../GraphQL'
import { withRouter } from 'react-router'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Location } from '../../../Location.type'
import { History } from '../../../History.type'

const queryString = require('query-string')

type State = {
  isChangeEmail: boolean
}

type Props = {
  context: Context
  validateInvitation: any
  location: Location
  // client: Client,
  history: History
  children: any
}

class ValidateInvitation extends React.Component<Props, State> {
  componentDidMount = () => {
    this.validateInvitation()
  }
  componentDidUpdate = (prevProps: Props) => {
    if (this.props.context.me !== prevProps.context.me) {
      this.validateInvitation()
    }
  }

  validateInvitation = async () => {
    if (!this.props.context.me) {
      return
    }
    const parsed = queryString.parse(this.props.location.search)
    let invitationToken = parsed.invitationToken
    if (!invitationToken) {
      return
    }
    let result
    try {
      result = await this.props.validateInvitation({
        variables: {
          invitationToken
        }
      })
    } catch (e) {
      // e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
    }
    if (result) {
      // this.props.context.openSnackBar(true, `You are now a member of ${result.data.validateInvitation.name}!`, 'message')

      delete parsed.invitationToken
      this.props.history.push('?' + queryString.stringify(parsed))
    }
  }

  render() {
    return <>{this.props.children}</>
  }
}

export default compose(
  graphql(VALIDATE_INVITATION_TOKEN_MUTATION, { name: 'validateInvitation' }),
  withApollo,
  withRouter,
  withContext
)(ValidateInvitation)
