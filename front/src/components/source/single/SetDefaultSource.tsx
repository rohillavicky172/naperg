
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_DEFAULT_SOURCE_MUTATION } from '../GraphQL'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Source } from '../Source.type'
import { Context } from '../../Context.type'
import { Client } from '../../Client.type'

type State = {}

type Props = {
  // card: Card,
  // sourceId: string,
  source: Source
  companieId: string
  context: Context
  setDefaultSource: any
  client: Client
}

class SetDefaultSource extends React.Component<Props, State> {
  setDefaultSource = async () => {
    let defaultSource
    try {
      defaultSource = await this.props.setDefaultSource({
        variables: {
          where: {
            id: this.props.source.id
          }
        }
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
      throw e
    }
    if (defaultSource) {
      this.props.context.openSnackBar(true, 'Payment Source successfully set as primary', 'message')
      this.props.client.resetStore()
    }
  }

  render() {
    // console.log(this.props.card)
    return (
      <Button variant="outlined" size="small" color="primary" onClick={() => this.setDefaultSource()}>{`Set as primary`}</Button>
    )
  }
}

export default compose(
  graphql(UPDATE_DEFAULT_SOURCE_MUTATION, {
    name: 'setDefaultSource'
    // options: (props: Props) => ({
    //   refetchQueries: [
    //     {
    //       query: USER_STRIPE_QUERY,
    //       variables: { userId: props.userId }
    //     }
    //   ]
    // })
  }),
  withContext,
  withApollo
)(SetDefaultSource)
