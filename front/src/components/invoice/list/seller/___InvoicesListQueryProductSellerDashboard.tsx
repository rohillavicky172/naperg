import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import Pagination from '../../../nav/Pagination'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { InvoiceNode } from '../../Invoice.type'
import SingleInvoiceListProductOwner from './SingleInvoiceListProductOwner'
// import Icon from '@material-ui/core/Icon'
// import DownloadCsv from '../single/action/DownloadCsv'
// import SingleInvoiceList from '../single/listSingle/SingleInvoiceList'
// import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
// import DownloadCsv from '../single/action/DownloadCsv'
// import DownloadCsvInvoicesSeller from '../DownloadCsvInvoicesSeller'

type Props = {
  page: number
  variables: any
}

export const INVOICES_QUERY = gql`
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
          productCostLocal
          status

          companie {
            id
            name
          }
          product {
            id
            name
            nameFile
          }

          user {
            id
            email
            firstName
            lastName
          }

          subscription {
            id
            issuedCard {
              id
              name
              last4
              status
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

const InvoicesListQueryProductSellerDashboard = (props: Props) => {
  // const [loadingRefetch, setLoadingRefetch] = React.useState(false)
  const { loading, error, data } = useQuery(INVOICES_QUERY, {
    variables: props.variables,
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.invoicesConnection) return <NotFound />

  // const refetchQuery = async () => {
  //   setLoadingRefetch(true)
  //   await refetch()
  //   setLoadingRefetch(false)
  // }

  const { edges } = data.invoicesConnection

  if (!edges.length) {
    return (
      <div className="paperOut">
        <Paper className="paperIn">
          <div className="responsiveMargin2 tac textSize11">
            {`You will see all individual payments made by your customers here.`}
          </div>
        </Paper>
      </div>
    )
  }

  return (
    <div className="paperOut">
      {/* <ButtonLoadingAfterClick
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
      /> */}

      {edges.map((invoiceNode: InvoiceNode) => (
        <div key={invoiceNode.node.id}>
          <SingleInvoiceListProductOwner invoice={invoiceNode.node} />
        </div>
      ))}
      <Grid container>
        <Grid item xs={12} sm={9} className="marginAuto">
          <Pagination page={props.page} first={props.variables.first} count={data.invoicesConnection.aggregate.count} />
        </Grid>
        {/* <Grid item xs={12} sm={3} className="tar">
          <DownloadCsvInvoicesSeller variables={props.variables} />
        </Grid> */}
      </Grid>
    </div>
  )
}

export default InvoicesListQueryProductSellerDashboard
