import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Context } from '../../../Context.type'
import { AppContext } from '../../../AppContext'
import { Product } from '../../Product.type'
import InvoicesGraph from '../../../invoice/list/graph/InvoicesGraph'
import SubscriptionListQueryProduct from '../../../subscription/list/el/SubscriptionListQueryProduct'
import InvoiceListQueryProduct from '../../../invoice/list/InvoiceListQueryProduct'
import UseWindowDimensions from '../../../UseWindowDimensions'
// import ReviewLogic from '../../../review/ReviewLogic'

type Props = {
  companieId: string
  userId: string
  product: Product
}
const ProductActivity = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const companieName = context.userRoleCompanie.companie.name
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      {/* <ReviewLogic productId={props.product.id} userId={context.me.id} /> */}

      {context.userRoleCompanie.permissions.includes('canSeeSubscriptionsInCompanie') && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>{`Subscriptions for ${props.product.name}`}</h3>
            <div>
              <SubscriptionListQueryProduct
                companie={context.userRoleCompanie.companie}
                variables={{
                  first: 4,
                  orderBy: 'lastInvoiceDate_DESC',
                  where: {
                    product: {
                      id: { equals: props.product.id },
                    },
                    companie: {
                      id: props.companieId,
                    },
                  },
                }}
              />
            </div>
          </Paper>
        </div>
      )}

      {context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
        <div className="paperOut">
          <Paper className="paperIn bgGrey">
            <div style={{ height: isMobile ? '200px' : '400px' }}>
              <InvoicesGraph
                title={`Monthly spend by ${companieName} on ${props.product.name}`}
                showIsCumulative={true}
                showTotal={false}
                variables={{
                  side: 'ISSUING',
                  includesRefund: true,
                  where: {
                    companie: {
                      id: props.companieId,
                    },
                    product: {
                      id: { equals: props.product.id },
                    },

                    //   subscription: {
                    //     product: {
                    //       id: { equals: props.product.id },
                    //     },
                    //   },
                  },
                }}
              />
            </div>
          </Paper>
        </div>
      )}

      {context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
        <div className="paperOut">
          <Paper className="paperIn">
            <h3>{`Recent transactions for ${props.product.name}`}</h3>
            <div>
              <InvoiceListQueryProduct
                linkSeeMore={'/invoicesCompany/' + context.userRoleCompanie.companie.id + '?productId=' + props.product.id}
                textSeeMore={`See all transactions for ${props.product.name} in ${context.userRoleCompanie.companie.name}`}
                // companie={context.userRoleCompanie.companie}
                // product={props.product}
                variables={{
                  first: 4,
                  orderBy: 'createdAt_DESC',
                  where: {
                    subscription: {
                      product: {
                        id: { equals: props.product.id },
                      },
                    },
                    companie: {
                      id: props.companieId,
                    },
                  },
                }}
              />
            </div>
          </Paper>
        </div>
      )}

      {/* {props.product.subscriptions.length > 0 && (
          <div className="paperOut">
            <Paper className="paperIn">
              <ManageDataProduct
                productId={props.product.id}
                userId={context.me.id}
                companieId={this.props.companieId}
              />
            </Paper>
          </div>
        )} */}
    </>
  )
}

export default ProductActivity
