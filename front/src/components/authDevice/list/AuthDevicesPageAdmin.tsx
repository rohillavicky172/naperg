import React from 'react'
import Paper from '@material-ui/core/Paper'
import { withContext } from '../../withContext'
import AuthDevicesAdminQuery from './AuthDevicesAdminQuery'
import Filters from '../../nav/filter/Filters'
const queryString = require('query-string')
// import { Query } from '../../Query.type'
// import TitlePage from '../../nav/layout/titlePage/TitlePage'

type State = {
  first: number
}

type Props = {
  first: number
  client: any
  history: any
  location: Location
}

class AuthDevicesPageAdmin extends React.Component<Props, State> {
  state = {
    first: 10,
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const page = parsed.page ? parsed.page : 1
    const userName = parsed.userName ? parsed.userName.trim() : undefined
    // const companieId = this.props.match.params.companieId
    const orderBy = parsed.orderBy ? parsed.orderBy : 'lastLogin_DESC'
    // const companieId = parsed.companieId ? parsed.companieId : undefined
    // const companieName = parsed.companieName
    const userId = parsed.userId ? parsed.userId : undefined
    // const productId = parsed.productId
    // const type = parsed.type
    // const message = parsed.message

    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            {/* <TitlePage type="companie" companieId={companieId} objectName="AuthDevices" /> */}
            <h3>{`AuthDevices (admin)`}</h3>
            <Filters showUserName={true} showUserId={true} />

            <AuthDevicesAdminQuery
              page={page}
              variables={{
                first: this.state.first,
                skip: (page - 1) * this.state.first,
                orderBy,
                where: {
                  user: (userName || userId) && {
                    id: userId,
                    name: { contains: userName },
                  },
                },
              }}
            />
          </Paper>
        </div>
      </>
    )
  }
}

export default withContext(AuthDevicesPageAdmin)
