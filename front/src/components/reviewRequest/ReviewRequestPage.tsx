import React from 'react'

// import { companieClass } from '../../../companie/Companie.type'
import { Paper } from '@material-ui/core'

import ReviewRequestList from './list/ReviewRequestList'
import ReviewRequest from './ReviewRequest'
import { useParams } from 'react-router'
import { ParamTypes } from '../ParamTypes.type'
import { AppContext } from '../AppContext'
import { Context } from '../Context.type'

const ReviewRequestPage = () => {
  const { context }: { context: Context } = React.useContext(AppContext)
  const { productId }: ParamTypes = useParams<ParamTypes>()
  const companieId = context.userRoleCompanie.companie.id
  return (
    <>
      <div className="responsiveMargin2">
        <div className="paperOut">
          <Paper className="paperIn">
            <ReviewRequest productId={productId} companieId={companieId} />
          </Paper>
        </div>
      </div>
      <div className="">
        <div className="paperOut">
          <Paper className="paperIn">
            <ReviewRequestList productId={productId} companieId={companieId} />
          </Paper>
        </div>
      </div>
    </>
  )
}

export default ReviewRequestPage
