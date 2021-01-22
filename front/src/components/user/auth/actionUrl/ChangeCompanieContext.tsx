import React from 'react'
import { withApollo } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { USER_ROLE_COMPANIE } from '../../../../config/config'
import { USER_ROLE_COMPANIES_QUERY } from '../../../userRoleCompanie/GraphQL'
import { withRouter } from 'react-router'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { History } from '../../../History.type'

const queryString = require('query-string')

type State = {
  isChangeEmail: boolean
}

type Props = {
  context: Context
  location: Location
  children: any
  client: any
  history: History
  changeCompanieContext: any
}

class ChangeCompanieContext extends React.Component<Props, State> {
  componentDidMount = () => {
    this.changeCompanieContext()
  }
  componentDidUpdate = (prevProps: Props) => {
    if (
      queryString.parse(this.props.location.search).companyContext !==
        queryString.parse(prevProps.location.search).companyContext ||
      this.props.context.me !== prevProps.context.me
    ) {
      // if (this.props.context.me !== prevProps.context.me) {
      this.changeCompanieContext()
    }
  }

  changeCompanieContext = async () => {
    if (this.props.context.authState !== 'loggedin') {
      return
    }
    let companyContext = queryString.parse(this.props.location.search).companyContext
    if (!companyContext) {
      return
    }

    const userRoleCompaniesQuery = await this.props.client.query({
      query: USER_ROLE_COMPANIES_QUERY,
      variables: {
        where: {
          companie: {
            id: companyContext
          },
          user: {
            id: this.props.context.me.id
          }
        }
      }
    })

    if (userRoleCompaniesQuery.data.userRoleCompanies.length) {
      localStorage.setItem(USER_ROLE_COMPANIE, JSON.stringify(userRoleCompaniesQuery.data.userRoleCompanies[0]))

      // })
      // console.log(userRoleCompanie)
      this.props.context.refreshContext()
      // this.props.history.replace('/')
    }
  }

  render() {
    let parsed = queryString.parse(this.props.location.search)
    if (!this.props.context.userRoleCompanie) {
      return null
    }
    if (
      !parsed.companyContext &&
      this.props.context.me &&
      this.props.context.userRoleCompanie &&
      this.props.context.userRoleCompanie.companie &&
      this.props.context.userRoleCompanie.companie.id
    ) {
      parsed.companyContext = this.props.context.userRoleCompanie.companie.id
      this.props.history.replace('?' + queryString.stringify(parsed))
      return null
    }

    return <>{this.props.children}</>
  }
}

export default compose(
  // graphql(VALIDATE_INVITATION_TOKEN_MUTATION, { name: 'changeCompanieContext' }),
  withApollo,
  withRouter,
  withContext
)(ChangeCompanieContext)
