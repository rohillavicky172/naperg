import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import UserRoleCompanieMenuList from '../../../userRoleCompanie/list/UserRoleCompanieMenuList'

type State = {}

type Props = {
  showCreateCompanie: boolean
  context: Context
  onClose: () => void
}

class MenuListLeft extends React.Component<Props, State> {
  onClose = () => {
    this.props.onClose()
  }

  render() {
    return (
      <>
        {this.props.context.me && this.props.context.userRoleCompanie && (
          <UserRoleCompanieMenuList
            onClose={this.props.onClose}
            variables={{
              where: {
                user: { id: this.props.context.me.id },
                isInvitationApproved: true,
                isDeleted: false,
                companie: {
                  deletedLogically: false,
                },
              },
            }}
          />
        )}
        {this.props.showCreateCompanie && (
          <Link to={'/company/createCompany'}>
            <MenuItem onClick={this.props.onClose}>
              <Grid container>
                <Grid item xs={2} className=""></Grid>
                <Grid item xs={10} className="">
                  {`+ Buyer Account`}
                </Grid>
              </Grid>
            </MenuItem>
          </Link>
        )}
      </>
    )
  }
}

export default withContext(MenuListLeft)
