import React from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconAdminDashboard from './IconAdminDashboard'

import { Companie } from '../../companie/Companie.type'
import Card from '@material-ui/core/Card'
import { Link } from 'react-router-dom'
import InvoicesGraph from '../../invoice/list/graph/InvoicesGraph'
import InvoicesDashboardQuery from '../../invoice/list/InvoicesDashboardQuery'
import SubscriptionsDashboardQuery from '../../subscription/list/el/SubscriptionsDashboardQuery'
import UsersQueryDashboard from '../../user/list/UsersQueryDashboard'
import IssuingCardsDashboardQuery from '../../issuedCard/list/IssuingCardsDashboardQuery'
import DashboardBalance from '../../balance/DashboardBalance'
import CardsDashboard from '../../card/CardsDashboard'
import UseWindowDimensions from '../../UseWindowDimensions'
import { AppContext } from '../../AppContext'
import { Context } from '../../Context.type'

import './Style.css'
import SetupGuideLogic from '../../userRoleCompanie/setupGuide/SetupGuideLogic'

type Props = {
  companie: Companie
}

const DashboardBuyer = (props: Props) => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const companie = props.companie
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <SetupGuideLogic />
      <div className="tac">
        <IconAdminDashboard />
      </div>

      <Grid container>
        {context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
          <Grid item sm={12} xs={12} className="">
            <div className="paperOut">
              <Card className="paperIn bgGrey">
                <div style={{ height: isMobile ? '250px' : '350px' }}>
                  <InvoicesGraph
                    title={`Monthly totals for ${companie.name}`}
                    showIsCumulative={true}
                    showTotal={false}
                    variables={{
                      side: 'ISSUING',
                      includesRefund: true,
                      where: {
                        companie: {
                          id: companie.id,
                        },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </Grid>
        )}
        {context.userRoleCompanie.permissions.includes('canSeeMyInvoices') &&
          context.userRoleCompanie.companieRole === 'PURCHASER' && (
            <>
              {!companie.isPersonal && (
                <Grid item sm={12} xs={12} className="">
                  <div className="paperOut">
                    <Card className="paperIn bgGrey">
                      <div style={{ height: isMobile ? '250px' : '350px' }}>
                        <InvoicesGraph
                          title={`Monthly totals for ${context.me.firstName} ${context.me.lastName} in ${companie.name}`}
                          showIsCumulative={true}
                          showTotal={false}
                          variables={{
                            side: 'ISSUING',
                            includesRefund: true,
                            where: {
                              companie: {
                                id: companie.id,
                              },
                              user: {
                                id: context.me.id,
                              },
                            },
                          }}
                        />
                      </div>
                    </Card>
                  </div>
                </Grid>
              )}
            </>
          )}

        {context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
          <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="bgGrey cardDashboard">
                <InvoicesDashboardQuery
                  title={`Recent transactions`}
                  companie={companie}
                  variables={{
                    where: {
                      testMode: context.testMode,
                      companie: {
                        id: companie.id,
                      },
                      status_in: ['SUCCESSFUL', 'PENDING'],
                    },
                    first: 3,
                    orderBy: 'createdAt_DESC',
                  }}
                />
              </Card>
            </div>
          </Grid>
        )}
        {context.userRoleCompanie.permissions.includes('canSeeMyInvoices') &&
          context.userRoleCompanie.companieRole === 'PURCHASER' && (
            <>
              {!companie.isPersonal && (
                <Grid item sm={6} xs={12} className="">
                  <div className="paperOut">
                    <Card className="bgGrey cardDashboard">
                      <InvoicesDashboardQuery
                        title={`My recent transactions`}
                        companie={companie}
                        user={context.me}
                        variables={{
                          where: {
                            testMode: context.testMode,
                            companie: {
                              id: companie.id,
                            },
                            user: {
                              id: context.me.id,
                            },
                            status_in: ['SUCCESSFUL', 'PENDING'],
                          },
                          first: 3,
                          orderBy: 'createdAt_DESC',
                        }}
                      />
                    </Card>
                  </div>
                </Grid>
              )}
            </>
          )}
        {context.userRoleCompanie.permissions.includes('canSeeSubscriptionsInCompanie') && (
          <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="bgGrey cardDashboard">
                <SubscriptionsDashboardQuery
                  title={`Recent subscriptions for ${companie.name}`}
                  companie={companie}
                  variables={{
                    orderBy: 'createdAt_DESC',
                    where: {
                      companie: {
                        id: companie.id,
                      },
                      issuedCard: {
                        status: 'active',
                      },
                    },
                    first: 3,
                  }}
                />
              </Card>
            </div>
          </Grid>
        )}
        {context.userRoleCompanie.permissions.includes('canSeeIssuedCardsInCompanie') && (
          <Grid item sm={6} xs={12} className="">
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
                        id: companie.id,
                      },
                    },
                  }}
                />
              </Card>
            </div>
          </Grid>
        )}

        {context.userRoleCompanie.permissions.includes('canSeeUsersInCompanie') && (
          <>
            {!companie.isPersonal && (
              <Grid item sm={6} xs={12} className="">
                <div className="paperOut">
                  <Card className="bgGrey cardDashboard">
                    <UsersQueryDashboard
                      companie={companie}
                      variables={{
                        where: {
                          userRoleCompanies_some: {
                            companie: {
                              id: companie.id,
                            },
                          },
                        },
                      }}
                    />
                  </Card>
                </div>
              </Grid>
            )}
          </>
        )}

        {/* {context.userRoleCompanie.permissions.includes('canSeeInvoicesInCompanie') && (
            <Grid item sm={6} xs={12} className="">
              <div className="paperOut">
                <Card className="bgGrey cardDashboard">
                  <h3>{`Monthly totals for ${companie.name}`}</h3>
                  <InvoicesTable
                    variables={{
                      where: {
                        companie: {
                          id: companie.id
                        }
                      }
                    }}
                  />
                </Card>
              </div>
            </Grid>
          )} */}

        {/* {companie.isTrustedPayment && (
            <> */}
        {context.userRoleCompanie.permissions.includes('canSeeCards') && (
          <Grid item sm={6} xs={12} className="">
            <div className="paperOut">
              <Card className="bgGrey cardDashboard">
                <CardContent className="cardContentClass">
                  {!companie.isTrustedPayment && (
                    <>
                      {context.userRoleCompanie.permissions.includes('canSeeCards') && (
                        <DashboardBalance companieId={companie.id} testMode={context.testMode} />
                      )}
                      <div className="paperOut">
                        <Divider />
                      </div>
                    </>
                  )}
                  <h3>{`Primary payment source`}</h3>
                  <CardsDashboard companieId={companie.id} />

                  {/* <div style={{ height: '20px' }} /> */}
                </CardContent>
                <CardActions>
                  <Link className="link" to={'/paymentSource/' + companie.id}>
                    Edit payment source
                  </Link>
                </CardActions>
              </Card>
            </div>
          </Grid>
        )}
        {/* </>
          )} */}
      </Grid>
    </>
  )
}

export default DashboardBuyer
