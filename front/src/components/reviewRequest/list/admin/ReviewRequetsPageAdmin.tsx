import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import ReviewRequetsQueryAdmin from './ReviewRequetsQueryAdmin'
import Filters from '../../../nav/filter/Filters'

const queryString = require('query-string')

const ReviewRequetsPageAdmin = () => {
  const location = useLocation()
  const first = 20

  const parsed = queryString.parse(location.search)
  const page = parsed.page ? parsed.page : 1

  const userId = parsed.userId
  const id = parsed.id

  return (
    <>
      <div className="paperOut">
        <Paper className="paperIn">
          <h3>{`Reviews (admin)`}</h3>

          <Filters showId showUserId showCompanieId showProductId />

          <ReviewRequetsQueryAdmin
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy: { createdAt: 'desc' },
              where: {
                id,
                userId,
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default ReviewRequetsPageAdmin
