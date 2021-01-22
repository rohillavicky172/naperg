
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../withContext'
import { UPDATE_DATE_INVITATION_IN_COMPANIE } from '../../GraphQL'
// import Button from '@material-ui/core/Button'
import { User } from '../../../user/User.type'
// import ButtonSecondValidation from '../../../nav/ButtonSecondValidation'
import { Context } from '../../../Context.type'
import { Client } from '../../../Client.type'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'

type State = {
  loading: boolean
}

type Props = {
  disabled: boolean
  userId: string
  buttonText: string
  userRoleCompanieId: string
  me: User
  context: Context
  user: User
  deleteUser: any
  client: Client
  updateDateInvitationInCompanie: any
}

class UpdateDateInvitationInCompanie extends React.Component<Props, State> {
  state = {
    loading: false
  }

  updateDateInvitationInCompanie = async () => {
    this.setState({ loading: true })

    try {
      await this.props.updateDateInvitationInCompanie({
        variables: {
          userId: this.props.userId,
          userRoleCompanieId: this.props.userRoleCompanieId
        }
      })
    } catch (e) {
      throw new Error(e)
    }
    this.setState({ loading: false })
    this.props.client.resetStore()
  }

  render() {
    return (
      <>
        <ButtonLoadingAfterClick
          id={'idButton'}
          disabled={this.props.disabled}
          icon={''}
          size={'medium'}
          color={'secondary'}
          variant={'outlined'}
          buttonText={this.props.buttonText}
          buttonLoadingText={`Setting up...`}
          onClick={() => {
            this.updateDateInvitationInCompanie()
          }}
          loading={this.state.loading}
        />
      </>
    )
  }
}

export default compose(
  graphql(UPDATE_DATE_INVITATION_IN_COMPANIE, {
    name: 'updateDateInvitationInCompanie'
  }),
  withApollo,
  withContext
)(UpdateDateInvitationInCompanie)
