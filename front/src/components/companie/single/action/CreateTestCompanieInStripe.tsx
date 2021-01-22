
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../withContext'
import { CREATE_TEST_COMPANIE_IN_STRIPE } from '../../GraphQL'
// import Button from '@material-ui/core/Button'
import { User } from '../../../user/User.type'
import { Companie } from '../../../companie/Companie.type'
// import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Context } from '../../../Context.type'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

type State = {
  loading: boolean
}

type Props = {
  me: User
  context: Context
  user: User
  companie: Companie
  deleteUser: any
  client: any
  createTestCompanieInStripe: any
}

class CreateTestCompanieInStripe extends React.Component<Props, State> {
  state = {
    loading: false
  }

  createTestCompanieInStripe = async () => {
    this.setState({ loading: true })
    await this.props.createTestCompanieInStripe({
      variables: {
        companieId: this.props.companie.id
      }
    })
    this.props.client.resetStore()
  }

  render() {
    return (
      <>
        <ButtonLoadingAfterClick
          id={'idButton'}
          disabled={false}
          icon={''}
          size={'medium'}
          color={'secondary'}
          variant={'outlined'}
          buttonText={'create TEST company in stripe'}
          buttonLoadingText={`Setting up...`}
          onClick={() => {
            this.createTestCompanieInStripe()
          }}
          loading={this.state.loading}
        />
      </>
    )
  }
}

export default compose(
  graphql(CREATE_TEST_COMPANIE_IN_STRIPE, {
    name: 'createTestCompanieInStripe'
  }),
  withApollo,
  withContext
)(CreateTestCompanieInStripe)
