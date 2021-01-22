import React from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { withRouter } from 'react-router'
import { Match } from '../../../Match.type'
import { History } from '../../../History.type'
import { flowRight as compose } from 'lodash'
import { Location } from '../../../Location.type'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Product } from '../../Product.type'
// import { USER_QUERY } from '../../../user/GraphQL'
// import { graphql, withApollo } from 'react-apollo'
// import NotFound from '../../../nav/error/NotFound'
// import NotAuth from '../../../nav/error/NotAuth'
// import Loading from '../../../nav/error/Loading'
import '../Style.css'
const queryString = require('query-string')

type State = {
  urlName: string
}

type Props = {
  product: Product
  userId: string
  match: Match
  history: History
  context: Context
  location: Location
  userQuery: any
}

class TabSubProductBtoB extends React.Component<Props, State> {
  handleChange = (e, selected) => {
    const parsed = queryString.parse(this.props.location.search)
    parsed.tab = selected
    this.props.history.replace('?' + queryString.stringify(parsed))
  }

  render() {
    const parsed = queryString.parse(this.props.location.search)
    const tab = parsed.tab ? parsed.tab : 'Admin'
    // const mode = parsed.mode
    return (
      <Paper className="headerCategories">
        <Tabs value={tab} indicatorColor="primary" variant="scrollable" textColor="primary" onChange={this.handleChange}>
          {this.props.context.me.role === 'ADMIN' && <Tab className="tabHeaderCategories" value={'Admin'} label="Admin" />}
          {/* <Tab className="tabHeaderCategories" value={'Activity'} label="Activity" /> */}
          {/* <Tab className="tabHeaderCategories" value={'Description'} label="Description" /> */}
          {/* {(this.props.context.me.role === 'ADMIN' || isUserOwner) && (
            <Tab className="tabHeaderCategories" value={'Edit'} label="Edit" />
          )} */}
          {/* {tab === 'Edit' && <Tab className="tabHeaderCategories" value={'Edit'} label="Edit" />} */}
          {/* {this.props.context.me.role === 'ADMIN' && (
            <Tab className="tabHeaderCategories" value={'MerchantData'} label="MerchantData" />
          )} */}
          {this.props.context.me.role === 'ADMIN' && (
            <Tab className="tabHeaderCategories" value={'Promotion'} label="Promotion" />
          )}
        </Tabs>
      </Paper>
    )
  }
}

export default compose(
  // graphql(USER_QUERY, {
  //   name: 'userQuery',
  //   options: (props: Props) => ({
  //     variables: {
  //       where: {
  //         id: props.userId
  //       }
  //     }
  //   })
  // }),
  withRouter,
  withContext
  // withApollo
)(TabSubProductBtoB)
