import React from 'react'
import gql from 'graphql-tag'

import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import CompanieListSingle from './CompanieListSingle'
import Pagination from '../../nav/Pagination'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { useQuery } from '@apollo/react-hooks'

export const COMPANIES_QUERY = gql`
  query Companies($where: CompanieWhereInput, $orderBy: CompanieOrderByInput, $skip: Int, $first: Int) {
    companiesConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          name
          website
          createdAt
          # isBuyer
          nameFile
          typeCompanie
          stripe_cus_id
          stripe_cus_test_id
          deletedLogically
          isVerified

          balances {
            id
            isEnabled
            testMode
          }
          sellerBalances {
            id
          }
          invoices {
            id
          }
          sources {
            id
          }
          issuedCards {
            id
          }
          subscriptions {
            id
          }
          userRoleCompanies {
            id
            user {
              id
              firstName
              lastName
              email
              userRoleCompanies {
                id
                companieRole
                permissions
                companie {
                  id
                  name
                }
                user {
                  id
                  firstName
                  lastName
                }
              }
            }
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

type Props = {
  page: number
  variables: any
}

const CompaniesQuery = (props: Props) => {
  const { loading, error, data } = useQuery(COMPANIES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />

  if (!data.companiesConnection) return <NotFound />

  return (
    <div className="">
      <h3>
        {data.companiesConnection.aggregate.count} {`Companies`}
      </h3>
      {data.companiesConnection.edges.map((nodeCompanie) => (
        <div key={nodeCompanie.node.id} className="paperOut">
          <Paper className="paperIn">
            <CompanieListSingle companie={nodeCompanie.node} />
          </Paper>
        </div>
      ))}

      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.companiesConnection.aggregate.count} />
        </Grid>
      </Grid>
    </div>
  )
}

export default CompaniesQuery
