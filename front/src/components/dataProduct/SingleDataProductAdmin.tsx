import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'
import { DataProduct } from './DataProduct.type'
import DateComponent from '../nav/DateComponent'

type State = {
  isEditMode: boolean
}
type Props = {
  dataProduct: DataProduct
}

class SingleDataProductAdmin extends React.Component<Props, State> {
  render() {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item sm={6} xs={6} className="">
              {`Company: `}{' '}
              <Link className="link" to={'/company/' + this.props.dataProduct.companie.id}>
                {this.props.dataProduct.companie.name}
              </Link>
              <br />
              {`User: `}{' '}
              <Link className="link" to={'/user/' + this.props.dataProduct.user.id}>
                {this.props.dataProduct.user.firstName} {this.props.dataProduct.user.lastName}
              </Link>
              <br />
              {`Original product: `}{' '}
              {/* <Link
                className="link"
                to={'/product/' + this.props.dataProduct.product.id + '/' + this.props.dataProduct.product.name}>
                {this.props.dataProduct.product.name}
              </Link> */}
              <br />
              {`Created At: `}
              <DateComponent date={this.props.dataProduct.createdAt} />
              <br />
              {/* {`Name of product: `} {this.props.dataProduct.productName}
              <br />
              {`Vendor's website: `} {this.props.dataProduct.website} */}
              <br />
              {`Note `} {this.props.dataProduct.note}
              <br />
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default SingleDataProductAdmin
