import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { COMPANIE_STRIPE_QUERY } from '../companie/GraphQL'
import { UserStripe } from '../userStripe/UserStripe.type'
// import { Source } from '../card/Card.type'

type State = {}

type Props = {
  companieId: string
  companieStripeQuery: any
  // onSources: (sources: Source[]) => void,
  onUserStripe: (userStripe: UserStripe) => void
}

class CardManagementStepper extends React.Component<Props, State> {
  componentDidUpdate = (prevProps: Props) => {
    if (this.props.companieStripeQuery.companie !== prevProps.companieStripeQuery.companie) {
      if (this.props.companieStripeQuery.companie && this.props.companieStripeQuery.companie.userStripe.sources.data) {
        // this.props.onSources(this.props.companieStripeQuery.companie.userStripe.sources.data)
        this.props.onUserStripe(this.props.companieStripeQuery.companie.userStripe)
      }
    }
  }
  componentDidMount = () => {
    if (this.props.companieStripeQuery.companie && this.props.companieStripeQuery.companie.userStripe.sources.data) {
      // this.props.onSources(this.props.companieStripeQuery.companie.userStripe.sources.data)
      this.props.onUserStripe(this.props.companieStripeQuery.companie.userStripe)
    }
  }
  render() {
    return null
  }
}

export default compose(
  graphql(COMPANIE_STRIPE_QUERY, {
    name: 'companieStripeQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.companieId
        }
      }
    })
  }),
  withApollo
)(CardManagementStepper)
