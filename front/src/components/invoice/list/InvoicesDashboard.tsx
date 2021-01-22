import React from 'react'
import { withContext } from '../../withContext'
import { Context } from '../../Context.type'
import InvoicesSum from '../../invoice/list/InvoicesSum'

type State = {}

type Props = {
  context: Context
}

class InvoicesDashboard extends React.Component<Props, State> {
  state = {}

  render() {
    // let currency = 'usd'
    // let statusInvoice = 'SUCCESSFUL'

    let companieId = this.props.context.userRoleCompanie.companie.id
    // let first = 10
    // let page = 1
    // let typeInvoice = 'VIRTUAL_CARD'
    let dateMin = new Date()
    dateMin.setSeconds(0, 0)
    dateMin.setMonth(0)
    dateMin.setDate(1)
    const dateMax = new Date()
    dateMax.setSeconds(0, 0)

    return (
      <>
        <InvoicesSum
          text={`Total transactions:`}
          variables={{
            where: {
              testMode: this.props.context.testMode,
              // status: statusInvoice,

              // AND (Invoice.type="VIRTUAL_CARD" OR Invoice.type="REFUND")
              // AND (Invoice.status="SUCCESSFUL" OR Invoice.status="PENDING")
              AND: [
                { OR: [{ type: 'VIRTUAL_CARD' }, { type: 'REFUND' }] },
                { OR: [{ status: 'SUCCESSFUL' }, { status: 'PENDING' }] },
              ],
              // OR: [{ type: 'VIRTUAL_CARD' }, { type: 'REFUND' }, { status: 'SUCCESSFUL' }, { status: 'PENDING' }],

              // type: typeInvoice === 'ALL' ? undefined : typeInvoice,
              // currency,
              companie: {
                id: companieId,
              },
            },
          }}
        />
      </>
    )
  }
}

export default withContext(InvoicesDashboard)
