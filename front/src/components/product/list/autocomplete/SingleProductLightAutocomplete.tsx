
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Product } from '../../../product/Product.type'
// import '../Style.css'

import ImageTemplate from '../../../nav/ImageTemplate'

type State = {}

type Props = {
  product: Product,
  onClick: (product: Product) => void
}

class SingleProductLightAutocomplete extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut cursor">
        <Paper className="paperIn bgHover" onClick={() => this.props.onClick(this.props.product)}>
          <Grid container>
            <Grid item xs={6} sm={6}>
              <div style={{ height: '64px' }}>
                <ImageTemplate format="small" nameFile={this.props.product.nameFile} />
              </div>
            </Grid>
            <Grid item xs={6} sm={6} className="marginAuto">
              {this.props.product.name}
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default SingleProductLightAutocomplete
