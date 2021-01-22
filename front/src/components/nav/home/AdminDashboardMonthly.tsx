import React from 'react'
import Grid from '@material-ui/core/Grid'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'
import { Companie } from '../../companie/Companie.type'
import Card from '@material-ui/core/Card'
import UseWindowDimensions from '../../UseWindowDimensions'
import IconAdminDashboard from './IconAdminDashboard'
import './Style.css'
import InvoicesGraphMonthly from '../../invoice/list/graph/InvoicesGraphMonthly'
// import Button from '@material-ui/core/Button'
// import BalanceAdmin from '../../invoice/list/BalanceAdmin'
// import InvoicesGraph from '../../invoice/list/InvoicesGraph'
// import InvoicesDashboardQuery from '../../invoice/list/InvoicesDashboardQuery'
// import utils from '../../utils'
// const queryString = require('query-string')

import { startOfMonth, endOfMonth } from 'date-fns'

// var startOfMonth = require('date-fns/startOfMonth')
// var endOfMonth = require('date-fns/endOfMonth')

type State = {
  dateMin: Date
  dateMax: Date
}
type Props = {
  context: Context
  companie: Companie
  location: Location
}

class AdminDashboardMonthly extends React.Component<Props, State> {
  state = {
    dateMin: new Date(),
    dateMax: new Date(),
  }

  componentDidMount = () => {
    const dateMin = startOfMonth(new Date())
    let dateMax = endOfMonth(new Date())
    dateMax.setDate(dateMax.getDate())
    this.setState({
      dateMin,
      dateMax,
    })
  }
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <div className="tac">
          <h2>{`Dashboard Admin Monthly`}</h2>
          <IconAdminDashboard />
        </div>

        <Grid container>
          <h3>Without Refund</h3>

          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraphMonthly
                    title={`App Payment side`}
                    showIsCumulative={true}
                    showTotal={true}
                    variables={{
                      side: 'PAYMENT',
                      includesRefund: false,
                      where: {
                        dateInvoice: { gte: this.state.dateMin, lt: this.state.dateMax },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </Grid>
          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraphMonthly
                    title={`App Issuing side`}
                    showIsCumulative={true}
                    showTotal={true}
                    variables={{
                      side: 'ISSUING',
                      includesRefund: false,
                      where: {
                        dateInvoice: { gte: this.state.dateMin, lt: this.state.dateMax },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </Grid>
          <h3>With Refund</h3>

          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraphMonthly
                    title={`App Payment side`}
                    showIsCumulative={true}
                    showTotal={true}
                    variables={{
                      side: 'PAYMENT',
                      includesRefund: true,
                      where: {
                        dateInvoice: { gte: this.state.dateMin, lt: this.state.dateMax },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </Grid>
          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraphMonthly
                    title={`App Issuing side`}
                    showIsCumulative={true}
                    showTotal={true}
                    variables={{
                      side: 'ISSUING',
                      includesRefund: true,
                      where: {
                        dateInvoice: { gte: this.state.dateMin, lt: this.state.dateMax },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default compose(withContext, withRouter)(AdminDashboardMonthly)
