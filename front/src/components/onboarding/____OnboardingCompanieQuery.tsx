import React from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import { Product } from '../product/Product.type'
import { COMPANIE_QUERY } from '../companie/GraphQL'
import OnboardingLogic from './OnboardingLogic'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { User } from '../user/User.type'
import { Addresse } from '../addresse/Addresse.type'

type State = {}
type Props = {
  user: User
  companieId: string
  context: Context
  product: Product
  addresses: Addresse[]
  companieQuery: any
}

class OnboardingCompanieQuery extends React.Component<Props, State> {
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
    if (!this.props.companieQuery) {
      return <NotFound />
    }

    return <OnboardingLogic user={this.props.user} companie={this.props.companieQuery.companie} />
  }
}

export default compose(
  graphql(COMPANIE_QUERY, {
    name: 'companieQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.companieId,
        },
      },
    }),
  }),
  withRouter,
  withContext
)(OnboardingCompanieQuery)
