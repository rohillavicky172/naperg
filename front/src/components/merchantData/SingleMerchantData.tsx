import React from 'react'

import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import DeleteMerchantData from './DeleteMerchantData'
import { MerchantData } from './MerchantData.type'
import MerchantDataForm from './form/MerchantDataForm'
import { Product } from '../product/Product.type'
import { Link } from 'react-router-dom'
import DateComponent from '../nav/DateComponent'
import UpdateMerchantDataProductId from './form/UpdateMerchantDataProductId'
import SpreadProductIdFromMerchantData from './form/SpreadProductIdFromMerchantData'
import { Paper } from '@material-ui/core'

type Props = {
  merchantData: MerchantData
  product: Product
}

const SingleMerchantData = (props: Props) => {
  const [isEditMode, setIsEditMode] = React.useState(false)

  return (
    <>
      <Button onClick={() => setIsEditMode(true)}>
        <Icon>border_color</Icon>
      </Button>

      {isEditMode ? (
        <>
          <MerchantDataForm onCancel={() => setIsEditMode(false)} product={props.product} merchantData={props.merchantData} />

          <div className="paperOut">
            <Paper className="paperIn">
              <UpdateMerchantDataProductId merchantData={props.merchantData} />
            </Paper>
          </div>
          <div className="paperOut">
            <Paper className="paperIn">
              <SpreadProductIdFromMerchantData merchantData={props.merchantData} />
            </Paper>
          </div>
        </>
      ) : (
        <>
          <DeleteMerchantData product={props.product} merchantDataId={props.merchantData.id} />
          <br />
          {'CreatedAt: '} <DateComponent date={props.merchantData.createdAt} />
          <br />
          <div style={{ whiteSpace: 'pre' }}>
            {`type:`} {props.merchantData.type}
            <br />
            {`category:`} {props.merchantData.category}
            <br />
            {`city:`} {props.merchantData.city}
            <br />
            {`country:`} {props.merchantData.country}
            <br />
            {`name:`} {props.merchantData.name}
            <br />
            {`network_id:`} {props.merchantData.network_id}
            <br />
            {`postal_code:`} {props.merchantData.postal_code}
            <br />
            {`state:`} {props.merchantData.state}
            <br />
          </div>
          {`product:`}
          {props.merchantData.product && (
            <Link className="link" to={'/product/' + props.merchantData.product.id}>
              {props.merchantData.product.name}
            </Link>
          )}
          <br />
          <Link className="link" to={'/adminInvoices/?merchantDataId=' + props.merchantData.id}>
            {props.merchantData.invoices.length} Invoices
          </Link>
          {/* map((invoice) => (
            <span key={invoice.id}>
              <Link className="link" to={'/invoice/' + invoice.id}>
                {utils.smallIdFormat(invoice.smallId)}{' '}
              </Link>
            </span>
          ))} */}
        </>
      )}
    </>
  )
}

export default SingleMerchantData
