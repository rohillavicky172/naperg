import React from 'react'
import Grid from '@material-ui/core/Grid'
import { flowRight as compose } from 'lodash'
import { withRouter, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'
// import { Companie } from '../../companie/Companie.type'
import Card from '@material-ui/core/Card'
import IconAdminDashboard from './IconAdminDashboard'
import InvoicesGraph from '../../invoice/list/graph/InvoicesGraph'
// import AdminDashboardYearly from './AdminDashboardYearly'
// import InvoicesDashboardAdminQuery from '../../invoice/list/InvoicesDashboardAdminQuery'
// import StripeBalanceRetrieve from '../../stripeData/StripeBalanceRetrieve'
import './Style.css'
import UseWindowDimensions from '../../UseWindowDimensions'
// import utils from '../../utils'
// import InvoicesGraphDaily from '../../invoice/list/InvoicesGraphDaily'
// const queryString = require('query-string')

type State = {}
type Props = {
  context: Context
  // companie: Companie,
  location: Location
}

class AdminDashboardLight extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    // const dateMin = utils.removeTime(new Date())
    // let dateMax = utils.removeTime(new Date())
    // dateMax.setDate(dateMax.getDate() + 1)

    // const isLight = queryString.parse(this.props.location.search).isLight === 'true' ? true : false

    return (
      <>
        <div className="tac">
          <h2>{`Dashboard Admin`}</h2>
          <IconAdminDashboard />
        </div>

        <Grid item sm={12} xs={12} className="">
          <div className="paperOut">
            <Card className="paperIn bgGrey">
              <div style={{ height: isMobile ? '250px' : '350px' }}>
                <InvoicesGraph
                  title={`NachoNacho GMV`}
                  showIsCumulative={true}
                  hideLastMonth={true}
                  showTotal={true}
                  variables={{
                    includesRefund: false,
                    side: 'PAYMENT',
                    where: {},
                  }}
                />
              </div>
            </Card>
          </div>
        </Grid>

        <Grid container>
          <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <h3>{`Admin Links`}</h3>
                {/* 
                <div className="paperOut">
                  <Link to="/invoicesSumPerMonthPerCompanies?isPersonal=ALL&side=PAYMENT&statusInvoices=SUCCESSFUL&statusInvoices=PENDING">
                    <Button color="primary" variant="outlined">{`Invoices Sum per Month per Companies`}</Button>
                  </Link>
                </div>
                <div className="paperOut">
                  <Link to="/invoicesSumPerMonthPerProducts?isPersonal=ALL&orderBy=amountInvoices_ASC">
                    <Button color="primary" variant="outlined">{`Invoices Sum per Month per Products`}</Button>
                  </Link>
                </div> */}
                <div className="paperOut">
                  <Link to="/plaids">
                    <Button color="primary" variant="outlined">{`plaids`}</Button>
                  </Link>
                </div>
                <div className="paperOut">
                  <Link to="/plaidBalanceHistorical">
                    <Button color="primary" variant="outlined">{`plaidBalanceHistorical`}</Button>
                  </Link>
                </div>
              </Card>
            </div>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default compose(withContext, withRouter)(AdminDashboardLight)
