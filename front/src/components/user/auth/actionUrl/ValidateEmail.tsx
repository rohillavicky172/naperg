
import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { VALIDATE_EMAIL_TOKEN_MUTATION } from '../GraphQL'
// import HomeCategoriesV3 from '../../../nav/home/HomeCategoriesV3'
// import ValidateInvitation from './ValidateInvitation'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { withRouter } from 'react-router'

const queryString = require('query-string')

type State = {
  isChangeEmail: boolean
}

type Props = {
  context: Context,
  children: any,
  location: any,
  client: any,
  validateEmailMutation: any
}

class ValidateEmail extends React.Component<Props, State> {
  state = {
    isChangeEmail: false
  }

  componentDidMount() {
    let validateEmailToken = queryString.parse(this.props.location.search).validateEmailToken
    let isChangeEmail = queryString.parse(this.props.location.search).isChangeEmail

    if (validateEmailToken) {
      this.validateEmailMutation(validateEmailToken)
      if (isChangeEmail) {
        this.setState({
          isChangeEmail: true
        })
      }
    }
  }

  render() {
    return <>{this.props.children}</>
  }
  validateEmailMutation = async validateEmailToken => {
    let user
    try {
      user = await this.props.validateEmailMutation({
        variables: {
          validateEmailToken
        }
      })
    } catch (e) {
      this.props.context.openSnackBar(true, e.graphQLErrors[0].message, 'message')
    }

    await this.props.context.refreshContext()
    console.log(user)
    if (user) {
      let message = ''
      if (this.state.isChangeEmail) {
        message = `Your email is now verified.`
      } else {
        message = `Your email is now verified.`
      }
      this.props.context.openSnackBar(true, message, 'message')
    }
  }
}

export default compose(
  graphql(VALIDATE_EMAIL_TOKEN_MUTATION, { name: 'validateEmailMutation' }),
  withApollo,
  withRouter,
  withContext
)(ValidateEmail)
