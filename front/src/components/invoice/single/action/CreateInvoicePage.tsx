import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import CreateInvoice from './CreateInvoice'
const queryString = require('query-string')

const CreateInvoicePage = () => {
  const location = useLocation()
  const parsed = queryString.parse(location.search)
  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <CreateInvoice companieId={parsed.companieId} />
        </Paper>
      </div>
    </>
  )
}

export default CreateInvoicePage
