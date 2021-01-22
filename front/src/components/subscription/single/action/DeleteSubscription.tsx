
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { DELETE_SUBSCRIPTION } from '../../GraphQL'
import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'

type State = {}

type Props = {
  deleteSubscription: any,
  subscriptionId: string,
  client: any
}

class DeleteSubscription extends React.Component<Props, State> {
  render() {
    return (
      <ButtonSecondValidation
        color={'default'}
        variant={'text'}
        size={'small'}
        buttonText={'Delete Completely (admin)'}
        onClick={() => {
          this.deleteSubscription()
        }}
      />
    )
  }

  deleteSubscription = async () => {
    await this.props.deleteSubscription({
      variables: {
        where: {
          id: this.props.subscriptionId
        }
      }
    })
    this.props.client.resetStore()
  }
}

export default compose(
  graphql(DELETE_SUBSCRIPTION, {
    name: 'deleteSubscription'
  }),
  withApollo
)(DeleteSubscription)
