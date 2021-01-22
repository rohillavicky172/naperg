import React from 'react'
import ImageTemplate from '../../../nav/ImageTemplate'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Product } from '../../Product.type'
import ViewField from '../edit/wysiwyg/ViewField'
import '../Style.css'
import UseWindowDimensions from '../../../UseWindowDimensions'

type Props = {
  product: Product
}

const ProductPageDescription = (props: Props) => {
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <Grid container>
            <Grid item xs={12} md={12} className="tar">
              <Link to={`/productEdit/${props.product.id}`}>
                <Button id="editProductButton" color="primary" variant="outlined">
                  Edit
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Name:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.product.name}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Seller Link:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.product.sellerLink}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Short Description:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.product.shortDescription}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Description:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              <ViewField text={props.product.productDescription} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Logo:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.product.nameFile && <ImageTemplate format={'small'} nameFile={props.product.nameFile} />}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={3} className="bold">
              {`Banner:`}
            </Grid>
            <Grid item xs={12} md={9}>
              {isMobile && <Icon className="textSize9">subdirectory_arrow_right</Icon>}
              {props.product.nameFileBanner && <ImageTemplate format={'small'} nameFile={props.product.nameFileBanner} />}
            </Grid>
          </Grid>

          {/* <Grid container>
            <Grid item xs={12} sm={7}>
              <ViewField text={this.props.product.productDescription} />
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={4}>
              {this.props.product.nameFileBanner && (
                <div className="imageProductBanner tac">
                  <ImageTemplate format={'big'} nameFile={this.props.product.nameFileBanner} />
                </div>
              )}
            </Grid>
          </Grid> */}
        </Paper>
      </div>
    </>
  )
}

export default ProductPageDescription
