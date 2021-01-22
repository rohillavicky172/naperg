import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import { Product } from '../../product/Product.type'
import UpdateCompanieRole from './UpdateCompanieRole'
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

class UserRoleCompanieFormCompanieRole extends React.Component<Props, State> {
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
              {this.props.context.userRoleCompanie.permissions &&
                this.props.context.userRoleCompanie.permissions.includes('canEditRoleUserToAdmin') && (
                  <FormControlLabel
                    value="ADMIN"
                    control={<Radio />}
                    label={
                      <div>
                        Admin{' '}
                        <span className="textSize6 grey">{`(Can add payment source, create NachoCards, set budgets, invite members, assign roles)`}</span>
                      </div>
                    }
                  />
                )}
              {this.props.context.userRoleCompanie.permissions &&
                this.props.context.userRoleCompanie.permissions.includes('canEditRoleUserToPurchaser') && (
                  <FormControlLabel
                    value="PURCHASER"
                    control={<Radio />}
                    label={
                      <div>
                        Purchaser <span className="textSize6 grey">{`(Can subscribe using NachoCards created by Admins)`}</span>
                      </div>
                    }
                  />
                )}
              {this.props.context.userRoleCompanie.permissions &&
                this.props.context.userRoleCompanie.permissions.includes('canEditRoleUserToAnalyst') && (
                  <FormControlLabel
                    value="ANALYST"
                    control={<Radio />}
                    label={
                      <div>
                        Analyst <span className="textSize6 grey">{`(Can view everything, cannot use NachoCards)`}</span>
                      </div>
                    }
                  />
                )}
            </RadioGroup>
          </FormControl>
        </div>

        <div>
          <UpdateCompanieRole
            disabled={this.props.userRoleCompanie.companieRole === this.state.userRoleCompanie.companieRole}
            onUpdated={this.props.onUpdated}
            onCancel={this.props.onCancel}
            userRoleCompanie={this.state.userRoleCompanie}
          />
        </div>
      </>
    )
  }
}

export default withContext(UserRoleCompanieFormCompanieRole)
