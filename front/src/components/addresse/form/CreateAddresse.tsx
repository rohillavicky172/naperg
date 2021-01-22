import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Addresse } from '../Addresse.type'
import { Subscription } from '../../subscription/Subscription.type'
import { CREATE_ADDRESSE_MUTATION } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Client } from '../../Client.type'

type State = {}
type Props = {
  context: Context
  addresse: Addresse
  createAddresse: any
  userId: string
  companieId: string
  disabled: boolean
  subscription: Subscription
  onCreate: () => void
  textButton: string
  typeField: string
  client: Client
}

class CreateAddresse extends React.Component<Props, State> {
  render() {
    return (
      <Button
        color="primary"
        variant="outlined"
        id={'saveAddresse'}
        disabled={this.props.disabled}
        onClick={() => {
          this.createAddresse()
        }}>
        {this.props.textButton}
      </Button>
    )
  }

  createAddresse = async () => {
    let addresse
    try {
      addresse = await this.props.createAddresse({
        variables: {
          data: {
            type: this.props.addresse.type,
            name: this.props.addresse.name,
            address1: this.props.addresse.address1,
            address2: this.props.addresse.address2,
            city: this.props.addresse.city,
            zip: this.props.addresse.zip,
            state: this.props.addresse.state,
            country: this.props.addresse.country,

            user: this.props.userId && {
              connect: {
                id: this.props.userId
              }
            },
            companie: {
              connect: {
                id: this.props.companieId
              }
            }
          }
        }
      })
    } catch (e) {
      console.log(e)
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
    }

    if (addresse) {
      // this.props.context.openSnackBar(true, 'Created!', 'message')
      this.props.onCreate()
      this.props.client.resetStore()
    }
  }
}

export default compose(
  graphql(CREATE_ADDRESSE_MUTATION, {
    name: 'createAddresse'
  }),
  withRouter,
  withApollo,
  withContext
)(CreateAddresse)
