
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Addresse } from './Addresse.type'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Client } from '../Client.type'

import { DELETE_ADDRESSE_MUTATION } from './GraphQL'

type State = {}
type Props = {
  context: Context,
  addresse: Addresse,
  deleteAddresse: any,
  text: string,
  client: Client
}

class DeleteAddresse extends React.Component<Props, State> {
  render() {
    return <Button onClick={() => this.deleteAddresse()}>{this.props.text}</Button>
  }

  deleteAddresse = async () => {
    let addresse
    try {
      addresse = await this.props.deleteAddresse({
        variables: {
          where: {
            id: this.props.addresse.id
          }
        }
      })
    } catch (e) {
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
    }

    if (addresse) {
      this.props.context.openSnackBar(true, 'Deleted!', 'message')
      this.props.client.resetStore()
    }
  }
}

export default compose(
  graphql(DELETE_ADDRESSE_MUTATION, {
    name: 'deleteAddresse'
  }),
  withRouter,
  withApollo,
  withContext
)(DeleteAddresse)
