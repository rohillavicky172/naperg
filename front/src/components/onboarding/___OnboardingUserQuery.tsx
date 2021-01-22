import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { USER_QUERY } from '../user/GraphQL'
import { Query } from '../Query.type'
import NotFound from '../nav/error/NotFound'
import NotAuth from '../nav/error/NotAuth'
import Loading from '../nav/error/Loading'
// import OnboardingCompanieQuery from './OnboardingCompanieQuery'

type State = {
  isEditMode: boolean
}

type Props = {
  userQuery: Query
  userId: string
  companieId: string
}

class OnboardingUserQuery extends React.Component<Props, State> {
  // state = {
  //   isEditMode: false
  // }
  // changeEditMode = () => {
  //   this.setState({ isEditMode: !this.state.isEditMode })
  // }
  render() {
    if (this.props.userQuery.error) {
      return <NotAuth />
    }
    if (this.props.userQuery.loading) {
      return <Loading />
    }
    if (!this.props.userQuery) {
      return <NotFound />
    }

    // return <OnboardingCompanieQuery user={this.props.userQuery.user} companieId={this.props.companieId} />
  }
}

// export default withContext(UserProfileDetails)

export default compose(
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.userId,
        },
      },
    }),
  }),

  withApollo
)(OnboardingUserQuery)
