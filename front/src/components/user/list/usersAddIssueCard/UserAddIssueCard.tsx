import React from 'react'
import { flowRight as compose } from 'lodash'
// import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
// import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withRouter, Link } from 'react-router-dom'
import { withContext } from '../../../withContext'
import { Location } from '../../../Location.type'
import { Context } from '../../../Context.type'
import ImageTemplate from '../../../nav/ImageTemplate'

import { User } from '../../../user/User.type'

const queryString = require('query-string')

type State = {}

type Props = {
  user: User
  context: Context
  location: Location
}

class UserAddIssueCard extends React.Component<Props, State> {
  render() {
    const parsed = queryString.parse(this.props.location.search)

    const isUserMyself = this.props.context.me.id === this.props.user.id
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} sm={1} className="marginAuto">
              <ImageTemplate format={'avatar'} nameFile={this.props.user.nameFile} />
            </Grid>

            <Grid item xs={12} sm={4} className="marginAuto">
              <span className={isUserMyself ? 'secondary' : ''}>
                {this.props.user.firstName} {this.props.user.lastName}
              </span>
            </Grid>

            <Grid item xs={12} sm={3} className="marginAuto">
              {this.props.user.email}
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              {this.props.user.userRoleCompanies[0].companieRole}
            </Grid>
            <Grid item xs={12} sm={2} className="marginAuto">
              {this.props.context.userRoleCompanie.permissions.includes('canCreateIssuedCardsInCompanie') && (
                <>
                  {this.props.user.userRoleCompanies[0].permissions.includes('canSeeMyIssuedCards') && (
                    <Link to={`/createIssuedCard/${this.props.user.id}?${queryString.stringify(parsed)}`}>
                      <Button variant="outlined" color="primary">{`Assign`}</Button>
                    </Link>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default compose(withContext, withRouter)(UserAddIssueCard)
