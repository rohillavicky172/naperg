
import React from 'react'

import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'

import { Product } from '../../Product.type'
import { withContext } from '../../../withContext'
import { Context } from '../../../Context.type'
import Icon from '@material-ui/core/Icon'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

type State = {}

type Props = {
  context: Context,
  product: Product
}

class IssuedCardActionLink extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn bgGrey">
          <Grid container>
            <Grid item xs={6} className="tal">
              <Icon className="textSize14">add_shopping_cart</Icon>
            </Grid>
            <Grid item xs={6} className="tar">
              {/* <CloseOnboardingNotice companieId={this.props.companieId} type={this.props.type}/> */}
            </Grid>
          </Grid>

          <div className="textSize11 responsiveMargin2">
            {`
          You can now use this NachoCard to pay ${this.props.product.name}. 
          Log into the vendor's site and enter this NachoCard as the payment method.`}
          </div>
          {this.props.product.sellerLink && (
            <div className="tac paperIn">
              <a target="_blank" rel="noopener noreferrer" href={this.props.product.sellerLink}>
                <Button color="secondary" variant="contained">{`Go to Vendor's Website`}</Button>
              </a>
            </div>
          )}
        </Paper>
      </div>
    )
  }
}

export default compose(
  withRouter,
  withContext
)(IssuedCardActionLink)
