import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { Context } from '../../../Context.type'
import { withContext } from '../../../withContext'
import { useParams } from 'react-router'
import UserQueryCreateIssuedCard from './UserQueryCreateIssuedCard'
import { ParamTypes } from '../../../ParamTypes.type'

const CreateIssuedCardPage = () => {
  const { userId }: ParamTypes = useParams<ParamTypes>()
  const { context }: { context: Context } = useContext(AppContext)
  const companie = context.userRoleCompanie.companie

  if (
    !(
      context.userRoleCompanie.permissions.includes('canRequestCard') ||
      context.userRoleCompanie.permissions.includes('canCreateMyIssuedCards') ||
      context.userRoleCompanie.permissions.includes('canCreateIssuedCardsInCompanie')
    )
  )
    return <div>{'No Rights'}</div>

  return <UserQueryCreateIssuedCard userId={userId} companieId={companie.id} />
}

export default withContext(CreateIssuedCardPage)
