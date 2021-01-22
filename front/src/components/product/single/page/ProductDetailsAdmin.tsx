import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import ManageDataProductAdmin from '../../../dataProduct/ManageDataProductAdmin'
import Button from '@material-ui/core/Button'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { Product } from '../../Product.type'
import InvoicesGraph from '../../../invoice/list/graph/InvoicesGraph'
import MergeProduct from '../action/MergeProduct'
import ManagePositionProduct from '../../../positionProduct/ManagePositionProduct'
import DeleteProduct from '../action/DeleteProduct'
import UseWindowDimensions from '../../../UseWindowDimensions'
import ProductPageDescription from './ProductPageDescription'
import DateComponent from '../../../nav/DateComponent'
import CreateCustomLink from '../../../customLink/single/CreateCustomLink'
import CustomLinksQuery from '../../../customLink/list/CustomLinksQuery'

type Props = {
  companieId: string
  userId: string
  product: Product
}

const ProductDetailsAdmin = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Merge product</h3>
          <MergeProduct product={props.product} />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Details of {props.product.name}</h3>
          <div>visibility: {props.product.visibility}</div>
          <div>subName: {props.product.subName}</div>
          <div>levelBtoB: {props.product.levelBtoB}%</div>
          <div>typeProduct: {props.product.typeProduct}</div>
          <div>productFrequency: {props.product.productFrequency}</div>
          <div>
            createdAt: <DateComponent date={props.product.createdAt} />{' '}
          </div>
          <div>creationType: {props.product.creationType}</div>
          <div>urlName: {props.product.urlName}</div>
          <div>privateData: {props.product.privateData}</div>
          <div>sellerLink: {props.product.sellerLink}</div>
        </Paper>
      </div>

      <ProductPageDescription product={props.product} />
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Company Owner of {props.product.name}</h3>
          {props.product.ownerCompanie && (
            <Link className="link" to={`/company/${props.product.ownerCompanie.id}?mode=productOwner`}>
              {props.product.ownerCompanie.name}
            </Link>
          )}
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <ManageDataProductAdmin productId={props.product.id} userId={props.userId} companieId={props.companieId} />
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <h2>{`Admin`}</h2>

          <Link className="margin4" to={'/invoicesCompany/' + props.companieId + '?productId=' + props.product.id}>
            <Button color="primary" variant="outlined">{`Transactions in ${context.userRoleCompanie.companie.name}`}</Button>
          </Link>

          <Link className="margin4" to={'/subscriptionsCompany/' + props.companieId + '?productId=' + props.product.id}>
            <Button color="primary" variant="outlined">{`Subscriptions in ${context.userRoleCompanie.companie.name}`}</Button>
          </Link>

          <Link className="margin4" to={'/adminInvoices/1/?productId=' + props.product.id}>
            <Button color="primary" variant="outlined">{`Transactions (admin)`}</Button>
          </Link>
          <Link className="margin4" to={'/subscriptionsAdmin/1/?productId=' + props.product.id}>
            <Button color="primary" variant="outlined">{`Subscriptions (admin)`}</Button>
          </Link>
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn bgGrey">
          <div style={{ height: isMobile ? '200px' : '400px' }}>
            <InvoicesGraph
              title={`Monthly spend on ${props.product.name} (admin)`}
              showIsCumulative={true}
              showTotal={false}
              variables={{
                side: 'ISSUING',
                includesRefund: true,
                where: {
                  product: {
                    id: { equals: props.product.id },
                  },
                },
              }}
            />
          </div>
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>CustomLink</h3>
          <CreateCustomLink productId={props.product.id} />
          <CustomLinksQuery productId={props.product.id} />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <ManagePositionProduct product={props.product} />
        </Paper>
      </div>

      <div className="paperOut">
        <Paper className="paperIn">
          <DeleteProduct redirectAfter={'/'} product={props.product} />
        </Paper>
      </div>
    </>
  )
}

export default ProductDetailsAdmin
