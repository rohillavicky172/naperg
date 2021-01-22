import React from 'react'
import Grid from '@material-ui/core/Grid'
import { flowRight as compose } from 'lodash'
import { withRouter } from 'react-router-dom'
import IconAdminDashboard from './IconAdminDashboard'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'

import { Location } from '../../Location.type'
import { Companie } from '../../companie/Companie.type'
import Card from '@material-ui/core/Card'
// import BalanceAdmin from '../../invoice/list/BalanceAdmin'
// import InvoicesGraph from '../../invoice/list/InvoicesGraph'
// import InvoicesDashboardQuery from '../../invoice/list/InvoicesDashboardQuery'
import './Style.css'
import utils from '../../utils'
import InvoicesGraphDaily from '../../invoice/list/graph/InvoicesGraphDaily'
import UseWindowDimensions from '../../UseWindowDimensions'
// const queryString = require('query-string')

type State = {
  dateMin: Date
  dateMax: Date
}
type Props = {
  context: Context
  companie: Companie
  location: Location
}

class AdminDashboardYearly extends React.Component<Props, State> {
  state = {
    dateMin: new Date(),
    dateMax: new Date(),
  }

  componentDidMount = () => {
    const dateMin = utils.removeTime(new Date())
    let dateMax = utils.removeTime(new Date())
    dateMax.setDate(dateMax.getDate() + 1)
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
          <h2>{`Dashboard Admin Daily`}</h2>
          <IconAdminDashboard />
        </div>

        <Grid container>
          <h3>Without Refund</h3>

          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraphDaily
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
                  <InvoicesGraphDaily
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
                  <InvoicesGraphDaily
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
                  <InvoicesGraphDaily
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

export default compose(withContext, withRouter)(AdminDashboardYearly)
