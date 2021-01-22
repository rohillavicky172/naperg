
import React from 'react'
import { History } from '../../../History.type'
import PhoneLogic from './PhoneLogic'
import UserPhoneView from '../profile/sectionDetails/UserPhoneView'
import Button from '@material-ui/core/Button'
import { User } from '../../User.type'
import { Location } from '../../../Location.type'
import { withRouter } from 'react-router'
const queryString = require('query-string')

type State = {
  // isEditMode: boolean,
  step: number
}

type Props = {
  history: History,
  location: Location,
  user: User
}

class PhoneLogicContainer extends React.Component<Props, State> {
  state = {
    // isEditMode: false,
    step: 1
  }
  changeEditMode = (isEditMode: boolean) => {
    // this.setState({ isEditMode: !this.state.isEditMode })
    const parsed = queryString.parse(this.props.location.search)
    parsed.isEditMode = isEditMode
    this.props.history.push('?' + queryString.stringify(parsed))
  }
  render() {
    const parsed = queryString.parse(this.props.location.search)
    const isEditMode = parsed.isEditMode === 'true' ? true : false
    return (
      <>
        {isEditMode ? (
          <div className="responsiveMargin1">
            <PhoneLogic
              showCancelButton={true}
              user={this.props.user}
              onCancel={() => this.changeEditMode(false)}
              onUpdate={() => this.changeEditMode(false)}
            />
          </div>
        ) : (
          <>
            <div className="tar">
              <Button color={'primary'} variant="outlined" size="small" onClick={() => this.changeEditMode(true)}>
                {`Edit`}
              </Button>
            </div>
            <UserPhoneView user={this.props.user} />
          </>
        )}
      </>
    )
  }
}

export default withRouter(PhoneLogicContainer)
