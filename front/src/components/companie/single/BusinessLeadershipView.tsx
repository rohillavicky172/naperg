import React from 'react'
import { Companie } from '../Companie.type'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import UseWindowDimensions from '../../UseWindowDimensions'

type State = {}
type Props = {
  companie: Companie
  context: Context
}

class BusinessLeadershipView extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`First name:`}
          </Grid>
          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.companie.leadershipFirstName}
          </Grid>
        </Grid>

        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Last Name:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.companie.leadershipLastName}
          </Grid>
        </Grid>

        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Role:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.companie.leadershipTitle}
          </Grid>
        </Grid>

        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Phone:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.companie.leadershipPhone && (
              <>
                {this.props.companie.leadershipPhoneCode} {this.props.companie.leadershipPhone}
              </>
            )}
          </Grid>
        </Grid>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Email:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.companie.leadershipEmail}
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withContext(BusinessLeadershipView)
