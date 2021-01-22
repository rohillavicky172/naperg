import React from 'react'
import Button from '@material-ui/core/Button'
// import { AppContext } from '../../AppContext'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { UserRoleCompanie } from '../../UserRoleCompanie.type'
import gql from 'graphql-tag'

// import { Context } from '../../Context.type'

export const MUTATION = gql`
  mutation SetIsSelectedForReview($userRoleCompanieId: ID!) {
    setIsSelectedForReview(userRoleCompanieId: $userRoleCompanieId) {
      id
      isSelectedForReview
    }
  }
`

type Props = {
  userRoleCompanie: UserRoleCompanie
}

const SetIsSelectedForReview = (props: Props) => {
  const client = useApolloClient()

  const [setIsSelectedForReview] = useMutation(MUTATION)

  const setIsSelectedForReviewF = async () => {
    let newData
    try {
      newData = await setIsSelectedForReview({
        variables: {
          userRoleCompanieId: props.userRoleCompanie.id,
        },
      })
    } catch (e) {}
    if (newData) {
      client.resetStore()
    }
  }

  return (
    <Button color="secondary" variant="outlined" disabled={false} onClick={setIsSelectedForReviewF}>
      {`Select`}
    </Button>
  )
}

export default SetIsSelectedForReview
