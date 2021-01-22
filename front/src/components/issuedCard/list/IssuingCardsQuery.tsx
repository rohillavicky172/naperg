import React from 'react'
import Pagination from '../../nav/Pagination'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../nav/error/Error'
import Loading from '../../nav/error/Loading'
import NotFound from '../../nav/error/NotFound'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import gql from 'graphql-tag'
import SingleIssuedCardList from '../single/SingleIssuedCardList'
import { Grid } from '@material-ui/core'
import DownloadCsvIssuedCards from './DownloadCsvIssuedCards'

export const QUERY = gql`
  query IssuedCards($where: IssuedCardWhereInput, $orderBy: IssuedCardOrderByInput, $skip: Int, $first: Int) {
    issuedCardsConnection(where: $where, orderBy: $orderBy, skip: $skip, first: $first) {
      edges {
        node {
          id
          createdAt
          name
          description
          issuedCardCode
          type
          status
          last4
          user {
            id
            firstName
            lastName
          }
          companie {
            id
            name
          }
          stripe_issuedCard_id
          issuedCardStripe {
            id
            object
            last4
            status
            brand
            currency
            exp_month
            exp_year
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
  variables: any
  page: number
}

const IssuingCardsQuery = (props: Props) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.issuedCardsConnection) return <NotFound />

  const listIssuedCards = data.issuedCardsConnection.edges

  if (listIssuedCards.length === 0) {
    return (
      <div className="paperOut">
        <Paper className="paperIn ">
          <div className="responsiveMargin2 tac textSize11">{`No NachoCards have been created yet!`}</div>
        </Paper>
      </div>
    )
  }

  return (
    <>
      {listIssuedCards.map((nodeIssuedCard) => (
        <Link key={nodeIssuedCard.node.id} to={'/issuedCard/' + nodeIssuedCard.node.id}>
          <div className="paperOut">
            <Paper className="paperIn bgHover">
              <SingleIssuedCardList issuedCard={nodeIssuedCard.node} />
            </Paper>
          </div>
        </Link>
      ))}

      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.issuedCardsConnection.aggregate.count} />
        </Grid>
        <Grid item xs={12} sm={3} className="tar">
          <DownloadCsvIssuedCards variables={props.variables} />
        </Grid>
      </Grid>
    </>
  )
}

export default IssuingCardsQuery
