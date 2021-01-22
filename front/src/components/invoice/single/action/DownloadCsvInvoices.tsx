import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { CSVLink } from 'react-csv'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
import { format } from 'date-fns'

export const QUERY = gql`
  query InvoicesQueryConnection($where: InvoiceWhereInput, $skip: Int, $orderBy: InvoiceOrderByInput, $first: Int) {
    invoicesConnection(orderBy: $orderBy, where: $where, first: $first, skip: $skip) {
      edges {
        node {
          id
          type
          dateInvoice
          typePayment
          smallId
          buyerFinalPrice
          status
          product {
            id
            name
            nameFile
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

const DownloadCsvInvoices = (props: Props) => {
  const client = useApolloClient()
  const [loading, setLoading] = React.useState(false)
  const [dataCSV, setDataCSV] = React.useState([])
  const csvLinkRef = React.useRef<{ link: HTMLAnchorElement }>(null)
  const download = async () => {
    setLoading(true)
    let variables = { ...props.variables }
    variables.first = 1000
    delete variables.skip

    const dataQuery = await client.query({
      query: QUERY,
      variables: variables,
    })

    let dataCSV: any = []
    dataCSV = dataQuery.data.invoicesConnection.edges.map((nodeData) => {
      return {
        date: nodeData.node.dateInvoice,
        invoiceId: nodeData.node.smallId,
        companyName: nodeData.node.companie.name,
        type: nodeData.node.type,
        typePayment: nodeData.node.typePayment,
        status: nodeData.node.status,
        buyerFinalPrice: nodeData.node.buyerFinalPrice.toFixed(2),
        productName: nodeData.node.product ? nodeData.node.product.name : '',
        nameNachoCard: nodeData.node.subscription ? nodeData.node.subscription.issuedCard.name : '',
        last4NachoCard: nodeData.node.subscription ? 'visa-' + nodeData.node.subscription.issuedCard.last4 : '',
        firstName: nodeData.node.user ? nodeData.node.user.firstName : '',
        lastName: nodeData.node.user ? nodeData.node.user.lastName : '',
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

export default DownloadCsvInvoices
