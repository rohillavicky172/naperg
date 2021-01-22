import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { CSVLink, CSVDownload } from 'react-csv'
import { withApollo } from 'react-apollo'
import { Client } from '../../../Client.type'
import { flowRight as compose } from 'lodash'
import utils from '../../../utils'
import ButtonLoadingAfterClick from '../../../nav/ButtonLoadingAfterClick'
// import Button from '@material-ui/core/Button'
// import { INVOICES_QUERY } from '../../GraphQL'

type State = {
  dataCSV: any
  productName: string
  loading: boolean
}

type Props = {
  client: Client
  type: string
  variables: any
  query: any
}

class DownloadCsv extends React.Component<Props, State> {
  state = {
    loading: false,
    productName: '',
    dataCSV: [],
  }

  download = async () => {
    this.setState({ loading: true })
    let variables = { ...this.props.variables }
    delete variables.first
    delete variables.skip

    const dataQuery = await this.props.client.query({
      query: this.props.query,
      variables: variables,
    })

    let dataCSV: any = []
    if (this.props.type === 'invoice') {
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
          firstName: nodeData.node.user ? nodeData.node.user.firstName : '',
          lastName: nodeData.node.user ? nodeData.node.user.lastName : '',
        }
      })
    }
    if (this.props.type === 'user') {
      dataCSV = dataQuery.data.usersConnection.edges.map((nodeData) => {
        return {
          userId: nodeData.node.id,
          createdAt: nodeData.node.createdAt,
          email: nodeData.node.email,
          firstName: nodeData.node.firstName,
          lastName: nodeData.node.lastName,
          lastLogin: nodeData.node.lastLogin,
          role: nodeData.node.role,
          signupType: nodeData.node.signupType,
          invitedByFirstName: nodeData.node.invitedBy ? nodeData.node.invitedBy.firstName : '',
          invitedByLastName: nodeData.node.invitedBy ? nodeData.node.invitedBy.lastName : '',
          company0: nodeData.node.userRoleCompanies.length > 0 ? nodeData.node.userRoleCompanies[0].companie.name : '',
          company1: nodeData.node.userRoleCompanies.length > 1 ? nodeData.node.userRoleCompanies[1].companie.name : '',
          company2: nodeData.node.userRoleCompanies.length > 2 ? nodeData.node.userRoleCompanies[2].companie.name : '',
          company3: nodeData.node.userRoleCompanies.length > 3 ? nodeData.node.userRoleCompanies[3].companie.name : '',
        }
      })
    }
    if (this.props.type === 'companie') {
      dataQuery.data.companiesConnection.edges.forEach((nodeData) => {
        let nbInvoices = nodeData.node.invoices.length
        let nbIssuedCards = nodeData.node.issuedCards.length
        nodeData.node.userRoleCompanies.forEach((userRoleCompanie) => {
          dataCSV.push({
            companyId: nodeData.node.id,
            companyName: nodeData.node.name,
            website: nodeData.node.website,
            companieCreatedAt: utils.dateFormated(nodeData.node.createdAt, 'MM/DD/yyyy'),
            nbInvoices: nbInvoices,
            nbIssuedCards: nbIssuedCards,
            first_name: userRoleCompanie.user.firstName,
            last_name: userRoleCompanie.user.lastName,
            email: userRoleCompanie.user.email,
            role: userRoleCompanie.companieRole,
            lastLogin: utils.dateFormated(userRoleCompanie.user.lastLogin, 'MM/DD/yyyy'),
            userCreatedAt: utils.dateFormated(userRoleCompanie.user.createdAt, 'MM/DD/yyyy'),
          })
        })
      })
    }

    this.setState({ dataCSV })
  }

  render() {
    return (
      <>
        {this.state.dataCSV.length > 0 ? (
          <>
            <CSVDownload data={this.state.dataCSV} target="_self" />
            <CSVLink data={this.state.dataCSV}>
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
              onClick={() => {
                this.download()
              }}
              loading={this.state.loading}
            />
          </>
        )}
      </>
    )
  }
}

export default compose(withApollo)(DownloadCsv)
