import React from 'react'
import { BankTypeBusinessStructure } from '../../onboarding/BankTypeBusinessStructure'
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

class SingleCompanieView extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Account Type:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {'Company/Group Account'}
          </Grid>
        </Grid>
        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Company Name:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.companie.name}
          </Grid>
        </Grid>

        {this.props.context.userRoleCompanie.permissions.includes('canSeeBeneficialOwnership') && (
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              {`Legal Business Name:`}
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {this.props.companie.registeredBusinessName}
            </Grid>
          </Grid>
        )}

        <Grid container alignItems="flex-end">
          <Grid item xs={12} md={4} className="bold">
            {`Website:`}
          </Grid>

          <Grid item xs={12} md={8}>
            {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
            {this.props.companie.website}
          </Grid>
        </Grid>

        {this.props.context.userRoleCompanie.permissions.includes('canSeeBeneficialOwnership') && (
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              {`Type of Business:`}
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {
                BankTypeBusinessStructure.filter(
                  (bankTypeBusinessStructureSingle) =>
                    this.props.companie.typeBusinessStructure === bankTypeBusinessStructureSingle.value
                )[0].name
              }
            </Grid>
          </Grid>
        )}
        {this.props.context.userRoleCompanie.permissions.includes('canSeeBeneficialOwnership') && (
          <Grid container alignItems="flex-end">
            <Grid item xs={12} md={4} className="bold">
              {`EIN number:`}
            </Grid>

            <Grid item xs={12} md={8}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {this.props.companie.registrationNumber}
            </Grid>
          </Grid>
        )}
      </>
    )
  }
}

export default withContext(SingleCompanieView)
