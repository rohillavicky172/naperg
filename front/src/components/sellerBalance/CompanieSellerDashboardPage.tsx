import React from 'react'
import Error from '../nav/error/Error'
import NotFound from '../nav/error/NotFound'
import Loading from '../nav/error/Loading'
import { useParams } from 'react-router'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { ParamTypes } from '../ParamTypes.type'
import { SellerBalance } from './SellerBalance.type'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'
import utils from '../utils'
import CreateSellerBalance from './CreateSellerBalance'
import UpdateSellerBalance from './UpdateSellerBalance'
import { Button, Paper, Grid } from '@material-ui/core'
import DeleteSellerBalance from './DeleteSellerBalance'
import CreateInvoiceSellerPayment from '../invoice/list/sellerPayment/CreateInvoiceSellerPayment'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import InvoicesListQuerySellerPayment from '../invoice/list/sellerPayment/InvoicesListQuerySellerPayment'

const QUERY = gql`
  query SellerBalances($where: SellerBalanceWhereInput!) {
    sellerBalances(where: $where) {
      id
      product {
        id
        name
      }
      companie {
        id
        name
      }
      revshareSellerTotal
      revshareSellerTotalPaid
      revshareSellerTotalPaidPending
    }
  }
`

const CompanieSellerDashboardPage = () => {
  const first = 5
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  const page: number = parsed.page ? Number(parsed.page) : 1
  const { companieId }: ParamTypes = useParams<ParamTypes>()
  const { productId }: ParamTypes = useParams<ParamTypes>()
  const { context }: { context: Context } = React.useContext(AppContext)

  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      where: {
        companie: {
          id: companieId,
        },
        product: {
          id: { equals: productId },
        },
        testMode: context.testMode,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.sellerBalances) return <NotFound />

  if (data.sellerBalances.length === 0) {
    return <CreateSellerBalance productId={productId} companieId={companieId} />
  }
  return (
    <>
      {data.sellerBalances.map((sellerBalance: SellerBalance) => (
        <div key={sellerBalance.id}>
          <div className="paperOut">
            <h3>
              Revenue Share Dashboard for {sellerBalance.product.name} ({sellerBalance.companie.name})
            </h3>

            <Paper className="paperIn">
              <h3>Invoices</h3>
              <InvoicesListQuerySellerPayment
                page={page}
                variables={{
                  where: {
                    testMode: context.testMode,

                    type: 'SELLER_REVSHARE',

                    product: {
                      id: { equals: productId },
                    },
                  },
                  first,
                  orderBy: 'createdAt_DESC',
                  skip: (page - 1) * first,
                }}
              />
            </Paper>
          </div>

          {context.me.role === 'ADMIN' && (
            <div className="paperOut">
              <Paper className="paperIn">
                <h3>Admin</h3>

                <div>total: {utils.priceFormated(sellerBalance.revshareSellerTotal, 'usd')}</div>
                <div>paid Pending: {utils.priceFormated(sellerBalance.revshareSellerTotalPaidPending, 'usd')}</div>
                <div>paid: {utils.priceFormated(sellerBalance.revshareSellerTotalPaid, 'usd')}</div>

                <div>
                  to pay now:{' '}
                  {utils.priceFormated(sellerBalance.revshareSellerTotal - sellerBalance.revshareSellerTotalPaid, 'usd')}
                </div>
                <UpdateSellerBalance sellerBalance={sellerBalance} />
                <DeleteSellerBalance sellerBalance={sellerBalance} />

                <Link to={`/logs?sellerBalanceId=${sellerBalance.id}`}>
                  <Button>Log</Button>
                </Link>

                <div>
                  <CreateInvoiceSellerPayment companieId={companieId} productId={productId} />
                </div>
              </Paper>
            </div>
          )}
        </div>
      ))}

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>Payment methods</h3>
          <div className="paperOut">
            <Paper className="paperIn ">
              <Grid container>
                <Grid item xs={1} className="marginAuto">
                  <img alt="paypal" src="/icon/paypal-logo.png" width="18px" />
                </Grid>
                <Grid item xs={3} className="marginAuto">
                  PayPal
                </Grid>
                <Grid item xs={8} className="marginAuto">
                  paypal@nachonacho.com
                </Grid>
              </Grid>
            </Paper>
          </div>
        </Paper>
      </div>
    </>
  )
}

export default CompanieSellerDashboardPage
