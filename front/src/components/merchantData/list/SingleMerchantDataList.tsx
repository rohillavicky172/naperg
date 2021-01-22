import React from 'react'
import { Grid, Paper } from '@material-ui/core'

import { MerchantData } from '../MerchantData.type'
import SingleMerchantData from '../SingleMerchantData'

type Props = {
  merchantData: MerchantData
}

const SingleMerchantDataList = (props: Props) => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <Grid container>
          <Grid item xs={12} sm={3} className="">
            id: {props.merchantData.id}
          </Grid>
          <Grid item xs={12} sm={12} className="">
            <SingleMerchantData product={props.merchantData.product} merchantData={props.merchantData} />
          </Grid>

          {/* 
          <Grid item xs={12} sm={2} className="">
            <Link className="link" to={`/product/${props.campaign.product.id}`}>
              {props.campaign.product.name}
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} className="">
            {props.campaign.origin} <br />
            <a itemProp="sameAs" rel="noopener noreferrer" target="_blank" href={props.campaign.link}>
              {props.campaign.link}
            </a>
          </Grid> */}
        </Grid>
      </Paper>
    </div>
  )
}

export default SingleMerchantDataList
