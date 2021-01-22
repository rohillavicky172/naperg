import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconAdminDashboard from './IconAdminDashboard'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import { Companie } from '../../companie/Companie.type'
import { Product } from '../../product/Product.type'
import Card from '@material-ui/core/Card'
import InvoicesGraph from '../../invoice/list/graph/InvoicesGraph'
import UseWindowDimensions from '../../UseWindowDimensions'
import './Style.css'

type State = {}
type Props = {
  context: Context
  companie: Companie
  product: Product
}

class DashboardSeller extends React.Component<Props, State> {
  render() {
    const isMobile = UseWindowDimensions.isMobile()
    return (
      <>
        <div className="tac">
          <IconAdminDashboard />
        </div>

        <Grid container>
          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraph
                    title={`Monthly revenue for ${this.props.product.name}`}
                    showIsCumulative={true}
                    showTotal={false}
                    variables={{
                      side: 'ISSUING',
                      includesRefund: true,
                      where: {
                        product: {
                          id: { equals: this.props.product.id },
                        },
                        // subscriptionInvoice: {
                        //   subscription: {
                        //     product: {
                        //       id: { equals: this.props.product.id },
                        //     },
                        //   },
                        // },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </Grid>
          {/* <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="bgGrey cardDashboard">
                <InvoicesDashboardQuery
                  title={`Recent transactions`}
                  companie={companie}
                  variables={{
                    where: {
                      testMode: this.props.context.testMode,
                      subscriptionInvoice: {
                        subscription: {
                          product: {
                            id: this.props.product.id
                          }
                        }
                      },
                      status_in: ['SUCCESSFUL', 'PENDING']
                    },
                    first: 3,
                    orderBy: 'createdAt_DESC'
                  }}
                />
              </Card>
            </div>
          </Grid> */}
          {/* <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="bgGrey cardDashboard">
                <SubscriptionsDashboardQuery
                  title={`Recent subscriptions`}
                  companie={companie}
                  variables={{
                    orderBy: 'createdAt_DESC',
                    where: {
                      testMode: this.props.context.testMode,

                      product: {
                        id: this.props.product.id
                      },

                      // status_in: ['SUCCESSFUL', 'PENDING'],

                      // companie: {
                      //   id: companie.id
                      // },
                      issuedCard: {
                        status: 'active'
                      }
                    },
                    first: 3
                  }}
                />
              </Card>
            </div>
          </Grid> */}

          {/* <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="bgGrey cardDashboard">
                <IssuingCardsDashboardQuery
                  title={`Recent NachoCards`}
                  companie={companie}
                  variables={{
                    first: 3,
                    orderBy: 'createdAt_DESC',
                    where: {
                      status: 'active',
                      companie: {
                        id: companie.id
                      }
                    }
                  }}
                />
              </Card>
            </div>
          </Grid> */}

          {/* <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="bgGrey cardDashboard">
                <UsersQueryDashboard
                  companie={companie}
                  variables={{
                    where: {
                      userRoleCompanies_some: {
                        companie: {
                          id: companie.id
                        }
                      }
                    }
                  }}
                />
              </Card>
            </div>
          </Grid> */}
        </Grid>
      </>
    )
  }
}

export default withContext(DashboardSeller)
