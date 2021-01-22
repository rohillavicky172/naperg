import React from 'react'
import { useParams } from 'react-router'
import { ParamTypes } from '../../../ParamTypes.type'
import UserProfile from './UserProfile'

const UserProfileContainer = () => {
  const params: ParamTypes = useParams<ParamTypes>()
  return <UserProfile userId={params.userId} />
}

export default UserProfileContainer
