import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import Pagination from '../../../nav/Pagination'
import SingleInvoiceAdmin from './SingleInvoiceAdmin'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import DownloadCsvInvoices from '../../single/action/DownloadCsvInvoices'
import { InvoiceNode } from '../../Invoice.type'
import gql from 'graphql-tag'

export const QUERY = gql`
  query InvoicesQueryConnection($where: InvoiceWhereInput, $skip: Int, $orderBy: InvoiceOrderByInput, $first: Int) {
    invoicesConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          type
          dateInvoice
          currency

          cashback
          revshare
          statusIssuing
          productCostLocal
          productCostLocalInitial
          status
          product {
            id
            name
            nameFile
          }
          companie {
            id
            name
            isPersonal
            userRoleCompanies {
              id
              companieRole
              user {
                id
                firstName
                lastName
              }
            }
          }

          user {
            id
            email
            firstName
            lastName
          }

          subscription {
            id
            # product {
            #   id
            #   name
            #   nameFile
            # }
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

const InvoicesAdminQuery = (props: Props) => {
  const [loadingRefetch, setLoadingRefetch] = React.useState(false)
  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.invoicesConnection) return <NotFound />

  const refetchQuery = async () => {
    setLoadingRefetch(true)
    await refetch()
    setLoadingRefetch(false)
  }

  const { edges } = data.invoicesConnection

  if (!edges.length) {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="responsiveMargin2 tac textSize11">
            {`You will see all your transactions here including any charges to your NachoCards.`}
          </div>
        </Paper>
      </div>
    )
  }

  return (
    <div className="paperOut">
      <ButtonLoadingAfterClick
        id={'idButton'}
        icon={''}
        color={'primary'}
        disabled={false}
        variant={'outlined'}
        size={'medium'}
        buttonText={<Icon>refresh</Icon>}
        buttonLoadingText={`Loading...`}
        onClick={() => refetchQuery()}
        loading={loadingRefetch}
      />

      {edges.map((invoiceNode: InvoiceNode) => (
        <div key={invoiceNode.node.id}>
          <SingleInvoiceAdmin invoice={invoiceNode.node} />
        </div>
      ))}
      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.invoicesConnection.aggregate.count} />
        </Grid>
        <Grid item xs={12} sm={3} className="tar">
          <DownloadCsvInvoices variables={props.variables} />
        </Grid>
      </Grid>
    </div>
  )
}

export default InvoicesAdminQuery
