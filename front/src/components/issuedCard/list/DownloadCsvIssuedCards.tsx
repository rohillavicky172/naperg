import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { CSVLink } from 'react-csv'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'

import { format } from 'date-fns'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

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
}

const DownloadCsvIssuedCards = (props: Props) => {
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

    dataCSV = dataQuery.data.issuedCardsConnection.edges.map((nodeData) => {
      return {
        id: nodeData.node.id,
        createdAt: nodeData.node.createdAt,
        description: nodeData.node.description,
        companyName: nodeData.node.companie.name,
        code: nodeData.node.issuedCardCode,

        status: nodeData.node.status,

        nameNachoCard: nodeData.node.name,
        last4NachoCard: 'visa-' + nodeData.node.last4,
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

export default DownloadCsvIssuedCards
