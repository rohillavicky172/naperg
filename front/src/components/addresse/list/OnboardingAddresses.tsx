
import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import AddresseForm from '../form/AddresseForm'
import DeleteAddresse from '../DeleteAddresse'
import { ADDRESSES_QUERY } from '../GraphQL'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { addressClass } from '../../addresse/Addresse.type'
// import Paper from '@material-ui/core/Paper'
// import CreateAddresseButton from '../../addresse/form/CreateAddresseButton'

type State = {}
type Props = {
  variables: any
  context: Context
  // product: Product,
  addresses: any
  onCreate: () => any
  onCancel: () => any
  onUpdate: () => any

  userId: string
  companieId: string
  type: string
}

class OnboardingAddresses extends React.Component<Props, State> {
  render() {
    if (this.props.addresses.error) {
      return (
        <Error message={this.props.addresses.error.graphQLErrors.length && this.props.addresses.error.graphQLErrors[0].message} />
      )
    }
    if (this.props.addresses.loading) {
      return <Loading />
    }
    if (!this.props.addresses) {
      return <NotFound />
    }

    return (
      <>
        <div>
          <>
            {!this.props.addresses.addresses.length && (
              <AddresseForm
                className="width100per"
                textButtonUpdate={'Next'}
                textButtonCreate={'Next'}
                textButtonCancel={'Back'}
                onUpdate={() => {}}
                companieId={this.props.companieId}
                userId={this.props.userId}
                onCreate={() => this.props.onCreate()}
                onCancel={() => this.props.onCancel()}
                addresse={{
                  ...addressClass,
                  type: this.props.type,
                  country: 'US'
                }}
              />
            )}
          </>
        </div>
        {this.props.addresses.addresses.map(addresse => (
          <div key={addresse.id}>
            {this.props.context.me.role === 'ADMIN' && <DeleteAddresse text={'Delete (admin)'} addresse={addresse} />}
            <AddresseForm
              className="width100per"
              textButtonUpdate={'Next'}
              textButtonCreate={'Next'}
              textButtonCancel={'Back'}
              companieId={this.props.companieId}
              userId={this.props.userId}
              onCreate={() => {}}
              onUpdate={() => this.props.onUpdate()}
              onCancel={() => this.props.onCancel()}
              addresse={addresse}
            />
          </div>
        ))}
      </>
    )
  }
}

export default compose(
  graphql(ADDRESSES_QUERY, {
    name: 'addresses',
    options: (props: Props) => ({
      variables: props.variables
    })
  }),
  withContext,
  withRouter
)(OnboardingAddresses)
