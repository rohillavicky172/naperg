import React from 'react'
import UserRoleCompanieAdminQuery from './UserRoleCompanieAdminQuery'
import Filters from '../../nav/filter/Filters'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'

const queryString = require('query-string')
type State = {
  first: number
}

type Props = {
  context: Context
  location: Location
  match: { params: { page: number } }
}

class UserRoleCompanieAdminPage extends React.Component<Props, State> {
  state = {
    first: 10,
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const page = parsed.page ? parsed.page : 1
    const userId = parsed.userId
    const privateData = parsed.privateData
    const isPersonal = parsed.isPersonal === 'TRUE' ? true : parsed.isPersonal === 'FALSE' ? false : undefined
    const orderBy = parsed.orderBy ? parsed.orderBy : 'createdAt_DESC'
    const companieId = parsed.companieId ? parsed.companieId : undefined
    const typeCompanie = parsed.typeCompanie ? parsed.typeCompanie : undefined
    const companieName = parsed.companieName ? parsed.companieName : undefined
    const userName = parsed.userName ? parsed.userName : undefined
    // const isBuyer = parsed.isBuyer === 'TRUE' ? true : parsed.isBuyer === 'FALSE' ? false : undefined
    const companieRole = typeof parsed.companieRole === 'string' ? [parsed.companieRole] : parsed.companieRole
    return (
      <div className="paperOut">
        <h1>{`User Role Companie`}</h1>

        <Filters
          showUserName
          showCompanieRole
          showPrivateData
          showCompanieName
          showOrderByCreated
          showCompanieId
          showUserId
          showTypeCompanie
          showIsPersonal

          // showIsBuyer
        />

        <UserRoleCompanieAdminQuery
          showPagination={true}
          page={page}
          variables={{
            where: {
              companieRole_in: companieRole,
              companie: {
                id: companieId,
                name: { contains: companieName },
                typeCompanie,
                isPersonal,
                // isBuyer
              },
              user: {
                privateData: { contains: privateData },
                id: userId,
                OR: userName && [
                  {
                    name: { contains: userName },
                  },
                  {
                    email: { contains: userName },
                  },
                ],
              },
            },
            first: this.state.first,
            orderBy,
            skip: (page - 1) * this.state.first,
          }}
        />
      </div>
    )
  }
}

export default withContext(UserRoleCompanieAdminPage)
