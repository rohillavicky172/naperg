
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import UserPhotoView from './UserPhotoView'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { USER_QUERY } from '../../../GraphQL'
import { withContext } from '../../../../withContext'
import { Context } from '../../../../Context.type'
import { Query } from '../../../../Query.type'
import UserPhotoForm from './UserPhotoForm'
import NotFound from '../../../../nav/error/NotFound'
import NotAuth from '../../../../nav/error/NotAuth'
import Loading from '../../../../nav/error/Loading'

type State = {
  isEditMode: boolean
}

type Props = {
  userQuery: Query
  changeEditMode: boolean
  context: Context
  userId: string
}

class UserPhoto extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }
  changeEditMode = () => {
    this.setState({ isEditMode: !this.state.isEditMode })
  }
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
      <div className="paperOut">
        <Paper className="paperIn">
          {this.state.isEditMode ? (
            <UserPhotoForm user={this.props.userQuery.user} updateUser={() => {}} changeEditMode={this.changeEditMode} />
          ) : (
            <>
              <div className="tar">
                <Button color={'primary'} variant="outlined" size="small" onClick={this.changeEditMode}>
                  {`Edit`}
                </Button>
              </div>
              <UserPhotoView user={this.props.userQuery.user} />
            </>
          )}
        </Paper>
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
  withRouter,
  withContext,
  withApollo
)(UserPhoto)
