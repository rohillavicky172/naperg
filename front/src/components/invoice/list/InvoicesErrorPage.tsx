import React from 'react'
import { AppContext } from '../../AppContext'
import InvoicesListQuery from './InvoicesListQuery'
import { Context } from '../../Context.type'
import { Paper } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
const queryString = require('query-string')

const InvoicesErrorPage = () => {
  const { context }: { context: Context } = React.useContext(AppContext)

  const location = useLocation()
  const first = 3
  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1

  var dateInthePast = new Date()
  dateInthePast.setDate(dateInthePast.getDate() - 20)

  return (
    <div className="paperOut">
      <h1>{`Transactions Error (admin)`}</h1>

      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Refund Error`}</h3>

          <InvoicesListQuery
            page={page}
            variables={{
              where: {
                testMode: context.testMode,

                type: 'REFUND',

                status: 'ERROR',
              },
              first: first,
              orderBy: 'dateInvoice_DESC',
              skip: (page - 1) * first,
            }}
          />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Payment Error`}</h3>

          <InvoicesListQuery
            page={page}
            variables={{
              where: {
                testMode: context.testMode,
                status: 'ERROR_PAYMENT',
                typePayment: 'PAYMENT_SOURCE',
                type: 'VIRTUAL_CARD',
              },
              first: first,
              orderBy: 'dateInvoice_DESC',
              skip: (page - 1) * first,
            }}
          />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Transaction without product`}</h3>

          <InvoicesListQuery
            page={page}
            variables={{
              where: {
                type_in: ['VIRTUAL_CARD', 'VIRTUAL_CARD_TRUSTED', 'REFUND'],
                NOT: [
                  {
                    product: {
                      id: {
                        not: {
                          equals: '',
                        },
                      },
                    },
                  },
                ],
              },
              first: first,
              orderBy: 'dateInvoice_DESC',
              skip: (page - 1) * first,
            }}
          />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`No charges 20 days ago`}</h3>

          <InvoicesListQuery
            page={page}
            variables={{
              where: {
                testMode: context.testMode,
                dateInvoice: { lt: dateInthePast },
                charges_none: {
                  id: { contains: '' },
                },

                buyerFinalPrice: { lt: -0.5 },
                typePayment: 'PAYMENT_SOURCE',
                type: 'VIRTUAL_CARD',
                status_in: ['SUCCESSFUL', 'PENDING'],
              },
              first: first,
              orderBy: 'dateInvoice_DESC',
              skip: (page - 1) * first,
            }}
          />
        </Paper>
      </div>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Pending invoices but with issuing closed. 20days ago`}</h3>

          <InvoicesListQuery
            page={page}
            variables={{
              where: {
                testMode: context.testMode,
                statusIssuing: 'closed',
                dateInvoice: { lt: dateInthePast },
                buyerFinalPrice: { lt: -0.5 },
                typePayment: 'PAYMENT_SOURCE',
                type: 'VIRTUAL_CARD',
                status: 'PENDING',
              },
              first: first,
              orderBy: 'dateInvoice_DESC',
              skip: (page - 1) * first,
            }}
          />
        </Paper>
      </div>
    </div>
  )
}

export default InvoicesErrorPage
