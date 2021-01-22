import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Promotion } from '../Promotion.type'
import DateComponent from '../../nav/DateComponent'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
// import Icon from '@material-ui/core/Icon'
// import DeletePromotion from './DeletePromotion'
// import PromotionForm from './form/PromotionForm'
// import { Product } from '../product/Product.type'
// import utils from '../utils'

type Props = {
  promotion: Promotion
  // product: Product
}
const SinglePromotionAdmin = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            <div>
              <Link className="link" to={`/product/${props.promotion.product.id}`}>
                {props.promotion.product.name}
              </Link>
            </div>
            <div>
              <Link className="link" to={`/admin/product/${props.promotion.product.id}?tab=Promotion`}>
                Promotion
              </Link>
            </div>
            <div>
              <Link className="link" to={`/adminInvoices/?promotionId=${props.promotion.id}`}>
                Transactions
              </Link>
            </div>
            <div>
              <Link className="link" to={`/logs?promotionId=${props.promotion.id}`}>
                Logs
              </Link>
            </div>
            {/* {props.promotion.isPromotionLive && <span className="secondary">LIVE</span>} */}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {'startAt: '} <DateComponent date={props.promotion.startAt} />
            <br />
            {'endAt: '} <DateComponent date={props.promotion.endAt} />
            <br />
            {'CreatedAt: '} <DateComponent date={props.promotion.createdAt} />
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {`Discount:`} {props.promotion.discount}%
            <br />
            {`type:`} {props.promotion.type}
          </Grid>
          <Grid item xs={12} sm={3} className="">
            {`text1:`} {props.promotion.text1}
            <br />
            {`text2:`} {props.promotion.text2}
            <br />
            {`text3:`} {props.promotion.text3}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SinglePromotionAdmin
