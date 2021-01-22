
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Addresse } from './Addresse.type'
import { withContext } from '../withContext'
import { Context } from '../Context.type'
import utils from '../utils'

type State = {}
type Props = {
  title: string,
  context: Context,
  addresse: Addresse
}

class SingleAddresseView extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <h3>{this.props.title}</h3>
          </Grid>
          <Grid item xs={12}>
            {this.props.addresse.name}
          </Grid>
          <Grid item xs={12}>
            {this.props.addresse.address1}
          </Grid>
          <Grid item xs={12}>
            {this.props.addresse.address2}
          </Grid>
          <Grid item xs={12}>
            {this.props.addresse.city}, {utils.getLabelState(this.props.addresse.country, this.props.addresse.state)}{' '}
            {this.props.addresse.zip}
          </Grid>

          <Grid item xs={12}>
            {utils.getLabelCountry(this.props.addresse.country)}
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withContext(SingleAddresseView)
