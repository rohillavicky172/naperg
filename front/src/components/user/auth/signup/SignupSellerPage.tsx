import React from 'react'
import SignupSeller from './SignupSeller'
import { withRouter } from 'react-router'
import { flowRight as compose } from 'lodash'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import { Link } from 'react-router-dom'
import { Location } from '../../../Location.type'
const queryString = require('query-string')

type State = {}

type Props = {
  location: Location
  history: any
  context: Context
}

class SignupSellerPage extends React.Component<Props, State> {
  componentDidUpdate() {
    if (this.props.context.me.id) {
      const parsed = queryString.parse(this.props.location.search)
      this.props.history.replace('/?' + queryString.stringify(parsed))
    }
  }

  render() {
    return (
      <div className="responsiveMargin2">
        <div className="tac margin6">
          <Link to={'/'}>
            <img alt="logo" className="logoNachoNacho" src="/logo/NachoNachoSellerStation.png" />
          </Link>
        </div>
        <SignupSeller />
      </div>
    )
  }
}

export default compose(
  withRouter,
  withContext
)(SignupSellerPage)
