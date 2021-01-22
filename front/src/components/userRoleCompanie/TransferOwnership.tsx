import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import UpdateCompanieRole from './form/UpdateCompanieRole'
import Icon from '@material-ui/core/Icon'
import { UserRoleCompanie } from '../userRoleCompanie/UserRoleCompanie.type'
import { User } from '../user/User.type'
import { UPDATE_USER_ROLE_COMPANIE_MUTATION } from './GraphQL'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import { Client } from '../Client.type'

type State = {
  userRoleCompanie: UserRoleCompanie
}
type Props = {
  userRoleCompanie: UserRoleCompanie
  user: User
  onCancel: () => void
  client: Client
  context: Context
}

class TransferOwnership extends React.Component<Props, State> {
  state = {
    userRoleCompanie: this.props.userRoleCompanie
  }
  render() {
    // console.log(this.props.userRoleCompanie)
    return (
      <div className="tac">
        <div className="responsiveMargin2 margin5">
          <Icon className="textSize15" color="secondary">
            warning
          </Icon>
          <h3 className="secondary">
            {`
            Ownership of this account will be transferred to ${this.props.user.firstName} ${this.props.user.lastName} (${this.props.user.email}). 
            Your role will be switched to ADMIN. You will need to log in again.`}
          </h3>
        </div>

        <UpdateCompanieRole
          disabled={false}
          onUpdated={this.onUpdated}
          onCancel={this.props.onCancel}
          userRoleCompanie={{ ...this.state.userRoleCompanie, companieRole: 'OWNER' }}
        />

        {/* <Button color="secondary" variant="outlined" onClick={() => this.transferOwnership()}>{`Yes, go ahead`}</Button>
        <Button onClick={this.props.onCancel}>{`Cancel`}</Button> */}
      </div>
    )
  }

  onUpdated = () => {
    this.props.context.logout()
    this.props.client.resetStore()
  }

  // transferOwnership = async () => {
  //   let newData
  //   try {
  //     newData = await this.props.updateUserRoleCompanie({
  //       variables: {
  //         where: {
  //           id: this.props.userRoleCompanie.id
  //         },
  //         data: {
  //           companieRole: 'OWNER'
  //         }
  //       }
  //     })
  //   } catch (e) {
  //     e.graphQLErrors.some(graphQLError => this.props.context.openSnackBar(true, graphQLError.message, 'error'))
  //   }
  //   if (newData) {
  //     // this.props.onUpdated(newData)
  //     // console.log(newData)
  //     // console.log(newData.data.updateUserRoleCompanie)

  //     this.props.context.openSnackBar(true, 'Saved!', 'message')

  //     this.props.context.logout()
  //     this.props.client.resetStore()

  //     // setTimeout(() => {
  //     //   this.props.history.push('/login?mode=LOGOUT')
  //     // }, 500)
  //   }
  // }
}

export default compose(
  graphql(UPDATE_USER_ROLE_COMPANIE_MUTATION, {
    name: 'updateUserRoleCompanie'
  }),
  withContext,
  withApollo
)(TransferOwnership)
