
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { USER_QUERY } from '../../../user/GraphQL'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'
import utils from '../../../utils'

type State = {}

type Props = {
  userId: string
  userQuery: any
  showCompanie: boolean
  context: Context
  objectName: string
}

class UserName extends React.Component<Props, State> {
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

    return <>{utils.getNameOrEmail(this.props.userQuery.user, 'both')}</>
  }
}

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
  withContext,
  withApollo
)(UserName)
