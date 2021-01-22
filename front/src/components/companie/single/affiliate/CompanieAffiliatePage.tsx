import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import { Product } from '../../../product/Product.type'
import gql from 'graphql-tag'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { useQuery } from '@apollo/react-hooks'
import InvoicesGraph from '../../../invoice/list/graph/InvoicesGraph'
import InvoicesTable from '../../../invoice/list/table/InvoicesTable'
import UseWindowDimensions from '../../../UseWindowDimensions'

type Props = {
  companieId: string
  product: Product
  companieQuery: any
}

export const COMPANIE_QUERY = gql`
  query Companie($where: CompanieWhereUniqueInput!) {
    companie(where: $where) {
      id
      name
      sources {
        id
      }
      userRoleCompanies {
        id
        companieRole
        user {
          id
          name
        }
      }
    }
  }
`

const CompanieAffiliatePage = (props: Props) => {
  const match = useRouteMatch()
  const companieId = match.params.companieId

  const { loading, error, data } = useQuery(COMPANIE_QUERY, {
    variables: {
      where: {
        id: companieId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.companie) return <NotFound />
  const isMobile = UseWindowDimensions.isMobile()
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>
            Company {data.companie.name}{' '}
            {data.companie.userRoleCompanies
              .filter((userRoleCompanie) => userRoleCompanie.companieRole === 'OWNER')
              .map((userRoleCompanie) => (
                <span key={userRoleCompanie.id}>({userRoleCompanie.user.name})</span>
              ))}
          </h3>
          <Grid container>
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
                        where: {
                          companie: {
                            id: companieId,
                          },
                        },
                      }}
                    />
                  </div>
                </Card>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} className="">
              <div className="paperOut">
                <Card className="paperIn bgGrey">
                  <p>Sources: {data.companie.sources.length}</p>
                  <p>Users: {data.companie.userRoleCompanies.length}</p>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} className="">
              <div className="paperOut">
                <Card className="paperIn bgGrey">
                  <InvoicesTable
                    title={`App Issuing side`}
                    variables={{
                      includesRefund: true,
                      side: 'ISSUING',
                      where: {
                        companie: {
                          id: companieId,
                        },
                      },
                    }}
                  />
                </Card>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  )
}

export default CompanieAffiliatePage
