
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { UPDATE_SOURCE_MUTATION } from '../GraphQL'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Client } from '../../Client.type'
import { Source } from '../Source.type'

type State = {
  // source: Source,
  maxLengthNickName: number
  nickNameValide: boolean
}

type Props = {
  client: Client
  context: Context
  onCancel: () => void
  onUpdate: () => void
  companieId: string
  source: Source
  disabled: boolean
  updateSource: any
  openSnackBar: (message: string) => void
  // card: Card
}

class UpdateSource extends React.Component<Props, State> {
  updateSource = async () => {
    let card
    console.log(this.props.source)
    console.log(this.props.source.id)
    try {
      card = await this.props.updateSource({
        variables: {
          data: {
            nickname: this.props.source.nickname
          },
          where: {
            id: this.props.source.id
          }
        }
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'error')
    }
    if (card) {
      this.props.onUpdate()
      this.props.client.resetStore()
    }
  }

  render() {
    // console.log(this.props.source)
    return (
      <>
        <Button
          variant="outlined"
          disabled={this.props.disabled}
          color="primary"
          onClick={() => this.updateSource()}>{`Save`}</Button>{' '}
        <Button onClick={() => this.props.onCancel()}>{`Cancel`}</Button>
      </>
    )
  }
}

export default compose(
  graphql(UPDATE_SOURCE_MUTATION, {
    name: 'updateSource'
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
)(UpdateSource)
