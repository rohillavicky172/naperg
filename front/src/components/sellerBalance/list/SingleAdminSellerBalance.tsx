import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import utils from '../../utils'
import { SellerBalance } from '../SellerBalance.type'
import { Link } from 'react-router-dom'
import IsValidated from '../../user/single/profile/sectionDetails/IsValidated'
import DateComponent from '../../nav/DateComponent'
import DeleteSellerBalance from '../DeleteSellerBalance'

type Props = {
  sellerBalance: SellerBalance
}

const SingleAdminSellerBalance = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn bgHover">
        <Grid container>
          <Grid item xs={12} sm={2}>
            <DateComponent date={props.sellerBalance.createdAt} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <div>
              <Link className="link" to={'/company/' + props.sellerBalance.companie.id}>
                {props.sellerBalance.companie.name}
              </Link>
              <IsValidated
                iconNotValidated={'clear'}
                icon={'done'}
                isValidated={props.sellerBalance.companie.isTrustedPayment}
                textValidated={'Company Trusted'}
                textNotValidated={'Company not Trusted'}
              />
            </div>
            <div>{props.sellerBalance.companie.typeCreation}</div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link className="link" to={'/admin/product/' + props.sellerBalance.product.id}>
              {props.sellerBalance.product.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <div>revshareSellerTotal: {utils.priceFormated(props.sellerBalance.revshareSellerTotal, 'usd')}</div>
            <div>revshareSellerTotalPaid: {utils.priceFormated(props.sellerBalance.revshareSellerTotalPaid, 'usd')}</div>
          </Grid>

          <Grid item xs={12} sm={2}>
            <DeleteSellerBalance sellerBalance={props.sellerBalance} />
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleAdminSellerBalance
