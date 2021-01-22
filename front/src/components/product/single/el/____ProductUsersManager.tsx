import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Product } from '../../Product.type'

type State = {}
type Props = {
  product: Product
  showTitle: boolean
}

class ProductUsersManager extends React.Component<Props, State> {
  render() {
    return (
      <>
        <div className="paperOut">
          <Paper className="paperIn">
            {this.props.showTitle && <h2>{`Admins _`}</h2>}
            {/* {this.props.product.owners.map(user => (
              <Grid key={user.id} container>
                <Grid item xs={12} sm={4}>
                  {user.email}
                </Grid>
                <Grid item xs={6} sm={4}>
                  {user.firstName}
                </Grid>
                <Grid item xs={6} sm={4}>
                  {user.lastName}
                </Grid>
              </Grid>
            ))} */}
          </Paper>
        </div>
      </>
    )
  }
}

export default ProductUsersManager
