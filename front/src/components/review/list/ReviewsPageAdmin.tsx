import React from 'react'
import Paper from '@material-ui/core/Paper'
import { useLocation } from 'react-router-dom'
import ReviewsQueryAdmin from './ReviewsQueryAdmin'
import Filters from '../../nav/filter/Filters'
// import { Link } from 'react-router-dom'
// import TitlePage from '../../nav/layout/titlePage/TitlePage'
// import { Button } from '@material-ui/core'
const queryString = require('query-string')

const ReviewsPageAdmin = () => {
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

          <ReviewsQueryAdmin
            page={page}
            variables={{
              first: first,
              skip: (page - 1) * first,
              orderBy: { createdAt: 'desc' },
              where: {
                id,
                user: userId && {
                  id: userId,
                },
              },
            }}
          />
        </Paper>
      </div>
    </>
  )
}

export default ReviewsPageAdmin
