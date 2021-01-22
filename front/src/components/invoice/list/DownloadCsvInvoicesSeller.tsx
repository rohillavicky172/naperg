import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import utils from '../../utils'
import { CSVLink } from 'react-csv'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'
import { InvoiceNode } from '../Invoice.type'
import { format } from 'date-fns'

export const INVOICES_QUERY = gql`
  query InvoicesQueryConnection($where: InvoiceWhereInput, $skip: Int, $orderBy: InvoiceOrderByInput, $first: Int) {
    invoicesConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          smallId
          dateInvoice
          status
          currency
          type
          productCostLocal
          product {
            id
            name
          }
          companie {
            id
            name
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
    }
  }
`

type Props = {
  variables: any
}

const DownloadCsvInvoicesSeller = (props: Props) => {
  const client = useApolloClient()
  const [loading, setLoading] = React.useState(false)
  const [dataCSV, setDataCSV] = React.useState([])
  const csvLinkRef = React.useRef<{ link: HTMLAnchorElement }>(null)
  const download = async () => {
    setLoading(true)
    let variables = { ...props.variables }
    delete variables.first
    delete variables.skip

    const dataQuery = await client.query({
      query: INVOICES_QUERY,
      variables: variables,
    })

    let dataCSV: any = []
    dataCSV = dataQuery.data.invoicesConnection.edges.map((nodeInvoice: InvoiceNode) => {
      return {
        invoiceId: utils.smallIdFormat(nodeInvoice.node.smallId),
        date: nodeInvoice.node.dateInvoice,
        companyName: nodeInvoice.node.companie.name,

        status: utils.mappingStatusInvoice(nodeInvoice.node.status),

        type: utils.mappingTypeInvoice(nodeInvoice.node.type),
        amount: nodeInvoice.node.productCostLocal,
        Revshare: nodeInvoice.node.revshare,
        currency: nodeInvoice.node.currency,

        productName: nodeInvoice.node.product ? nodeInvoice.node.product.name : '',
        last4: nodeInvoice.node.subscription ? 'Visa ' + nodeInvoice.node.subscription.issuedCard.last4 : '',
        firstName: nodeInvoice.node.user ? nodeInvoice.node.user.firstName : '',
        lastName: nodeInvoice.node.user ? nodeInvoice.node.user.lastName : '',
        email: nodeInvoice.node.user ? nodeInvoice.node.user.email : '',
      }
    })
    setDataCSV(dataCSV)
    if (csvLinkRef && csvLinkRef.current) {
      csvLinkRef.current.link.click()
    }
  }

  return (
    <>
      {dataCSV.length > 0 ? (
        <>
          <CSVLink ref={csvLinkRef} filename={`${format(new Date(), 'MMM dd, yyyy')} nachonacho.csv`} data={dataCSV}>
            Open
            <IconButton color="primary" size="small">
              <Icon>open_in_browser</Icon>
            </IconButton>
          </CSVLink>
        </>
      ) : (
        <>
          <ButtonLoadingAfterClick
            id={'idButton'}
            disabled={false}
            color={'primary'}
            icon={'cloud_download'}
            variant={'outlined'}
            size={'medium'}
            buttonText={`Yes, go ahead`}
            buttonLoadingText={`Setting up...`}
            onClick={() => download()}
            loading={loading}
          />
        </>
      )}
    </>
  )
}

export default DownloadCsvInvoicesSeller
