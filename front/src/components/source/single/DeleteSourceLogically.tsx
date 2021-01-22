
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Client } from '../../Client.type'
import { Source } from '../Source.type'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import PaymentMethodFormatSource from '../../card/single/PaymentMethodFormatSource'
import { DELETE_SOURCE_LOGICALLY_MUTATION } from '../GraphQL'

type State = {
  loading: boolean
}

type Props = {
  buttonText: string
  source: Source
  // deleteSource: () => void,
  onDelete: () => void
  setMode: (mode: string) => void
  context: Context
  client: Client
  deleteSourceLogically: any
  onCancel: () => void
}

class DeleteSourceLogically extends React.Component<Props, State> {
  state = {
    loading: false
  }
  deleteSourceLogically = async () => {
    this.setState({ loading: true })
    let balance
    try {
      balance = await this.props.deleteSourceLogically({
        variables: {
          where: {
            id: this.props.source.id
          }
        }
      })
    } catch (e) {
      this.setState({ loading: false })
      e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'message'))
      throw e
    }
    if (balance) {
      this.props.onDelete()
      this.setState({ loading: false })
      this.props.context.openSnackBar(true, `Payment Source successfully deleted`, 'message')
      this.props.client.resetStore()
    }
  }

  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={12} className="">
            <br />
            <span className="secondary">
              <PaymentMethodFormatSource showIcon={false} source={this.props.source} />{' '}
              {`will be deleted as a payment source. Are you sure?`}
            </span>
          </Grid>
          <Grid item xs={12} className="">
            <br />
            <ButtonLoadingAfterClick
              id={'idButton'}
              icon={''}
              disabled={false}
              color={'secondary'}
              variant={'outlined'}
              size={'medium'}
              buttonText={this.props.buttonText}
              buttonLoadingText={`Loading...`}
              onClick={() => {
                this.deleteSourceLogically()
              }}
              loading={this.state.loading}
            />{' '}
            <Button color="default" onClick={this.props.onCancel}>{`Cancel`}</Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default compose(
  graphql(DELETE_SOURCE_LOGICALLY_MUTATION, {
    name: 'deleteSourceLogically'
  }),
  withApollo,
  withContext
)(DeleteSourceLogically)
