import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Chip, Paper } from '@material-ui/core'
const queryString = require('query-string')

const EventsFilter = () => {
  const location = useLocation()
  const history = useHistory()
  const parsed = queryString.parse(location.search)

  const event = parsed.event ? parsed.event : undefined

  const typeLogs = [
    {
      category: 'Auth',
      events: [
        'login',
        'updateSellerBalance',
        'updateInvoice',
        'updateBalance',

        'updateCashback',
        'GoToVendorWebsite',
        'isPhoneValidationRequiredCronF',
      ],
    },
    {
      category: 'User',
      events: ['updateUser', 'unsubscribeUser', 'updatePhone'],
    },
    {
      category: 'Product',
      events: ['mergeProduct', 'updateProduct', 'createProduct', 'updatePromotion', 'createPromotion'],
    },
    {
      category: 'Company',
      events: ['updateCompanie', 'submitOwnerOfCompanieVerification'],
    },
    {
      category: 'other',
      events: ['refreshContactsHubspot'],
    },
  ]

  const handleDelete = () => {
    const parsed = queryString.parse(location.search)

    delete parsed.page
    delete parsed.event
    history.push('?' + queryString.stringify(parsed))
  }
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        {typeLogs.map((typeLog) => (
          <>
            <h4>{typeLog.category}</h4>
            {typeLog.events.map((singleEvent) => (
              <Chip
                onDelete={event === singleEvent ? handleDelete : undefined}
                label={singleEvent}
                color={event === singleEvent ? 'primary' : 'default'}
                onClick={() => {
                  const parsed = queryString.parse(location.search)
                  parsed.event = singleEvent

                  delete parsed.page
                  history.push('?' + queryString.stringify(parsed))
                }}
              />
            ))}
          </>
        ))}
      </Paper>
    </div>
  )
}

export default EventsFilter
