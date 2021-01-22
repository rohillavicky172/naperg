
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
  userQuery: any
  showCompanie: boolean
  context: Context
  objectName: string
  userId: string
}

class TitleUserName extends React.Component<Props, State> {
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
      <>
        {this.props.objectName} for {utils.getNameOrEmail(this.props.userQuery.user, 'both')}{' '}
        {this.props.showCompanie && <span>({this.props.context.userRoleCompanie.companie.name})</span>}
      </>
    )
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
)(TitleUserName)
