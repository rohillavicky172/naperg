import React from 'react'
import gql from 'graphql-tag'
import Error from '../../nav/error/Error'
import NotFound from '../../nav/error/NotFound'
import Loading from '../../nav/error/Loading'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router'
import { ParamTypes } from '../../ParamTypes.type'
import { Review } from '../Review.type'
import { Paper, Button, Icon } from '@material-ui/core'
import EditReview from './EditReview'

import { Link } from 'react-router-dom'
import DateComponent from '../../nav/DateComponent'
import utils from '../../utils'
import ButtonLoadingAfterClick from '../../nav/ButtonLoadingAfterClick'

export const QUERY = gql`
  query reviewQuery($where: ReviewWhereUniqueInput!) {
    review(where: $where) {
      id
      outputJson
      reviewVariables
      lastSent
      createdAt
      description
      showUnsubscribe

      bcc
      frequency
      status
      emailTest
      companieNameTest

      isActive
      # singleSendPerUser
      # isSuspended
      # unsubscribe

      type
      from
      subject
      bodyEmail
      name
      user {
        id
        firstName
        lastName
      }
    }
  }
`

const ReviewPage = () => {
  const [edit, setEdit] = React.useState(false)
  const { reviewId }: ParamTypes = useParams<ParamTypes>()
  const [loadingRefetch, setLoadingRefetch] = React.useState(false)
  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: {
      where: {
        id: reviewId,
      },
    },
  })

  if (error) return <Error message={error.graphQLErrors.length && error.graphQLErrors[0].message} />
  if (loading) return <Loading />
  if (!data.review) return <NotFound />
  const review: Review = data.review
  return <></>
}

export default ReviewPage
