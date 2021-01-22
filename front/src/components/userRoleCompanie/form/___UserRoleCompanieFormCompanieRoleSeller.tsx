import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import { Product } from '../../product/Product.type'
// import UpdateCompanieRole from './UpdateCompanieRole'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { UserRoleCompanie } from '../UserRoleCompanie.type'

type State = {
  userRoleCompanie: UserRoleCompanie
}
type Props = {
  context: Context
  createCompanie: any
  product: Product
  typeField: string
  userRoleCompanie: UserRoleCompanie
  onUpdated: () => void
  onCancel: () => void
}

class UserRoleCompanieFormCompanieRoleSeller extends React.Component<Props, State> {
  state = {
    userRoleCompanie: this.props.userRoleCompanie
  }

  handleChange = event => {
    this.setState({
      userRoleCompanie: {
        ...this.state.userRoleCompanie,
        companieRole: event.target.value
      }
    })
  }

  render() {
    return (
      <>
        <div>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              value={this.state.userRoleCompanie.companieRole}
              onChange={this.handleChange}>
              <FormControlLabel
                value="ADMIN"
                control={<Radio />}
                label={
                  <div>
                    Seller Admin <span className="textSize6 grey">{`(Can ...)`}</span>
                  </div>
                }
              />

              {/* <FormControlLabel
                value="ANALYST"
                control={<Radio />}
                label={
                  <div>
                    Seller Analyst <span className="textSize6 grey">{`(Can ...)`}</span>
                  </div>
                }
              /> */}
              <FormControlLabel
                value="NONE"
                control={<Radio />}
                label={
                  <div>
                    None <span className="textSize6 grey">{`(Can ...)`}</span>
                  </div>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          {/* <UpdateCompanieRole
            onUpdated={this.props.onUpdated}
            onCancel={this.props.onCancel}
            userRoleCompanie={this.state.userRoleCompanie}
          /> */}
        </div>
      </>
    )
  }
}

export default withContext(UserRoleCompanieFormCompanieRoleSeller)
