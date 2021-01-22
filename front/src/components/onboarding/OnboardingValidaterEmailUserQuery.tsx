
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { USER_QUERY } from '../user/GraphQL'
import { Query } from '../Query.type'
import Paper from '@material-ui/core/Paper'
import NotFound from '../nav/error/NotFound'
import NotAuth from '../nav/error/NotAuth'
import Loading from '../nav/error/Loading'
import OnboardingValidateEmail from './OnboardingValidateEmail'

type State = {
  isEditMode: boolean
}

type Props = {
  userQuery: Query
  userId: string
  companieId: string
}

class OnboardingValidaterEmailUserQuery extends React.Component<Props, State> {
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

    return (
      <div className="responsiveMargin2">
        <div className="paperOut">
          <Paper className="paperIn">
            <OnboardingValidateEmail user={this.props.userQuery.user} />
          </Paper>
        </div>
      </div>
    )
  }
}

// export default withContext(UserProfileDetails)

export default compose(
  graphql(USER_QUERY, {
    name: 'userQuery',
    options: (props: Props) => ({
      variables: {
        where: {
          id: props.userId
        }
      }
    })
  }),

  withApollo
)(OnboardingValidaterEmailUserQuery)
