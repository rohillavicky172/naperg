import React from 'react'
import Grid from '@material-ui/core/Grid'
import { flowRight as compose } from 'lodash'
import IconAdminDashboard from './IconAdminDashboard'
import { withRouter } from 'react-router-dom'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Location } from '../../Location.type'
import { Companie } from '../../companie/Companie.type'
import UseWindowDimensions from '../../UseWindowDimensions'
import Card from '@material-ui/core/Card'
import './Style.css'
import InvoicesGraph from '../../invoice/list/graph/InvoicesGraph'

type State = {
  dateMin: Date
  dateMax: Date
}
type Props = {
  isLight: boolean
  context: Context
  companie: Companie
  location: Location
}

class AdminDashboardDaily extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <div className="tac">
          <h2>{`Dashboard Admin Yearly`}</h2>
          <IconAdminDashboard />
        </div>

        <Grid container>
          <h3>App Payment side</h3>
          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraph
                    title={`NachoNacho GMV`}
                    showIsCumulative={true}
                    hideLastMonth={false}
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

          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraph
                    title={`App Issuing side`}
                    showIsCumulative={true}
                    showTotal={true}
                    variables={{
                      includesRefund: false,
                      side: 'ISSUING',
                      where: {},
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
                  <InvoicesGraph
                    showIsCumulative={true}
                    title={`NachoNacho GMV`}
                    showTotal={true}
                    variables={{
                      includesRefund: true,
                      side: 'PAYMENT',
                      where: {},
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
                  <InvoicesGraph
                    title={`App Issuing side`}
                    showIsCumulative={true}
                    showTotal={true}
                    variables={{
                      includesRefund: true,
                      side: 'ISSUING',
                      where: {},
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

export default compose(withContext, withRouter)(AdminDashboardDaily)
