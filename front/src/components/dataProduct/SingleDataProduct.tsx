import React from 'react'
// import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import UpdateDataProduct from './form/UpdateDataProduct'
import { DataProduct } from './DataProduct.type'

type State = {
  isEditMode: boolean
}
type Props = {
  dataProduct: DataProduct
}

class SingleDataProduct extends React.Component<Props, State> {
  state = {
    isEditMode: false
  }

  changeEditMode = () => {
    this.setState({ isEditMode: !this.state.isEditMode })
  }

  render() {
    return (
      <>
        {this.state.isEditMode ? (
          <>
            <UpdateDataProduct
              dataProduct={this.props.dataProduct}
              onCancel={this.changeEditMode}
              onUpdate={this.changeEditMode}
            />
          </>
        ) : (
          <>
            <Grid container>
              <Grid item sm={6} xs={6} className="marginAuto">
                {/* {`Name of product: `} {this.props.dataProduct.productName}
                <br />
                {`Vendor's website: `} {this.props.dataProduct.website}
                <br /> */}
                {this.props.dataProduct.note}

                {/* Category: {this.props.dataProduct.category} */}
              </Grid>
              <Grid item sm={6} xs={6} className="tar">
                <Button variant="outlined" color="primary" onClick={this.changeEditMode}>
                  Edit
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </>
    )
  }
}

export default SingleDataProduct
