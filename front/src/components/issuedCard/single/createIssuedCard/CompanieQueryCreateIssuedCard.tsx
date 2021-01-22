import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { Addresse } from '../../../addresse/Addresse.type'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import { Product } from '../../../product/Product.type'
import { COMPANIE_QUERY } from '../../../companie/GraphQL'
import CreateIssuedCardLogic from './CreateIssuedCardLogic'
import { Context } from '../../../Context.type'
import { User } from '../../../user/User.type'
// import { withRouter } from 'react-router-dom'
// import { withContext } from '../../../withContext'

type State = {}
type Props = {
  companieId: string
  user: User
  addresses: Addresse[]
  context: Context
  product: Product
  companieQuery: any
}

class CompanieQueryCreateIssuedCard extends React.Component<Props, State> {
  render() {
    if (this.props.companieQuery.error) {
      return (
        <Error
          message={this.props.companieQuery.error.graphQLErrors.length && this.props.companieQuery.error.graphQLErrors[0].message}
        />
      )
    }
    if (this.props.companieQuery.loading) {
      return <Loading />
    }
    if (!this.props.companieQuery.companie) {
      return <NotFound />
    }

    return (
      <>
        <CreateIssuedCardLogic
          // sources={this.state.sources}
          // userStripe={this.state.userStripe}
          addresses={this.props.addresses}
          user={this.props.user}
          companie={this.props.companieQuery.companie}
        />
        {/* <OnboardingLogic user={this.props.user} companie={this.props.companieQuery.companie} /> */}
      </>
    )
  }
}

export default compose(
  graphql(COMPANIE_QUERY, {
    name: 'companieQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.companieId
        }
      }
    })
  })
  // withRouter,
  // withContext
)(CompanieQueryCreateIssuedCard)
