import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Error from '../../../nav/error/Error'
import NotFound from '../../../nav/error/NotFound'
import Loading from '../../../nav/error/Loading'
import Pagination from '../../../nav/Pagination'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
// import DownloadCsv from '../single/action/DownloadCsv'
import { InvoiceNode } from '../../Invoice.type'
import SingleInvoiceListSellerPayment from './SingleInvoiceListSellerPayment'
// import DownloadCsvInvoicesSeller from './DownloadCsvInvoicesSeller'

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

          dateInvoice
          currency

          period
          productCostLocal
          status
        }
      }
      aggregate {
        count
      }
    }
  }
`

const InvoicesListQuerySellerPayment = (props: Props) => {
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
          <div className="responsiveMargin2 tac textSize11">{`You will see monthly invoices for revenue share here`}</div>
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
          <SingleInvoiceListSellerPayment invoice={invoiceNode.node} />
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

export default InvoicesListQuerySellerPayment
