
import React from 'react'
import CompanieName from '../../../companie/single/CompanieName'
import TitleUserName from './TitleUserName'
// import { graphql,  withApollo } from 'react-apollo'; import {flowRight as compose} from 'lodash';
// import { withContext } from '../../../withContext'
// import { USER_QUERY } from '../../GraphQL'
// import NotFound from '../../../nav/error/NotFound'
// import NotAuth from '../../../nav/error/NotAuth'
// import Loading from '../../../nav/error/Loading'
// import Grid from '@material-ui/core/Grid'
// import { User } from '../../User.type'
// import utils from '../../../utils'
// import RemoveStripeUserId from '../action/RemoveStripeUserId'

// import CreateStripeUserId from '../action/CreateStripeUserId'
// import CreateSendGridId from '../action/CreateSendGridId'
// import StripeDataAction from '../../../authorization/StripeDataAction'
// import { withContext } from '../../../withContext'
// import { Context } from '../../../Context.type'
// import { Context } from '../../../Context.type'

type State = {}

type Props = {
  type: string,
  userId: string,
  objectName: string,
  companieId: string
  // userQuery:any,
  // context: Context
}

class TitlePage extends React.Component<Props, State> {
  render() {
    return (
      <>
        {this.props.type === 'user' && this.props.userId && (
          <h3>
            <TitleUserName showCompanie={true} objectName={this.props.objectName} userId={this.props.userId} />
          </h3>
        )}

        {this.props.type === 'companie' && (
          <h3>
            {this.props.objectName} for <CompanieName companieId={this.props.companieId} />
          </h3>
        )}
      </>
    )
  }
}

export default TitlePage
