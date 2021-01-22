import React from 'react'
import gql from 'graphql-tag'
import UserVerificationQuery from './UserVerificationQuery'
import { Paper } from '@material-ui/core'

export const QUERY = gql`
  query UserQuery($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      firstName
      lastName
      birthday
    }
  }
`

const UserVerificationPage = () => {
  return (
    <div className="paperOut">
      <Paper className="paperIn">
        <div className="responsiveMargin2">
          <h3>Account Verification</h3>

          <UserVerificationQuery />
        </div>
      </Paper>
    </div>
  )
}

export default UserVerificationPage
