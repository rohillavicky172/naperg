import React from 'react'
import Paper from '@material-ui/core/Paper'
import { USER_QUERY } from '../../GraphQL'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import WarningAction from '../../../subscription/single/action/WarningAction'
import { Context } from '../../../Context.type'
import NotFound from '../../../nav/error/NotFound'
import NotAuth from '../../../nav/error/NotAuth'
import Loading from '../../../nav/error/Loading'
import { History } from '../../../History.type'

type State = {}

type Props = {
  userQuery: any
  userId: string
  history: History
  context: Context
}

class WarningPhoneNotVerifiedQuery extends React.Component<Props, State> {
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

    let user = this.props.userQuery.user
    if (user.isPhoneValidated) {
      return null
    }
    if (!user.isPhoneValidationRequired) {
      return null
    }
    return (
      <>
        <div className="paperOut">
          <Paper className="">
            <WarningAction
              onCancel={() => {}}
              iconText={'warning'}
              message="Please verify your phone number"
              actionText="Verify now!"
              shwowActionButton={true}
              onClick={() => {
                this.props.history.push(`/settings/${this.props.userId}/?mode=updatePhone&isEditMode=true`)
              }}
              shwowCancelButton={false}
            />
          </Paper>
        </div>
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
  withApollo,
  withRouter
)(WarningPhoneNotVerifiedQuery)
